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
import axios from "axios"
import { BASE_URL_REST_API } from "../consts"

interface todayInfo {
    proteins: number,
    carbs: number,
    fats: number,
    calories: number
}

export default function Dashboard() {
    const router = useRouter();

    const [user, setUser] = useState<any>({})
    const [loading, setLoading] = useState(true);
    const [getFlag, setGetFlag] = useState(false);

    const [todayInfo, setTodayInfo] = useState<todayInfo>({
        proteins: 0,
        carbs: 0,
        fats: 0,
        calories: 0
    })

    // Function to get the sum of proteins, carbs, fats, calories from all the meals of today from the REST API
    const getTodayInfo = () => {
        axios.get(BASE_URL_REST_API + `today/${user.uid}`)
            .then((response) => { setTodayInfo(response.data[0]) })
            .catch((error) => { alert(`There was an error trying to get today's information of the user \n` + error) })
    }

    // Setting the user that was authenticated by Firebase to a variable
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setGetFlag(true)
            }
        })
    }, [])

    // When getting the user UID then do the GET request
    useEffect(() => {
        if (getFlag) {
            getTodayInfo()
            setLoading(false)
        }
    }, [getFlag])

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
                        <MacroCards macroNum={todayInfo.proteins} macroType="p" />
                        <MacroCards macroNum={todayInfo.carbs} macroType="c" />
                        <MacroCards macroNum={todayInfo.fats} macroType="f" />
                    </div>
                </div>
                <div className="dashboard-progress-container">
                    <p className="dashboard-progress-title">
                        Today's Progress
                    </p>
                    <div className="dashboard-progress-bar-container">
                        <ProgressBar max={1500} actual={todayInfo.calories} />
                    </div>
                </div>
            </main>
        </>
    )
}
