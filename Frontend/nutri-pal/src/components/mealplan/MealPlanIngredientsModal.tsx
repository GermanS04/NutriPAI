
import '@/styles/MealPlanIngredientsModal.css'

type MealPlanIngredientsModal = {
    ingredients: Array<string>,
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
                            <li className='meal-plan-ingredient'>{ingredient}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
