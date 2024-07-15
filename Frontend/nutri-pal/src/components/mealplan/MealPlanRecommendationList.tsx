
import { MdNoMeals } from "react-icons/md"
import { MealPlanRecommendationCard } from "./MealPlanRecommendationCard"
import '@/styles/MealPlanRecommendationList.css'

type Meal = {
    name: string,
    ingredients: Array<string>,
    protein: number,
    carbs: number,
    fats: number
}

type MealPlanRecommendationListProps = {
    meals: Array<Meal>,
    openIngredients: Function
}

export const MealPlanRecommendationList = ({ meals, openIngredients }: MealPlanRecommendationListProps) => {
    const NO_MEAL_ICON_SIZE = 175

    return (
        <>
            {meals.length === 0 &&
                <div className="meal-plan-recommendation-list-empty-main-container">
                    <MdNoMeals className="meal-plan-recommendation-empty-icon" size={NO_MEAL_ICON_SIZE} />
                </div>
            }
            {meals.length !== 0 &&
                <div className="meal-plan-recommendation-list-main-container">
                    <div>
                        <p className="meal-plan-recommendation-list-title">Based on your goals, we recommend you:</p>
                    </div>
                    <div className="meal-plan-recommendation-list-cards-contianer">
                        {meals.map((meal) => {
                            return (
                                <MealPlanRecommendationCard key={meal.name} foodName={meal.name} protein={meal.protein} carbs={meal.carbs} fats={meal.fats} />
                            )
                        })}
                    </div>
                    <div className="meal-plan-recommendation-ingredients-container">
                        <button className="meal-plan-recommendation-ingredients" onClick={() => openIngredients()}>
                            See Ingredients
                        </button>
                    </div>
                </div>}
        </>
    )
}
