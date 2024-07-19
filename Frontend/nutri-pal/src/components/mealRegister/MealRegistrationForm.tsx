'use client'

import '@/styles/MealRegistrationForm.css'
import { BASE_URL_REST_API, CUISINE_TYPES, userData } from '@/app/consts'
import axios from 'axios'
import { auth } from '@/app/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { MealRegistrationFormNutrientInput } from './MealRegistrationFormNutrientInput'

type MealRegistrationFormProps = {
    name?: string;
    protein?: number;
    carbs?: number;
    fats?: number;
    kcal?: number;
    submitFunction: Function;
}

type MealRegistrationFormData = {
    name: string;
    category: string;
    description: string;
    protein: string;
    carbs: string;
    fats: string;
    calories: string;
    cuisine: string;
}

export const MealRegistrationForm = ({ name, protein, carbs, fats, kcal, submitFunction }: MealRegistrationFormProps) => {
    const [user, setUser] = useState<userData>()
    const [like, setLike] = useState(false);

    useEffect(() => {
        // Setting the user that was authenticated by Firebase to a variable
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        })
    }, [])

    // When the form is submitted then do a POST request to the REST API of Meals
    const sendMeal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const values = Object.fromEntries(data.entries()) as MealRegistrationFormData;

        axios.post(BASE_URL_REST_API + 'meals', {
            name: values.name,
            category: values.category,
            description: values.description,
            proteins: parseInt(values.protein),
            carbs: parseInt(values.carbs),
            fats: parseInt(values.fats),
            calories: parseInt(values.calories),
            cuisine: values.cuisine,
            like: like,
            userId: user?.uid
        })

        submitFunction()
    }

    const foodNameInput = (
        <div className='meal-register-form-input'>
            <p>Name of the food</p>
            <input className="meal-register-form-input-name" name='name' required type="text" placeholder="Enter food name..." defaultValue={name} />
        </div>
    )

    const descriptionInput = (
        <div className='meal-register-form-input'>
            Description (Optional)
            <textarea className="meal-register-form-input-description" name='description' placeholder="From restaurant..." />
        </div>
    )

    const categoryDropDown = (
        <div className='meal-register-form-input'>
            Breakfast / Lunch / Dinner
            <select className='meal-register-form-select-category' defaultValue='' name='category' required>
                <option value='' disabled>Select a Category</option>
                <option value='Breakfast'>Breakfast</option>
                <option value='Lunch'>Lunch</option>
                <option value='Dinner'>Dinner</option>
            </select>
        </div>
    )

    const cuisineDropDown = (
        <div className='meal-register-form-input'>
            Cuisine Type
            <select className='meal-register-form-select-category' defaultValue='' name='cuisine' required>
                <option value='' disabled>Select a Cuisine</option>
                {CUISINE_TYPES.map((cuisine) => {
                    return (
                        <option value={`${cuisine}`}>{cuisine[0].toUpperCase() + cuisine.slice(1, cuisine.length)}</option>
                    )
                })}
            </select>
        </div>
    )

    const submitButton = (
        <div className='meal-register-form-submit-button-container'>
            <button className='meal-register-form-submit-button' type="submit">
                Submit
            </button>
        </div>
    )

    return (
        <form className="meal-register-form-main-container" onSubmit={sendMeal}>
            {foodNameInput}
            {descriptionInput}
            {categoryDropDown}
            {cuisineDropDown}
            <div className='meal-register-form-grams-input-container'>
                <MealRegistrationFormNutrientInput label='Grams of Protein' name='protein' nutrient={protein} />
                <MealRegistrationFormNutrientInput label='Grams of Carbs' name='carbs' nutrient={carbs} />
                <MealRegistrationFormNutrientInput label='Grams of Fats' name='fats' nutrient={fats} />
                <MealRegistrationFormNutrientInput label='Calories' name='calories' nutrient={kcal} />
            </div>
            {submitButton}
        </form>
    )
}
