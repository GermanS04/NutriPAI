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


    const onBackArrow = () => {
        router.replace('/');
    }

    const onSubmitForm = async (e: any) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )

    }

    return (
        <main className="register-main-container">
            <div className='register-form-container'>
                <div className='register-text'>
                    <button onClick={onBackArrow}>
                        <FaArrowCircleLeft size={ARROW_SIZE} className='register-back-icon' />
                    </button>
                    <p>Create account</p>
                </div>
                <form className='register-form' onSubmit={onSubmitForm}>
                    <div className='register-name-last-container'>
                        <div className='register-name-container'>
                            <Inputs id='name' label='Name' placeholder='Name' Icon={FaUser} type='text' setValue={setName} />
                        </div>
                        <div className='register-last-container'>
                            <Inputs id='lastname' label='Last Name' placeholder='Last Name' Icon={FaUser} type='text' setValue={setLastName} />
                        </div>
                    </div>
                    <Inputs id='username' label='Username' placeholder='Username' Icon={FaUser} type='text' setValue={setUsername} />
                    <Inputs id='email' label='Email' placeholder='email@example.com' Icon={FaUser} type='text' setValue={setEmail} />
                    <Inputs id='password' label='Password' placeholder='Password' Icon={FaLock} type='password' setValue={setPassword} />
                    <Inputs id='confirm' label='Confirm Password' placeholder='Password' Icon={FaLock} type='password' setValue={setConfirmPassword} />
                    <button type='submit' className='register-button'>Submit</button>
                </form>
            </div>
        </main>
    )
}
