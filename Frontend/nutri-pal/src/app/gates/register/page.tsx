'use client'
import { useRouter } from 'next/navigation';
import '@/styles/register.css'
import { Inputs } from '@/components/gates/Inputs';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase-config';


export default function register() {
    const router = useRouter();
    const ARROW_SIZE = 25;

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordSame, setPasswordSame] = useState(false);

    const [error, setError] = useState(true);


    const onBackArrow = () => {
        router.replace('/');
    }

    const onSubmitForm = async (e: any) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            setError(false);
        } catch (error) {
            setError(true);
            alert(JSON.parse(JSON.stringify(error)).code.slice(5));
        }
    }

    useEffect(() => {
        if (!error) {
            router.replace('/dashboard')
        }
    }, [error])

    useEffect(() => {
        if (confirmPassword.length === 0) {
            setPasswordSame(true);
        } else if (confirmPassword !== password) {
            setPasswordSame(false);
        } else {
            setPasswordSame(true);
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
