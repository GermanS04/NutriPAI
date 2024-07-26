
const helper = require('./helpers')

const USER_INGREDIENTS_MAP = new Map()
const USER_HEALTH_MAP = new Map()
const USER_EXCLUDE_MAP = new Map()
var idealKcal = 0

/////////////////////////// USER INGREDIENTS //////////////////////////
const setUserIngredientsWords = (userIngredientsArr) => {
    USER_INGREDIENTS_MAP.clear()
    for (let ingredient of userIngredientsArr) {
        const wordSeparateSpaces = ingredient.split(" ")
        for (let word of wordSeparateSpaces) {
            USER_INGREDIENTS_MAP.set(word, true)
        }
    }
}

const getUserIngredientsWords = () => {
    return USER_INGREDIENTS_MAP
}

/////////////////////////// USER HEALTH LABELS //////////////////////////
const setUserHealthLabelMap = (userHealthLabelArr) => {
    USER_HEALTH_MAP.clear()
    for (let health of userHealthLabelArr) {
        USER_HEALTH_MAP.set(health, true)
    }
}

const getUserHealthLabelMap = () => {
    return USER_HEALTH_MAP
}

/////////////////////////// USER EXCLUDED INGREDIENTS //////////////////////////
const setUserExcludeIngredientsMap = (userExclusionArr) => {
    USER_EXCLUDE_MAP.clear()
    for (let exclude of userExclusionArr) {
        USER_EXCLUDE_MAP.set(exclude, true)
    }
}

const getUserExcludeIngredientsMap = () => {
    return USER_EXCLUDE_MAP
}


// Function to get the ideal calories for the user depending on the time and the kcal goal that the user has, the percentages were decided by looking up on the internet how to distribute the calories between meals.
// Breakfast = 30%        Lunch = 40%        Dinner = 40%
// If the user skipped or had a really light breakfast then lunch gets an increase to 55%
const setUserIdealKcal = (kcalGoal, kcalToday) => {
    let hour = helper.getHour()
    if (5 <= hour && hour < 12) {
        idealKcal = kcalGoal * 0.30

    } else if (12 <= hour && hour < 6) {
        if (kcalToday < kcalGoal * 0.15) {
            idealKcal = kcalGoal * 0.55

        } else {
            idealKcal = (kcalGoal - kcalToday) * 0.40
        }

    } else if (6 <= hour && hour <= 23) {
        idealKcal = kcalGoal - kcalToday
    }
}

const getUserIdealKcal = () => {
    return idealKcal
}

const setters = {
    setUserIngredientsWords,
    setUserHealthLabelMap,
    setUserExcludeIngredientsMap,
    setUserIdealKcal
}

const getters = {
    getUserIngredientsWords,
    getUserHealthLabelMap,
    getUserExcludeIngredientsMap,
    getUserIdealKcal
}

module.exports = {
    setters,
    getters
}
