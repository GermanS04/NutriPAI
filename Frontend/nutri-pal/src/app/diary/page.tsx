'use client'

import { DayMeals } from "@/components/diary/DayMeals"
import { TopBarMain } from "@/components/navigation/TopBarMain"
import { Modal } from '@/components/modal/Modal'
import { MealModal } from "@/components/diary/MealModal"
import '@/styles/diary.css'
import { useEffect, useState } from "react"
import axios from "axios"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase-config"
import { BASE_URL_REST_API } from "../consts"

export default function diary() {
    const [user, setUser] = useState<any>({})
    const [getFlag, setGetFlag] = useState(false)
    const [dates, setDates] = useState<any>(null)

    const [modalMeal, setModalMeal] = useState<any>(null);

    const months_dictionary: { [key: number]: string } = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "June",
        7: "July",
        8: "Aug",
        9: "Sept",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    };

    const isoToDate = (iso: string) => {
        const dateArray = iso.split('-')

        return (`${months_dictionary[parseInt(dateArray[1])]} ${dateArray[2].slice(0, 2)}, ${dateArray[0]}`)
    }

    // Setting the user that was authenticated by Firebase to a variable
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
            setGetFlag(true)
        }
    })

    useEffect(() => {
        if (getFlag) {
            const HISTORY_DAYS = BASE_URL_REST_API + 'history/registered_days/' + user.uid;
            axios.get(HISTORY_DAYS)
                .then((response) => { setDates(response.data) })
                .catch((error) => { alert('There has been an error trying to get the dates of the user \n' + error) })
        }
    }, [getFlag])

    const [openModal, setOpenModal] = useState(false)

    const toggleModal = () => {
        if (openModal) {
            setOpenModal(false)
        } else {
            setOpenModal(true)
        }
    }

    return (
        <>
            <TopBarMain />
            <main className="diary-main-container">
                <div className="diary-days-container-container">
                    <div className="diary-days-container">
                        {dates?.map((date: any) => {
                            return (
                                <DayMeals key={date.date} isoDate={date.date} date={isoToDate(date.date)} toggle={toggleModal} setModalMeal={setModalMeal} userId={user.uid} />
                            )
                        })}
                    </div>
                </div>
                <div className="diary-filters-container">
                    b
                </div>
            </main>
            {openModal && <Modal content={<MealModal data={modalMeal} />} modalToggle={toggleModal} />}
        </>
    )
}
