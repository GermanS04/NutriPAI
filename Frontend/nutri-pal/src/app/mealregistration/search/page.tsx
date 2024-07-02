'use client'

import { BASE_URL_EDAMAME_SEARCH_API } from "@/app/consts";
import { MealRegistrationForm } from "@/components/mealRegister/MealRegistrationForm"
import { TopBarMain } from "@/components/navigation/TopBarMain"
import '@/styles/searchMeal.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";


export default function search() {
    const SEARCH_ICON_SIZE = 20;

    const [searchQuery, setSearchQuery] = useState('');
    const [foods, setFoods] = useState<any>([]);
    const [page, setPage] = useState(0);

    const searchFoods = () => {
        axios.get(BASE_URL_EDAMAME_SEARCH_API + `&ingr=${searchQuery}` + `&page=${page}`)
            .then((response: { data: any }) => {
                if (foods === null) {
                    setFoods(response.data.hints)
                } else {
                    setFoods([...foods, ...response.data.hints])
                }
            })
    }

    useEffect(() => {
        if (page !== 0) {
            searchFoods();
        }
    }, [page])

    return (
        <>
            <TopBarMain />
            <main className="search-meal-main-container">
                <div className="search-meal-title">
                    Search Registration
                </div>
                <div className="search-meal-input-container">
                    <p>Search Food</p>
                    <div className="search-meal-input-search-bar-container">
                        <input className="search-meal-input" placeholder="Search for food..." onChange={(e) => { setFoods([]); setSearchQuery(e.target.value) }} />
                        <button className="search-meal-search-button" onClick={searchFoods}>
                            <IoSearchSharp className="search-meal-search-icon" size={SEARCH_ICON_SIZE} />
                        </button>
                    </div>
                    <button onClick={() => setPage(page + 1)}>
                        +
                    </button>
                </div>
                <div className="search-meal-divisor"></div>
                <MealRegistrationForm />
            </main>
        </>
    )
}
