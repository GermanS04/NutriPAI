'use client'
import { useRouter } from 'next/navigation';
import '@/styles/register.css'
import { Inputs } from '@/components/gates/Inputs';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase-config';
import axios from 'axios';
import { BASE_URL_REST_API, ROUTE_DASHBOARD, ROUTE_LANDING } from '@/app/consts';
import { Tooltip } from '@/components/tooltip/Tooltip';


export default function register() {
    const router = useRouter();
    const ICON_SIZE = 25;  // Set the size of the Arrow Icon to go back

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordSame, setPasswordSame] = useState(false);

    const [userAuthInfo, setUserAuthInfo] = useState<any>({});   // Contains the info of the user from firebase

    useEffect(() => {
        // When registering get the declare the information of the user to the variable of userAuthInfo
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUserAuthInfo(currentUser);
            }
        })
    }, [])

    const [error, setError] = useState(true);

    // Flags to trigger the tooltip of error
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    // When Icon to go back pressed return to the landing page
    const onBackArrow = () => {
        router.replace(ROUTE_LANDING);
    }

    // Post the user to the users table in the database with the details we got and the UID that firebase gives the user
    const sendUser = (uid: string) => {
        axios.post(BASE_URL_REST_API + 'users', {
            id: uid,
            name: name,
            lastName: lastname,
            username: username,
            email: email
        }).then(() => setError(false))
            .catch((error) => { alert('There was an error sending the user \n' + error) })
    }

    // When submitting the form create the user in firebase and then send the user with all the information to the database, if everything goes well the error should have a false value
    const onSubmitForm = async (e: any) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
            } catch (error) {
                setError(true);
                alert('An error has occured')
                const err = JSON.parse(JSON.stringify(error)).code.slice(5);
                if (err === 'invalid-email') {
                    setErrorEmail(true);
                } else if (err === 'weak-password') {
                    setErrorPassword(true);
                }
            }
        }
    }

    // When getting the user from firebase send it to the database
    useEffect(() => {
        if (Object.keys(userAuthInfo).length !== 0) {
            sendUser(userAuthInfo.uid)
        }
    }, [userAuthInfo])

    // if there were no errors when submitting the form then take the user to the dashboard
    useEffect(() => {
        if (!error) {
            router.replace(ROUTE_DASHBOARD)
        }
    }, [error])

    // Hide the tooltip after error when writing again in the field
    useEffect(() => {
        setErrorEmail(false);
    }, [email])

    useEffect(() => {
        setErrorPassword(false);
    }, [password])


    // When the confirm password field is empty then it doesn't change the color of the field and doesn't display a message
    useEffect(() => {
        if (confirmPassword.length === 0) {
            setPasswordSame(true);
        } else if (confirmPassword !== password) {
            setPasswordSame(false);
        } else {
            setPasswordSame(true); // When passwords are equal set the variable passwordSame to true
        }

    }, [confirmPassword, password])

    return (
        <main className="register-main-container">
            <div className='register-form-container'>
                <div className='register-text'>
                    <button onClick={onBackArrow}>
                        <FaArrowCircleLeft size={ICON_SIZE} className='register-back-icon' />
                    </button>
                    <p className='register-title'>Create account</p>
                </div>
                <form className='register-form' onSubmit={onSubmitForm}>
                    <div className='register-name-last-container'>
                        <div className='register-name-container'>
                            <Inputs
                                id='name'
                                label='Name'
                                placeholder='Name'
                                Icon={FaUser}
                                type='text'
                                setValue={setName}
                                required={true}
                            />
                        </div>
                        <div className='register-last-container'>
                            <Inputs
                                id='lastname'
                                label='Last Name'
                                placeholder='Last Name'
                                Icon={FaUser}
                                type='text'
                                setValue={setLastName}
                                required={true}
                            />
                        </div>
                    </div>
                    <Inputs
                        id='username'
                        label='Username'
                        placeholder='Username'
                        Icon={FaUser}
                        type='text'
                        setValue={setUsername}
                        required={true}
                    />

                    <Inputs
                        id='email'
                        label='Email'
                        placeholder='email@example.com'
                        Icon={FaUser}
                        type='text'
                        setValue={setEmail}
                        required={true}
                        error={errorEmail}
                        Tooltip={<Tooltip trigger={<IoIosWarning className='register-warning-icon' size={ICON_SIZE} />}
                            tooltipText='Invalid Email'
                            position='top' />}
                    />

                    <Inputs
                        id='password'
                        label='Password'
                        placeholder='Password'
                        Icon={FaLock}
                        type='password'
                        setValue={setPassword}
                        required={true}
                        error={errorPassword}
                        Tooltip={<Tooltip trigger={<IoIosWarning className='register-warning-icon' size={ICON_SIZE} />}
                            tooltipText='Weak Password'
                            position='top' />}
                    />

                    <div>
                        <Inputs
                            id='confirm'
                            label='Confirm Password'
                            placeholder='Password'
                            Icon={FaLock}
                            type='password'
                            setValue={setConfirmPassword}
                            required={true}
                            passwordSame={passwordSame}
                        />

                        {(!passwordSame) ? <p className='register-confirm-password-error'>Please make sure your passwords match</p> : null}
                    </div>

                    <button type='submit' className='register-button'>Submit</button>
                </form>
            </div>
        </main>
    )
}
