'use client'
import { useRouter } from 'next/navigation';
import '@/styles/register.css'
import { Inputs } from '@/components/gates/Inputs';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase-config';
import axios, { Axios } from 'axios';
import { BASE_URL_REST_API } from '@/app/consts';


export default function register() {
    const router = useRouter();
    const ARROW_SIZE = 25;  // Set the size of the Arrow Icon to go back

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordSame, setPasswordSame] = useState(false);

    const [userAuthInfo, setUserAuthInfo] = useState({});   // Gets the info of the user from firebase

    // When registering get the declare the information of the user to the variable of userAuthInfo
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUserAuthInfo(currentUser);
        }
    })

    const [error, setError] = useState(true);

    // When Icon to go back pressed return to the landing page
    const onBackArrow = () => {
        router.replace('/');
    }

    // Post the user to the users table in the database with the details we got and the UID that firebase gives the user
    const sendUser = () => {
        axios.post(BASE_URL_REST_API + 'users', {
            id: userAuthInfo.uid,
            name: name,
            lastName: lastname,
            username: username,
            email: email
        })
            .catch((error) => { alert('There was an error sending the user \n' + error) })
    }

    // When submitting the form create the user in firebase and then send the user with all the information to the database, if everything goes well the error should have a false value
    const onSubmitForm = async (e: any) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            sendUser();
            setError(false);
        } catch (error) {
            setError(true);
            alert(JSON.parse(JSON.stringify(error)).code.slice(5));
        }
    }

    // if there were no errors when submitting the form then take the user to the dashboard
    useEffect(() => {
        if (!error) {
            router.replace('/dashboard')
        }
    }, [error])


    // When the confirm password field is empty then it doesn't change the color of the field and doesn't display a message
    useEffect(() => {
        if (confirmPassword.length === 0) {
            setPasswordSame(true);
        } else if (confirmPassword !== password) {
            setPasswordSame(false);
        } else {
            setPasswordSame(true); // When passwords are equal set the variable passwordSame to true
        }

    }, [confirmPassword])

    return (
        <main className="register-main-container">
            <div className='register-form-container'>
                <div className='register-text'>
                    <button onClick={onBackArrow}>
                        <FaArrowCircleLeft size={ARROW_SIZE} className='register-back-icon' />
                    </button>
                    <p className='register-title'>Create account</p>
                </div>
                <form className='register-form' onSubmit={onSubmitForm}>
                    <div className='register-name-last-container'>
                        <div className='register-name-container'>
                            <Inputs id='name' label='Name' placeholder='Name' Icon={FaUser} type='text' setValue={setName} required={true} />
                        </div>
                        <div className='register-last-container'>
                            <Inputs id='lastname' label='Last Name' placeholder='Last Name' Icon={FaUser} type='text' setValue={setLastName} required={true} />
                        </div>
                    </div>
                    <Inputs id='username' label='Username' placeholder='Username' Icon={FaUser} type='text' setValue={setUsername} required={true} />
                    <Inputs id='email' label='Email' placeholder='email@example.com' Icon={FaUser} type='text' setValue={setEmail} required={true} />
                    <Inputs id='password' label='Password' placeholder='Password' Icon={FaLock} type='password' setValue={setPassword} required={true} />
                    <div>
                        <Inputs id='confirm' label='Confirm Password' placeholder='Password' Icon={FaLock} type='password' setValue={setConfirmPassword} required={true} passwordSame={passwordSame} />
                        {(!passwordSame) ? <p className='register-confirm-password-error'>Please make sure your passwords match</p> : null}
                    </div>

                    <button type='submit' className='register-button'>Submit</button>
                </form>
            </div>
        </main>
    )
}
