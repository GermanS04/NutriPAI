'use client'
import { useRouter } from 'next/navigation';
import '@/styles/login.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useState } from 'react';
import { Inputs } from '@/components/gates/Inputs';


export default function login() {
    const router = useRouter();
    const ARROW_SIZE = 25;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onBackArrow = () => {
        router.replace('/');
    }

    return (
        <main className="login-main-container">
            <div className='login-form-container'>
                <div className='login-text'>
                    <button onClick={onBackArrow}>
                        <FaArrowCircleLeft size={ARROW_SIZE} className='login-back-icon' />
                    </button>
                    <p>Sign in</p>
                </div>
                <form className='login-form'>
                    <Inputs id='email' label='Email' placeholder='email@example.com' Icon={FaUser} type='text' setValue={setUsername} />
                    <Inputs id='password' label='Password' placeholder='Password' Icon={FaLock} type='password' setValue={setPassword} />
                    <button type='submit' className='login-button'>Submit</button>
                </form>
            </div>
        </main>
    )
}
