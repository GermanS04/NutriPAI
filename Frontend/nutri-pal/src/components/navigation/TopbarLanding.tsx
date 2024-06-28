'use client'

import '@/styles/TopbarLanding.css'
import { useRouter } from 'next/navigation';

export const TopbarLanding = () => {
    const router = useRouter();

    const goLogin = () => {
        router.push('/gates/login')
    }

    const goRegister = () => {
        router.push('/gates/register')
    }

    return (
        <div className="topbarlanding-main-container">
            <div className="topbarlanding-logo-container">
                <h1>LOGO</h1>
            </div>
            <div className="topbarlanding-navigation-container">
                <div className="topbarlanding-navigation-links">
                    <p>Home</p>
                    <p>About Us</p>
                    <p>Contact</p>
                </div>
            </div>
            <div className="topbarlanding-auth-container">
                <div className="topbarlanding-auth-buttons-container">
                    <button className="topbarlangin-login-button" onClick={goLogin}>Login</button>
                    <button className="topbarlangin-register-button" onClick={goRegister}>Register</button>
                </div>
            </div>

        </div>
    )
}
