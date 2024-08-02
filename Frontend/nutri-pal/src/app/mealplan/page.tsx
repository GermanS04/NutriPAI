'use client'

import { MealPlanForm } from "@/components/mealplan/MealPlanForm"
import { MealPlanIngredientsModal } from "@/components/mealplan/MealPlanIngredientsModal"
import { MealPlanRecommendationList } from "@/components/mealplan/MealPlanRecommendationList"
import { Modal } from "@/components/modal/Modal"
import '@/styles/mealplan.css'
import { useEffect, useState } from "react"
import { dummyData } from '../TechnicalChallenge1/dummyData'
import { getRecommendations, getIngredients } from '../TechnicalChallenge1/Script'
import { Layout } from "@/components/layout/Layout"
import { userData } from "../consts"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase-config"
import { Loading } from "@/components/loading/Loading"

type Meal = {
    name: string;
    ingredients: string[];
    protein: number;
    carbs: number;
    fats: number;
}

export default function MealPlan() {
    const [user, setUser] = useState<userData>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        })
    }, [])

    useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])

    // Inputs of user
    const [protein, setProtein] = useState('')
    const [carbs, setCarbs] = useState('')
    const [fats, setFats] = useState('')

    // Array of the recommended meals
    const [meals, setMeals] = useState<Meal[]>([])

    // Flag to open close modal with ingredients
    const [ingredientsModal, setIngredientsModal] = useState(false)

    // Array of the overlapping ingredients of the meals
    const [ingredientsList, setIngredientsList] = useState<string[]>([])

    // Function to open and close ingredients modal
    const toggleIngredientsModal = () => {
        setIngredientsModal(!ingredientsModal)
    }

    // Calls the function of the script from the technical challenge which involve the usage of Graph.js
    const searchRecommendations = () => {
        const mealPlan: Meal[] = getRecommendations(dummyData, parseFloat(protein), parseFloat(carbs), parseFloat(fats))
        setMeals(mealPlan)
    }

    // When we get the recommended meals then get the ingredients that are used for those meals
    useEffect(() => {
        if (meals.length !== 0) {
            const ingredientsList: string[] = getIngredients(meals)
            setIngredientsList(ingredientsList)
        }
    }, [meals])

    return (
        <Layout>
            {loading && <Loading />}
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
                        <MealPlanRecommendationList meals={meals} openIngredients={toggleIngredientsModal} />
                    </div>
                </div>
            </main>
            {ingredientsModal && <Modal content={<MealPlanIngredientsModal ingredients={ingredientsList} />} width={40} height={90} modalToggle={toggleIngredientsModal} />}
        </Layout>
    )
}
