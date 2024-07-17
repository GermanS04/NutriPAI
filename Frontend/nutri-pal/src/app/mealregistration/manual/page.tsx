'use client'

import '@/styles/manualMeal.css'
import { MealRegistrationForm } from "@/components/mealRegister/MealRegistrationForm"
import { Layout } from '@/components/layout/Layout'


export default function manual() {
    return (
        <Layout>
            <main className="manual-meal-main-container">
                <div className="manual-meal-title">
                    Manual Registration
                </div>
                <MealRegistrationForm />
            </main>
        </Layout>
    )
}
