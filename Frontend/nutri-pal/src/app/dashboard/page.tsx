'use client'

import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase-config"
import { useRouter } from "next/navigation"
import { TopBarMain } from "@/components/navigation/TopBarMain"
import '@/styles/dashboard.css'
import { MacroCards } from "@/components/dashboard/MacroCards"
import { ProgressBar } from "@/components/dashboard/ProgressBar"
import { Loading } from "@/components/loading/Loading"

export default function Dashboard() {
    const router = useRouter();

    const [user, setUser] = useState<any>({})
    const [loading, setLoading] = useState(true);

    // Setting the user that was authenticated by Firebase to a variable
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
        })
        setLoading(false)
    }, [])

    // Function to logout and return to the landing page
    const logout = async () => {
        await signOut(auth);
        router.replace('/');
    }

    const sendMealRegistration = () => {
        router.replace('/mealregistration')
    }

    return (
        <>
            {loading && <Loading />}
            <TopBarMain />
            <main className="dashboard-main-container">
                <div className="dashboard-today-macro-container">
                    <p className="dashboard-today-macro-title">
                        Today's Macronutrients
                    </p>
                    <div className="dashboard-today-macro-cards-container">
                        <MacroCards macroNum={60} macroType="p" />
                        <MacroCards macroNum={70} macroType="c" />
                        <MacroCards macroNum={80} macroType="f" />
                    </div>
                </div>
                <div className="dashboard-progress-container">
                    <p className="dashboard-progress-title">
                        Today's Progress
                    </p>
                    <div className="dashboard-progress-bar-container">
                        <ProgressBar />
                    </div>
                </div>
            </main>
        </>
    )
}
