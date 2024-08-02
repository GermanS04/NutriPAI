
import '@/styles/MealPlanIngredientsModal.css'

type MealPlanIngredientsModal = {
    ingredients: string[];
}

const capitalLetter = (string: string | undefined) => {
    if (string === null || string === undefined) {
        return
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const MealPlanIngredientsModal = ({ ingredients }: MealPlanIngredientsModal) => {
    return (
        <div className='meal-plan-ingredients-modal'>
            <div>
                <p className='meal-plan-ingredients-modal-title'>
                    The Ingredients you need for the meal plan are:
                </p>
            </div>
            <div className='meal-plan-ingredients-modal-list-container'>
                <ul className='meal-plan-ingredients-modal-list'>
                    {ingredients?.map((ingredient) => {
                        return (
                            <li key={ingredient} className='meal-plan-ingredient'>{capitalLetter(ingredient)}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
