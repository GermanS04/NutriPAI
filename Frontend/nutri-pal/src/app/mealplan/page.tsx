'use client'

import { MealPlanForm } from "@/components/mealplan/MealPlanForm"
import { MealPlanRecommendationList } from "@/components/mealplan/MealPlanRecommendationList"
import { TopBarMain } from "@/components/navigation/TopBarMain"
import '@/styles/mealplan.css'
import { useEffect, useState } from "react"

export default function MealPlan() {

    const [protein, setProtein] = useState('')
    const [carbs, setCarbs] = useState('')
    const [fats, setFats] = useState('')

    return (
        <>
            <TopBarMain />
            <main className="mealplan-main-container">
                <div className="mealplan-form-outer-container">
                    <div>
                        <p className="mealplan-form-title">Establish your goals for today</p>
                    </div>
                    <div>
                        <MealPlanForm setProtein={setProtein} setCarbs={setCarbs} setFats={setFats} />
                    </div>
                </div>
                <div className="meal-plan-recommendations-outer-container">
                    <div className="meal-plan-recommendations-container">
                        <MealPlanRecommendationList />
                    </div>
                </div>
            </main>
        </>
    )
}
