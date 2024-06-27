'use client'
import { useRouter } from 'next/navigation';
import '@/styles/login.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Inputs } from '@/components/gates/Inputs';
import { auth } from '@/app/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';


export default function login() {
    const router = useRouter();
    const ARROW_SIZE = 25;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(true);

    const onBackArrow = () => {
        router.replace('/');
    }

    const login = async (e: any) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
        } catch (error) {
            setError(true);
            alert('Invalid email or password');
        }
    }

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
