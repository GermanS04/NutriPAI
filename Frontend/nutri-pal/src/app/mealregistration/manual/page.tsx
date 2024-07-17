'use client'

import '@/styles/manualMeal.css'
import { MealRegistrationForm } from "@/components/mealRegister/MealRegistrationForm"
import { Layout } from '@/components/layout/Layout'
import { useState } from 'react';
import { MealRegistrationModalSubmitted } from '@/components/mealRegister/MealRegistrationModalSubmitted';


export default function manual() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <Layout>
            <main className="manual-meal-main-container">
                <div className="manual-meal-title">
                    Manual Registration
                </div>
                <MealRegistrationForm submitFunction={() => setSubmitted(true)} />
            </main>
            {submitted && <MealRegistrationModalSubmitted />}
        </Layout>
    )
}
