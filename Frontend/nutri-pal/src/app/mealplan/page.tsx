'use client'

import { MealPlanForm } from "@/components/mealplan/MealPlanForm"
import { MealPlanIngredientsModal } from "@/components/mealplan/MealPlanIngredientsModal"
import { MealPlanRecommendationList } from "@/components/mealplan/MealPlanRecommendationList"
import { Modal } from "@/components/modal/Modal"
import { TopBarMain } from "@/components/navigation/TopBarMain"
import '@/styles/mealplan.css'
import { useEffect, useState } from "react"
import { dummyData } from '../TechnicalChallenge1/dummyData'
import { getRecommendations, getIngredients } from '../TechnicalChallenge1/Script'

export default function MealPlan() {

    const [protein, setProtein] = useState('')
    const [carbs, setCarbs] = useState('')
    const [fats, setFats] = useState('')

    const [meals, setMeals] = useState([])

    const [ingredientsModal, setIngredientsModal] = useState(true)
    const [ingredientsList, setIngredientsList] = useState([])

    const toggleIngredientsModal = () => {
        setIngredientsModal(!ingredientsModal)
    }

    const searchRecommendations = () => {
        const mealPlan = getRecommendations(dummyData, parseFloat(protein), parseFloat(carbs), parseFloat(fats))
        setMeals(mealPlan)

    }

    useEffect(() => {
        if (meals.length !== 0) {
            const ingredientsList = getIngredients(meals)
            setIngredientsList(ingredientsList)
        }
    }, [meals])

    return (
        <>
            <TopBarMain />
            <main className="mealplan-main-container">
                <div className="mealplan-form-outer-container">
                    <div>
                        <p className="mealplan-form-title">Establish your goals for today</p>
                    </div>
                    <div>
                        <MealPlanForm setProtein={setProtein} setCarbs={setCarbs} setFats={setFats} submit={searchRecommendations} />
                    </div>
                </div>
                <div className="meal-plan-recommendations-outer-container">
                    <div className="meal-plan-recommendations-container">
                        <MealPlanRecommendationList />
                    </div>
                </div>
            </main>
            {ingredientsModal && <Modal content={<MealPlanIngredientsModal ingredients={ingredientsList} />} width={40} height={90} modalToggle={toggleIngredientsModal} />}
        </>
    )
}
