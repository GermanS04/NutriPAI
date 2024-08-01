'use client'

import { useState } from "react";
import { TiDelete } from "react-icons/ti";

type IngredientsSubmittedProps = {
    ingredient: string;
    removeIngredient: Function;
    index: number;
}

export const IngredientSubmitted = ({ ingredient, index, removeIngredient }: IngredientsSubmittedProps) => {
    const DELETE_ICON_SIZE = 20
    const [deleteIcon, setDeleteIcon] = useState(false)

    const toggleDelete = () => {
        setDeleteIcon(!deleteIcon)
    }

    return (
        <div className="ingredient-submitted" onClick={() => removeIngredient(index)} onMouseEnter={toggleDelete} onMouseLeave={toggleDelete}>
            {deleteIcon &&
                <div className="ingredient-submitted-delete">
                    <TiDelete size={DELETE_ICON_SIZE} />
                </div>}
            {ingredient}
        </div>
    )
}
