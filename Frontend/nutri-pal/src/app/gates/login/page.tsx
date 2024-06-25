'use client'
import { useRouter } from 'next/navigation';
import '@/styles/login.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";


export default function login() {
    const router = useRouter();
    const arrowSize = 25;

    const onBackArrow = () => {
        router.replace('/');
    }

    return(
        <main className="login-main-container">
            <div className='login-form-container'>
                <div className='login-text'>
                    <button onClick={onBackArrow}>
                        <FaArrowCircleLeft size={arrowSize} className='login-back-icon'/>
                    </button>
                    <p>Sign in</p>
                </div>
                <form className='login-form'>
                    <div className='login-input-container'>
                        <label htmlFor="email-input">Email</label>
                        <div className='login-input-icon-container'>
                            <FaUser className='login-icon'/>
                            <input id='email-input' placeholder="email@example.com" type='text'/>
                        </div>
                    </div>
                    <div className='login-input-container'>
                        <label htmlFor="password-input">Password</label>
                        <div className='login-input-icon-container'>
                            <FaLock className='login-icon'/>
                            <input id='password-input' placeholder="Password" type='password'/>
                        </div>
                    </div>
                    <button type='submit' className='login-button'>Submit</button>
                </form>
            </div>
        </main>
    )
}
