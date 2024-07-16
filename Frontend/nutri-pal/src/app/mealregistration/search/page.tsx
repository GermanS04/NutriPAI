'use client'

import { BASE_URL_EDAMAME_SEARCH_API, BASE_URL_REST_API } from "@/app/consts";
import { MealRegistrationForm } from "@/components/mealRegister/MealRegistrationForm"
import { SearchResults } from "@/components/mealRegister/SearchResults";
import { TopBarMain } from "@/components/navigation/TopBarMain"
import '@/styles/searchMeal.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";


type ResponseEdamamHints = {
    food: {
        knownAs: string;
        nutrients: {
            ENERC_KCAL: number;
            PROCNT: number;
            FAT: number;
            CHOCDF: number;
            FIBTG: number;
        };
    };
}

type ResponseEdamam = {
    text: string;
    parsed: any[];
    hints: ResponseEdamamHints[];
}

export default function search() {
    const SEARCH_ICON_SIZE = 20;

    const [searchQuery, setSearchQuery] = useState('');
    const [foods, setFoods] = useState<ResponseEdamamHints[]>([]);
    const [page, setPage] = useState(0);

    // Searches food by query from Edamame API, returns array of 20 foods with nutrients
    const searchFoods = () => {
        axios.get(BASE_URL_EDAMAME_SEARCH_API + `&ingr=${searchQuery}` + `&page=${page}`)
            .then((response: { data: ResponseEdamam }) => {
                if (foods === null) {
                    setFoods(response.data.hints)
                } else {
                    setFoods([...foods, ...response.data.hints])
                }
            })
    }

    // Values for the default values of the form, as well to autofill
    const [foodName, setFoodName] = useState('')
    const [foodProtein, setFoodProtein] = useState(0)
    const [foodCarbs, setFoodCarbs] = useState(0)
    const [foodFats, setFoodFats] = useState(0)
    const [foodKcal, setFoodKcal] = useState(0)

    // Change the values of the form
    const autofill = (name: string, pro: number, carb: number, fat: number, kcal: number) => {
        setFoodName(name);
        setFoodProtein(pro);
        setFoodCarbs(carb);
        setFoodFats(fat);
        setFoodKcal(kcal);
    }

    // When the search bar changes then empty the array of searched foods, change the query state, and reset the page of the API
    const onChangeSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFoods([]);
        setSearchQuery(e.target.value)
        setPage(0)
    }

    // When loading more page increments by one and triggers the search food
    useEffect(() => {
        if (page !== 0) {
            searchFoods();
        }
    }, [page])

    const searchBar = (
        <div className="search-meal-input-search-bar-container">
            <input className="search-meal-input" placeholder="Search for food..." onChange={onChangeSearchBar} />
            <button className="search-meal-search-button" onClick={searchFoods}>
                <IoSearchSharp className="search-meal-search-icon" size={SEARCH_ICON_SIZE} />
            </button>
        </div>
    )

    const foodDropdown = (
        <div className="search-meal-search-results-container">
            {foods?.map((food: any) => {
                return (
                    <SearchResults key={food.food.foodId} data={food.food} autofill={autofill} />
                )
            })}
            <div className="search-meal-load-more-container">
                <button className="search-meal-load-more" onClick={() => setPage(page + 1)}>
                    Load More
                </button>
            </div>
        </div>
    )

    return (
        <>
            <TopBarMain />
            <main className="search-meal-main-container">
                <div className="search-meal-title">
                    Search Registration
                </div>
                <div className="search-meal-input-container">
                    <p className="search-meal-input-title">Search Food</p>
                    {searchBar}
                </div>
                {foods.length !== 0 && foodDropdown}
                <div className="search-meal-divisor"></div>
                <MealRegistrationForm name={foodName} protein={foodProtein} carbs={foodCarbs} fats={foodFats} kcal={foodKcal} />
            </main>
        </>
    )
}
