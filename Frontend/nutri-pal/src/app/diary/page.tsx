'use client'

import { DayMeals } from "@/components/diary/DayMeals"
import { TopBarMain } from "@/components/navigation/TopBarMain"
import { Modal } from "@/components/modal/modal"
import '@/styles/diary.css'
import { useState } from "react"

export default function diary() {

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
                        <DayMeals toggle={toggleModal} />
                    </div>
                </div>
                <div className="diary-filters-container">
                    b
                </div>
            </main>
            {openModal && <Modal modalToggle={toggleModal} />}
        </>
    )
}
