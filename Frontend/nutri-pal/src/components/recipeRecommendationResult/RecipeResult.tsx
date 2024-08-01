
import { Recipe } from "@/app/consts"
import '@/styles/RecipeResults.css'
import { Tooltip } from "../tooltip/Tooltip";
import { MacroColumn } from "../macros/MacroColumn";
import { FaInfoCircle } from "react-icons/fa";


type RecipeResultProps = {
    food?: Recipe;
}

const capitalLetter = (string: string | undefined) => {
    if (string === null || string === undefined) {
        return
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const RecipeResult = ({ food }: RecipeResultProps) => {
    const MACRO_SIZE = 1.75
    const INFO_ICON_SIZE = 20

    const makeList = (food: any, columns: number) => {
        return (
            <ul className="list-label-container" style={{
                MozColumnCount: `${columns}`,
                WebkitColumnCount: `${columns}`,
                columnCount: `${columns}`
            }}>
                {food?.map((label: string) => {
                    return (
                        <li key={label}>
                            {label}
                        </li>
                    )
                })}
            </ul>
        )
    }

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.target.src = 'https://t3.ftcdn.net/jpg/01/79/59/92/360_F_179599293_7mePKnajSM4bggDa8NkKpcAHKl3pow2l.jpg';
    }


    const recipeImg = (
        <div className="recipe-results-image-container">
            <img className="recipe-results-image" src={food?.images.REGULAR.url} onError={handleImageError} />
        </div>
    )

    const foodName = (
        <p className="recipe-results-title-food">{food?.label}</p>
    )

    const foodCategory = (
        <div className="recipe-results-info-display">
            <p className="recipe-results-info-subtitle">Category: </p>
            <p>{capitalLetter(food?.mealType[0])}</p>
        </div>
    )

    const foodCuisine = (
        <div className="recipe-results-info-display">
            <p className="recipe-results-info-subtitle">Cuisine: </p>
            <p>{capitalLetter(food?.cuisineType[0])}</p>
        </div>
    )

    const foodTime = (
        <div className="recipe-results-info-display">
            <p className="recipe-results-info-subtitle">Time to Cook: </p>
            <p>{food?.totalTime} minutes</p>
        </div>
    )

    const foodHealthLabels = (
        <div className="recipe-results-lists">
            <p className="recipe-results-info-subtitle">Health Labels</p>
            <Tooltip trigger={<FaInfoCircle size={INFO_ICON_SIZE} />} tooltipText={makeList(food?.healthLabels, 3)} position="left" width="large" />
        </div>
    )

    const foodIngredients = (
        <div className="recipe-results-lists">
            <p className="recipe-results-info-subtitle">Ingredients</p>
            <Tooltip trigger={<FaInfoCircle size={INFO_ICON_SIZE} />} tooltipText={makeList(food?.ingredientLines, 2)} position="left" width="extralarge" />
        </div>
    )

    const foodDietLabels = (
        <div className="recipe-results-lists">
            <p className="recipe-results-info-subtitle">Diet Labels</p>
            <Tooltip trigger={<FaInfoCircle size={INFO_ICON_SIZE} />} tooltipText={makeList(food?.dietLabels, 1)} position="left" width="normal" />
        </div>
    )

    const goRecipeButton = (
        <a href={food?.url}>
            <button className="recipe-results-buttons">
                Go to Recipe
            </button>
        </a>
    )

    return (
        <>
            {(food === null || food === undefined) &&
                <div className="recipe-no-results-main-container">
                    <p>No Recipes</p>
                </div>
            }
            {(food !== null && food !== undefined) &&
                <div className="recipe-results-main-container">
                    <div className="recipe-results-title-container">
                        <p>Our Recommendation: </p>
                    </div>
                    <div className="recipe-results-info-container">
                        <div className="recipe-results-top-info-container">
                            {recipeImg}
                            <div className="recipe-results-details-container">
                                {foodName}
                                {foodCategory}
                                {foodCuisine}
                                {foodTime}
                                {foodHealthLabels}
                                {foodIngredients}
                                {foodDietLabels}
                            </div>
                        </div>
                        <div className="recipe-results-macros-container">
                            <MacroColumn size={MACRO_SIZE} unit="g" macro={`${Math.round(food.totalNutrients.PROCNT.quantity)}`} numberColor="black" label="Protein" labelColor="black" />
                            <MacroColumn size={MACRO_SIZE} unit="g" macro={`${Math.round(food.totalNutrients.CHOCDF.quantity)}`} numberColor="black" label="Carbs" labelColor="black" />
                            <MacroColumn size={MACRO_SIZE} unit="g" macro={`${Math.round(food.totalNutrients.FAT.quantity)}`} numberColor="black" label="Fats" labelColor="black" />
                            <MacroColumn size={MACRO_SIZE} unit="kcal" macro={`${Math.round(food.totalNutrients.ENERC_KCAL.quantity)}`} numberColor="black" label="Protein" labelColor="black" />
                        </div>
                    </div>
                    <div className="recipe-results-other-container">
                        {goRecipeButton}
                    </div>
                </div>
            }
        </>
    )
}
