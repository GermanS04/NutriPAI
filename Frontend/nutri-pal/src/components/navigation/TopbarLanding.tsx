'use client'

import '@/styles/TopbarLanding.css'
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/app/firebase-config"
import { useEffect, useState } from 'react';
import { ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_REGISTER } from '@/app/consts';

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
        router.push(ROUTE_LOGIN)
    }

    const goRegister = () => {
        if (Object.keys(user).length === 0) {
            router.push(ROUTE_REGISTER)
        } else {
            router.push(ROUTE_DASHBOARD)
        }
    }

    return (
        <div className="topbarlanding-main-container">
            <div className="topbarlanding-logo-container">
                <p>NutriPal</p>
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
