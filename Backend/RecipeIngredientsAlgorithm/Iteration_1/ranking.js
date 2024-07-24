
const helper = require('./helpers')

///////////////////////////////////   POINTS RULES   //////////////////////////////////////////////
const OVERLAP_POINTS = 10
const MEAL_TYPE_POINTS = 3
const TIME_COOK_POINTS = 8
const KCAL_POINTS = 8

const TOP_1_2_CUISINE_POINTS = 3
const TOP_3_4_CUISINE_POINTS = 2
const TOP_5_CUISINE_POINTS = 1
const RANDOM_POINTS = 10
var maxRandomPoints = 0
var userRandomness = 0

//////////////////////////////////   POINTS    /////////////////////////////////////
var overlapPoints = 0
var mealTypePoints = 0
var timeCookPoints = 0
var idealKcalPoints = 0
var cuisinePoints = new Map()

//////////////////////////////// GETTING POINTS FUNCTIONS ////////////////////////////////

// Function to get overlapping elements between two arrays, by dividing the ingredient by words and then storing them into arrays to then combine them and put it in a set to get the non repeating ones.
// so that in the set are only distinct values and if this value is less than the two arrays combined it means there are words that match, so we count it as overlap of ingredient
const setOverlapIngredientsPoints = (food, userIngredientsMap) => {
    const foodIngredients = food.ingredients
    const overlap = helper.wordSeparation(foodIngredients, userIngredientsMap)
    const similarPercent = overlap / userIngredientsMap.size
    overlapPoints = OVERLAP_POINTS * (1 - userRandomness) * similarPercent
}

const getOverlapIngredientsPoints = () => {
    return overlapPoints
}

// Function to get the points of the user based on the hour and the type of meal
const setHourMealTypePoints = (food, hour) => {
    if (5 <= hour && hour < 12) {
        if (food.mealType === 'breakfast') {
            mealTypePoints = MEAL_TYPE_POINTS
        }
    } else if (12 <= hour && hour < 6) {
        if (food.mealType === 'lunch' || food.mealType === 'lunch/dinner') {
            mealTypePoints = MEAL_TYPE_POINTS
        }
    } else if (6 <= hour && hour <= 23) {
        if (food.mealType === 'dinner' || food.mealType === 'lunch/dinner') {
            mealTypePoints = MEAL_TYPE_POINTS
        }
    }
}

const getHourMealTypePoints = () => {
    return mealTypePoints
}

// Function to see if the cooking time of a meal satisfies the user input
const setTimeCookPoints = (food, userTimeCook) => {
    if (userTimeCook === 'fast' && food.totalTime <= 25) {
        timeCookPoints = TIME_COOK_POINTS
    } else if (userTimeCook === 'normal' && (25 < food.totalTime && food.totalTime <= 60)) {
        timeCookPoints = TIME_COOK_POINTS
    } else if (userTimeCook === 'long' && (60 < food.totalTime)) {
        timeCookPoints = TIME_COOK_POINTS
    }
}

const getTimeCookPoints = () => {
    return timeCookPoints
}

// Function to check if a meal satisfy in a range of 10% the ideal calories for a meal
const setIdealKcalPoints = (food, idealKcal) => {
    if ((idealKcal * 0.9) < food.calories && food.calories < (idealKcal * 1.1)) {
        idealKcalPoints = KCAL_POINTS
    }
}

const getIdealKcalPoints = () => {
    return idealKcalPoints
}

const setCuisinePoints = (cuisineLikes) => {
    cuisineLikes.sort(helper.compareCuisine)

    // Giving points to cuisines depending on the order the user has liked them
    for (let i = 0; i < cuisineLikes.length; i++) {
        const name = Object.keys(cuisineLikes[i])[0]
        let value = cuisineLikes[i][name]
        if (i <= 1) {
            value += TOP_1_2_CUISINE_POINTS
        } else if (i === 2 || i === 3) {
            value += TOP_3_4_CUISINE_POINTS
        } else if (i == 4) {
            value += TOP_5_CUISINE_POINTS
        }

        cuisinePoints.set(name, value)
    }
}

const getCuisinePoints = (cuisine) => {
    return cuisinePoints.get(cuisine)
}

const setMaxRandom = (USER_RANDOMNESS) => {
    userRandomness = USER_RANDOMNESS
    maxRandomPoints = RANDOM_POINTS * USER_RANDOMNESS
}

const getMaxRandom = () => {
    return maxRandomPoints
}

// Function to get the total score of the meal
const getRankMeal = (food, hour, cuisine, userTimeCook, userCuisineLikeMap, userIdealKcal, userIngredientsMap) => {
    let rank = 0

    setCuisinePoints(userCuisineLikeMap)
    setOverlapIngredientsPoints(food, userIngredientsMap)
    setHourMealTypePoints(food, hour)
    setTimeCookPoints(food, userTimeCook)
    setIdealKcalPoints(food, userIdealKcal)

    rank += getCuisinePoints(cuisine)
    rank += getOverlapIngredientsPoints()
    rank += getHourMealTypePoints()
    rank += getTimeCookPoints()
    rank += getIdealKcalPoints()

    return rank
}

const setters = {
    setCuisinePoints,
    setHourMealTypePoints,
    setIdealKcalPoints,
    setMaxRandom,
    setOverlapIngredientsPoints,
    setTimeCookPoints
}

const getters = {
    getCuisinePoints,
    getHourMealTypePoints,
    getIdealKcalPoints,
    getMaxRandom,
    getOverlapIngredientsPoints,
    getTimeCookPoints,
    getRankMeal
}

module.exports = {
    setters,
    getters
}
