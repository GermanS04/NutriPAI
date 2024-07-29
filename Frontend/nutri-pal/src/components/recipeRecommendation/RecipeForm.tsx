'use client'

import { useEffect, useState } from 'react';
import { HealthLabels } from './HealthLabels';
import { IngredientsInput } from './IngredientsInput';
import { TimeCookDropdown } from './TimeCookDropdown';
import { Tooltip } from '../tooltip/Tooltip';
import { MacroInput } from './MacroInput';
import '@/styles/RecipeForm.css'

export const RecipeForm = () => {

    const [ingredients, setIngredients] = useState<string[]>([])
    const [timecook, setTimeCook] = useState<string>('Fast')
    const [randomnessValue, setRandomnessValue] = useState(50)
    const [healthLabels, setHealthLabels] = useState<string[]>([])
    const [excludeIngredients, setExcludeIngredients] = useState<string[]>([])
    const [proteinInput, setProteinInput] = useState<number>(0)
    const [carbsInput, setCarbsInput] = useState<number>(0)
    const [fatsInput, setFatsInput] = useState<number>(0)
    const [kcalInput, setKcalInput] = useState<number>(0)

    const onChangeRandomness = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRandomnessValue(parseInt(e.target.value))
    }

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
                <MacroInput classNameContainer="recipeform-macros-container" classNameInput='recipeform-macros-input' classNameLabel='recipeform-macros-label' label='Kcal' setMacro={setKcalInput} />
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
        <form className='recipeform-main-container'>
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
