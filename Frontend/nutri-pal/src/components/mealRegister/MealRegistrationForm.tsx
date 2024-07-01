'use client'

import '@/styles/MealRegistrationForm.css'
import { BASE_URL_REST_API } from '@/app/consts'
import axios from 'axios'
import { auth } from '@/app/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'

export const MealRegistrationForm = () => {
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        }
    })

    const sendMeal = (e: any) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const values = Object.fromEntries(data.entries());

        axios.post(BASE_URL_REST_API + 'meals', {
            name: values.name,
            category: values.category,
            description: values.description,
            proteins: parseInt(values.protein),
            carbs: parseInt(values.carbs),
            fats: parseInt(values.fats),
            calories: parseInt(values.calories),
            userId: user.uid
        })
    }

    return (
        <form className="meal-register-form-main-container" onSubmit={sendMeal}>
            <div className='meal-register-form-input'>
                <p>
                    Name of the food
                </p>
                <input className="meal-register-form-input-name" name='name' required type="text" placeholder="Enter food name..." />
            </div>
            <div className='meal-register-form-input'>
                Description (Optional)
                <textarea className="meal-register-form-input-description" name='description' placeholder="From restaurant..." />
            </div>
            <div className='meal-register-form-input'>
                Breakfast / Lunch / Dinner
                <select className='meal-register-form-select-category' defaultValue='' name='category' required>
                    <option value='' disabled>Select a Category</option>
                    <option value='Breakfast'>Breakfast</option>
                    <option value='Lunch'>Lunch</option>
                    <option value='Dinner'>Dinner</option>
                </select>
            </div>
            <div className='meal-register-form-grams-input-container'>
                <div>
                    Grams of Protein
                    <input name='protein' type="text" inputMode='numeric' />
                </div>
                <div>
                    Grams of Carbs
                    <input name='carbs' type="text" inputMode='numeric' />
                </div>
                <div>
                    Grams of Fats
                    <input name='fats' type="text" inputMode='numeric' />
                </div>
                <div>
                    Calories
                    <input name='calories' type="text" inputMode='numeric' />
                </div>
            </div>
            <div>
                <button className='meal-register-form-submit-button' type="submit">
                    Submit
                </button>
            </div>

        </form>
    )
}
