'use client'
import { BASE_URL_REST_API } from '@/app/consts'
import '@/styles/DayMeals.css'
import axios from 'axios'
import { useState } from 'react'

interface meals {
    isoDate: string,
    date: string,
    toggle: any,
    setModalMeal: any,
    userId: any
}

export const DayMeals = ({ isoDate, date, toggle, setModalMeal, userId }: meals) => {
    const [category, setCategory] = useState('')

    // GET request for getting the meals of a certain date of a user with a category (Breakfast, Lunch or Dinner)
    const getMealsCategory = (category: string) => {
        axios.get(BASE_URL_REST_API + `meals/${isoDate}/${userId}?category=${category}`)
            .then((response) => { setModalMeal(response.data) })
    }

    return (
        <div className="day-meal-main-container">
            <div className="day-meal-date-container">
                <p className="day-meal-date">{date}</p>
            </div>
            <div className='day-meal-meals-container'>
                <div className='day-meal-meals' onClick={() => { getMealsCategory('Breakfast'); toggle() }}>
                    Breakfast
                </div>
                <div className='day-meal-meals' onClick={() => { getMealsCategory('Lunch'); toggle() }}>
                    Lunch
                </div>
                <div className='day-meal-meals' onClick={() => { getMealsCategory('Dinner'); toggle() }}>
                    Dinner
                </div>
            </div>
        </div>
    )
}
