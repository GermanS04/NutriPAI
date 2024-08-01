const user = require('./inputs').userOutputs
const data_processing = require('./data_processing').getters
const helpers = require('./helpers')

var mealsNameSet = new Set()
var mealsNameSetSize = 0

const reset = () => {
    mealsNameSet = new Set()
    mealsNameSetSize = 0
}

const checkOverlap = (food) => {
    const ingredientsArr = food.ingredients
    const USER_INGREDIENTS_MAP = data_processing.getUserIngredientsWords()
    const overlap = helpers.wordSeparation(ingredientsArr, USER_INGREDIENTS_MAP)

    if (overlap > 0) {
        return true
    }

    return false
}

const checkHealthLabels = (healthLabelsArray) => {
    let result = 0
    const USER_HEALTH_MAP = data_processing.getUserHealthLabelMap()
    for (let health of healthLabelsArray) {
        if (USER_HEALTH_MAP.has(health)) {
            result++
        }
    }
    if (result === USER_HEALTH_MAP.size) {
        return true
    }
    return false
}

const checkExcludeIngredient = (excludeIngredientsArray) => {
    const USER_EXCLUDE_MAP = data_processing.getUserExcludeIngredientsMap()
    const excludeExists = helpers.wordSeparation(excludeIngredientsArray, USER_EXCLUDE_MAP)

    if (excludeExists > 0) {
        return false
    }

    return true
}

const checkNutrientsAccuracy = (nutrients) => {
    if (user.getUserProtein() === 0 && user.getUserCarbs() === 0 && user.getUserFats() === 0) {
        return true
    }

    const proteinAccuracy = nutrients.PROCNT.quantity / user.getUserProtein()
    const carbsAccuracy = nutrients.CHOCDF.quantity / user.getUserCarbs()
    const fatsAccuracy = nutrients.FAT.quantity / user.getUserFats()

    const proteinWeight = proteinAccuracy * 33
    const carbsWeight = carbsAccuracy * 33
    const fatsWeight = fatsAccuracy * 33

    const weightedAvg = (proteinWeight + carbsWeight + fatsWeight) / 100

    if (0.80 <= weightedAvg && weightedAvg <= 1.20) {
        return true
    }

    return false
}

const filterMeal = (meal, overlap) => {
    mealsNameSet.add(meal.label)
    if (mealsNameSet.size > mealsNameSetSize) {
        mealsNameSetSize++

        const nutrientsThreshold = checkNutrientsAccuracy(meal.totalNutrients)
        if (nutrientsThreshold) {

            const healthThreshold = checkHealthLabels(meal.healthLabels)
            if (healthThreshold) {

                const excludeIngredientThreshold = checkExcludeIngredient(meal.ingredients)
                if (excludeIngredientThreshold) {

                    if (user.getUserIngredients().length === 0) {
                        return true
                    }

                    if (overlap) {
                        const overlapIngredientThreshold = checkOverlap(meal)
                        if (overlapIngredientThreshold) {
                            return true
                        }
                    } else {
                        return true
                    }
                }
            }
        }
    }

    return false
}

module.exports = {
    checkExcludeIngredient,
    checkHealthLabels,
    checkNutrientsAccuracy,
    checkOverlap,
    filterMeal,
    reset
}
