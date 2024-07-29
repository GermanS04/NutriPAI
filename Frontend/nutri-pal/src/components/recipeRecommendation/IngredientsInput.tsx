'use client'

import { useState } from "react";
import { GrReturn } from "react-icons/gr";
import '@/styles/IngredientsInput.css'
import { IngredientSubmitted } from "./IngredientSubmitted";

type IngredientsInputProps = {
    ingredients: string[];
    setIngredients: Function;
}

export const IngredientsInput = ({ ingredients, setIngredients }: IngredientsInputProps) => {
    const RETURN_ICON_SIZE = 20

    const [ingredientInput, setIngredientInput] = useState('')

    const changeIngredientInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredientInput(e.target.value)
    }

    const handleSubmitKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            setIngredients([...ingredients, ingredientInput])
            setIngredientInput('')
        }
    }

    const handleSubmit = () => {
        setIngredients([...ingredients, ingredientInput])
    }

    const removeIngredient = (index: number) => {
        const newIngre = [...ingredients]
        newIngre.splice(index, 1)
        setIngredients(newIngre)
    }

    return (
        <div className="ingredients-input-main-container">
            <div className="ingredients-input-container">
                <input className="ingredients-input-bar" type="text" name="ingredient" onChange={changeIngredientInput} value={ingredientInput} onKeyDown={handleSubmitKeyboard} />
                <button className="ingredeints-input-bar-submit" type="button" onClick={handleSubmit}>
                    <GrReturn size={RETURN_ICON_SIZE} />
                </button>
            </div>
            <div className={`ingredients-submitted-container ${(ingredients.length > 0) ? "ingredients-submitted-true" : ''}`}>
                {ingredients?.map((ingredient, index) => (
                    <IngredientSubmitted key={index} ingredient={ingredient} index={index} removeIngredient={removeIngredient} />
                ))}
            </div>
        </div>
    )
}
