'use client'

import { useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase-config"
import { useRouter } from "next/navigation"

export default function dashboard() {
    const router = useRouter();

    const [user, setUser] = useState({})

    // Setting the user that was authenticated by Firebase to a variable
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
        }
    })

    // Function to logout and return to the landing page
    const logout = async () => {
        await signOut(auth);
        router.replace('/');
    }

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
