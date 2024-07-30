'use client'

import { useEffect, useState } from 'react';
import { HealthLabels } from './HealthLabels';
import { IngredientsInput } from './IngredientsInput';
import { TimeCookDropdown } from './TimeCookDropdown';
import { Tooltip } from '../tooltip/Tooltip';
import { MacroInput } from './MacroInput';
import '@/styles/RecipeForm.css'
import { script } from '@/app/RecipeScript/script'
import data from '@/app/RecipeScript/data'
import axios from 'axios';
import { BASE_URL_REST_API } from '@/app/consts';
import { auth } from '@/app/firebase-config';

type RecipeFormProps = {
    setTreeRecipes: Function;
}

type Cuisine = {
    [key: string]: number;
}

const transformToCuisineLike = (cuisineData: Cuisine[]) => {
    const arr = []
    const cuisines = Object.keys(cuisineData[0])
    for (let cuisine of cuisines) {
        arr.push({ [cuisine]: cuisineData[0][cuisine] })
    }

    return arr
}

export const RecipeForm = ({ setTreeRecipes }: RecipeFormProps) => {

    const [ingredients, setIngredients] = useState<string[]>([])
    const [timecook, setTimeCook] = useState<string>('Fast')
    const [randomnessValue, setRandomnessValue] = useState(50)
    const [healthLabels, setHealthLabels] = useState<string[]>([])
    const [excludeIngredients, setExcludeIngredients] = useState<string[]>([])
    const [proteinInput, setProteinInput] = useState<number>(0)
    const [carbsInput, setCarbsInput] = useState<number>(0)
    const [fatsInput, setFatsInput] = useState<number>(0)
    const [todayKcal, setTodayKcal] = useState<number>(0)
    const [goalKcal, setGoalKcal] = useState<number>(0)
    const [cuisineLike, setCuisineLike] = useState<Cuisine[]>([])

    const onChangeRandomness = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRandomnessValue(parseInt(e.target.value))
    }

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.get(BASE_URL_REST_API + 'users/goal/' + auth.currentUser?.uid).then((response) => setGoalKcal(response.data.kcalGoal))
        axios.get(BASE_URL_REST_API + 'today/' + auth.currentUser?.uid).then((response) => setTodayKcal(response.data.calories))
        axios.get(BASE_URL_REST_API + 'meals/cuisine/' + auth.currentUser?.uid).then((response) => setCuisineLike(transformToCuisineLike(response.data)))
    }

    const getRecipes = () => {
        setTreeRecipes(script(data, ingredients, timecook, randomnessValue, healthLabels, excludeIngredients, proteinInput, carbsInput, fatsInput, goalKcal, todayKcal, cuisineLike, true, true, false))
    }

    useEffect(() => {
        if (cuisineLike.length > 0) {
            getRecipes()
        }
    }, [cuisineLike])

    const ingredientsInput = (
        <div className='recipeform-ingredients-container'>
            <p className='recipeform-ingredeints-title'>
                What ingredients do you have?
            </p>
            <IngredientsInput ingredients={ingredients} setIngredients={setIngredients} />
        </div>
    )

    const randomInput = (
        <div className='recipeform-randomness-container'>
            <p className='recipeform-filter-title'>Randomness</p>
            <Tooltip trigger={<input className='recipeform-random-input' type='range' min="0" max="100" defaultValue={randomnessValue} onChange={onChangeRandomness} />} tooltipText={`${randomnessValue}`} position='bottom' />
        </div>
    )

    const excludeInput = (
        <div className='recipeform-exclude-container'>
            <p className='recipeform-filter-title'>Exclude</p>
            <IngredientsInput ingredients={excludeIngredients} setIngredients={setExcludeIngredients} />
        </div>
    )

    const macrosInput = (
        <div className='recipeform-macros-container-container'>
            <p className='recipeform-filter-title'>Macros</p>
            <div className='recipeform-macros'>
                <MacroInput classNameContainer="recipeform-macros-container" classNameInput='recipeform-macros-input' classNameLabel='recipeform-macros-label' label='Protein' setMacro={setProteinInput} />
                <MacroInput classNameContainer="recipeform-macros-container" classNameInput='recipeform-macros-input' classNameLabel='recipeform-macros-label' label='Carbs' setMacro={setCarbsInput} />
                <MacroInput classNameContainer="recipeform-macros-container" classNameInput='recipeform-macros-input' classNameLabel='recipeform-macros-label' label='Fats' setMacro={setFatsInput} />
            </div>
        </div>
    )

    const submitFormButton = (
        <div className='recipeform-submit-container'>
            <button className='recipeform-submit-button' type='submit'>
                Submit
            </button>
        </div>
    )

    return (
        <form className='recipeform-main-container' onSubmit={onSubmitForm}>
            {ingredientsInput}
            <TimeCookDropdown setTimeCook={setTimeCook} />
            {randomInput}
            <HealthLabels healthLabels={healthLabels} setHealthLabels={setHealthLabels} />
            {excludeInput}
            {macrosInput}
            {submitFormButton}
        </form>
    )
}
