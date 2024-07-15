
import { MacroColumn } from "../macros/MacroColumn"
import '@/styles/MealPlanRecommendationCard.css'
import { PROTEIN_COLOR, CARBS_COLOR, FATS_COLOR } from "@/app/consts"

type MealPlanRecommendationCardProps = {
    foodName: string,
    protein: number,
    carbs: number,
    fats: number
}

export const MealPlanRecommendationCard = ({ foodName, protein, carbs, fats }: MealPlanRecommendationCardProps) => {
    const MACRO_TEXT_SIZE = 2

    return (
        <div className="meal-plan-recommendation-main-container">
            <div className="meal-plan-recommendation-food-container">
                <p className="meal-plan-recommendation-food-name">
                    {foodName}
                </p>
            </div>
            <div className="meal-plan-recommendation-macros">
                <MacroColumn size={MACRO_TEXT_SIZE} macro={`${protein}`} numberColor={PROTEIN_COLOR} label="Protein" labelColor={PROTEIN_COLOR} />
                <MacroColumn size={MACRO_TEXT_SIZE} macro={`${carbs}`} numberColor={CARBS_COLOR} label="Carbs" labelColor={CARBS_COLOR} />
                <MacroColumn size={MACRO_TEXT_SIZE} macro={`${fats}`} numberColor={FATS_COLOR} label="Fats" labelColor={FATS_COLOR} />
            </div>
        </div>
    )
}
