'use client'
import { useRouter } from 'next/navigation';
import '@/styles/login.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Inputs } from '@/components/gates/Inputs';
import { auth } from '@/app/firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'react';


export default function login() {
    const router = useRouter();
    const ARROW_SIZE = 25;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(true);

    // Going back to the landing page
    const onBackArrow = () => {
        router.replace('/');
    }

    // Log in with firebase if there are no errors set error to false
    const login = async (e: any) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            setError(false)
        } catch (error) {
            setError(true);
            alert('Invalid email or password');
        }
    }

    // Function from firebase to recognize the user if they didn't log out from dashboard
    // if they recognize them then when the login page is rendered they are sent directly to the dahsboard
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            router.replace('/dashboard');
        }
    })

    // When setting error to false from the login it means the login was successful so you get send directly to the dashboard
    useEffect(() => {
        if (!error) {
            router.replace('/dashboard');
        }
    }, [error])

    return (
        <main className="login-main-container">
            <div className='login-form-container'>
                <div className='login-text'>
                    <button onClick={onBackArrow}>
                        <FaArrowCircleLeft size={ARROW_SIZE} className='login-back-icon' />
                    </button>
                    <p>Sign in</p>
                </div>
                <form className='login-form' onSubmit={login}>
                    <Inputs id='email' label='Email' placeholder='email@example.com' Icon={FaUser} type='text' setValue={setEmail} required={true} />
                    <Inputs id='password' label='Password' placeholder='Password' Icon={FaLock} type='password' setValue={setPassword} required={true} />
                    <button type='submit' className='login-button'>Submit</button>
                </form>
            </div>
        </main>
    )
}
