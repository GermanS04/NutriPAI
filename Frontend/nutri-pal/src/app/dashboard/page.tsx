'use client'

import { useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase-config"
import { useRouter } from "next/navigation"

export default function dashboard() {
    const router = useRouter();

    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
        }
    })

    const logout = async () => {
        await signOut(auth);
        router.replace('/');
    }

    console.log(user);

    return (
        <div>
            <p>
                {user?.email}
            </p>
            <button onClick={logout}>
                logout
            </button>
        </div>
    )
}
