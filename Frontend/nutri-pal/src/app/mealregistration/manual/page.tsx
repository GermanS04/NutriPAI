'use client'

import '@/styles/manualMeal.css'
import { MealRegistrationForm } from "@/components/mealRegister/MealRegistrationForm"
import { TopBarMain } from "@/components/navigation/TopBarMain"


export default function manual() {
    return (
        <>
            <TopBarMain />
            <main className="manual-meal-main-container">
                <div className="manual-meal-title">
                    Manual Registration
                </div>
                <MealRegistrationForm />
            </main>
        </>
    )
}
