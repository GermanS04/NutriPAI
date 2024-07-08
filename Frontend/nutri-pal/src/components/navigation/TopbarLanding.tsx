'use client'

import '@/styles/TopbarLanding.css'
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/app/firebase-config"
import { useEffect, useState } from 'react';

export const TopbarLanding = () => {
    const router = useRouter();

    const [user, setUser] = useState({})

    // Setting the user that was authenticated by Firebase to a variable
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        })
    })

    const goLogin = () => {
        router.push('/gates/login')
    }

    const goRegister = () => {
        if (Object.keys(user).length === 0) {
            router.push('/gates/register')
        } else {
            router.push('/dashboard')
        }
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
