
const user = require('./script')
const constants = require('./dataGeneratorConsts')

const getRandomWholeNumber = (min, max) => {
    const randomValue = Math.round(Math.random() * (max - min) + min);
    return randomValue
}

const getRandomIndex = (array) => {
    const arrayLength = array.length
    const index = Math.floor(Math.random() * arrayLength)
    return index
}

const getRandomString = (length) => {
    let string = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let count = 0;
    while (count < length) {
        string += characters.charAt(getRandomIndex(characters));
        count += 1;
    }
    return string;
}

const getRandomHealthLabels = () => {
    const arrayHealth = []
    const size = getRandomIndex(constants.HEALTH_LABELS)

    for (let i = 0; i < size; i++) {
        const index = getRandomIndex(constants.HEALTH_LABELS)
        arrayHealth.push(constants.HEALTH_LABELS[index])
    }

    return arrayHealth
}

const getRandomIngredients = () => {
    const arrayIngredients = []
    const size = getRandomIndex(constants.INGREDIENTS)

    for (let i = 0; i < size; i++) {
        const index = getRandomIndex(constants.INGREDIENTS)
        arrayIngredients.push(constants.INGREDIENTS[index])
    }

    return arrayIngredients
}

const getRandomIngredientsJSON = () => {
    const arrayIngredients = getRandomIngredients()
    const arrayIngredientsJSON = []
    for (let ingredient of arrayIngredients) {
        const ingredientJSON = {
            "food": ingredient
        }
        arrayIngredientsJSON.push(ingredientJSON)
    }
    return arrayIngredientsJSON
}

const getRandomCalories = () => {
    const maxCalories = user.USER_KCAL_GOAL * 0.60
    return getRandomWholeNumber(0, maxCalories)
}

const getRandomCuisine = () => {
    const index = getRandomIndex(constants.CUISINE_TYPES);

    return [constants.CUISINE_TYPES[index]]
}

const getRandomMealType = () => {
    const decision = getRandomWholeNumber(0, 1)

    if (decision === 1) {
        return ['breakfast']
    } else {
        return ['lunch/dinner']
    }
}

const getRandomFats = () => {
    const userFats = user.USER_FATS
    return getRandomWholeNumber(userFats * 0.6, userFats * 1.6)
}

const getRandomCarbs = () => {
    const userCarbs = user.USER_CARBS
    return getRandomWholeNumber(userCarbs * 0.6, userCarbs * 1.6)
}

const getRandomProtein = () => {
    const userProtein = user.USER_PRO
    return getRandomWholeNumber(userProtein * 0.6, userProtein * 1.6)
}

module.exports = {
    getRandomString,
    getRandomHealthLabels,
    getRandomIngredientsJSON,
    getRandomCalories,
    getRandomCuisine,
    getRandomMealType,
    getRandomFats,
    getRandomCarbs,
    getRandomProtein
}
