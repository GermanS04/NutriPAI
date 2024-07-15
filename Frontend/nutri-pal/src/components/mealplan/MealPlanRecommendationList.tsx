
import { MealPlanRecommendationCard } from "./MealPlanRecommendationCard"
import '@/styles/MealPlanRecommendationList.css'

export const MealPlanRecommendationList = () => {
    return (
        <div className="meal-plan-recommendation-list-main-container">
            <div>
                <p className="meal-plan-recommendation-list-title">Based on your goals, we recommend you:</p>
            </div>
            <div className="meal-plan-recommendation-list-cards-contianer">
                <MealPlanRecommendationCard foodName="Tacos" protein={75} carbs={69} fats={42} />
                <MealPlanRecommendationCard foodName="Tacos" protein={75} carbs={69} fats={42} />
                <MealPlanRecommendationCard foodName="Tacos" protein={75} carbs={69} fats={42} />
            </div>
            <div className="meal-plan-recommendation-ingredients-container">
                <button className="meal-plan-recommendation-ingredients">
                    See Ingredients
                </button>
            </div>
        </div>
    )
}
