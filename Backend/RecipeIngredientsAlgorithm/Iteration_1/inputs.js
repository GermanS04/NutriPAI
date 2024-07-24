
const data_processing = require('./data_processing').setters

var USER_INGREDIENTS
var USER_TIME_COOK
var USER_RANDOMNESS
var USER_HEALTH
var USER_EXCLUSION
var USER_PRO
var USER_CARBS
var USER_FATS

var USER_KCAL_GOAL
var USER_KCAL_TODAY

var USER_CUISINE_LIKE

//////////////////////////////////// SETTERS ////////////////////////////////////
const setUserInputs = (ingredients, timeCook, random, health, exclusionIngredients, proteins, carbs, fats, kcalGoal, kcalToday, cuisineLike) => {
    setUserIngredients(ingredients)
    setUserTimeCook(timeCook)
    setUserRandomness(random / 100)
    setUserHealthLabels(health)
    setUserExclusionIngredients(exclusionIngredients)
    setUserProtein(proteins)
    setUserCarbs(carbs)
    setUserFats(fats)
    setUserKcalGoal(kcalGoal)
    setUserKcalToday(kcalToday)
    setUserCuisineLike(cuisineLike)
}

const setUserIngredients = (ingredients) => {
    USER_INGREDIENTS = ingredients;
    data_processing.setUserIngredientsWords(ingredients)
}

const setUserTimeCook = (timeCook) => {
    USER_TIME_COOK = timeCook;
}

const setUserRandomness = (random) => {
    USER_RANDOMNESS = random / 100;
}

const setUserHealthLabels = (health) => {
    USER_HEALTH = health;
    data_processing.setUserHealthLabelMap(health)
}

const setUserExclusionIngredients = (exclusionIngredients) => {
    USER_EXCLUSION = exclusionIngredients;
    data_processing.setUserExcludeIngredientsMap(exclusionIngredients)
}

const setUserProtein = (proteins) => {
    USER_PRO = proteins;
}

const setUserCarbs = (carbs) => {
    USER_CARBS = carbs;
}

const setUserFats = (fats) => {
    USER_FATS = fats;
}

const setUserKcalGoal = (kcalGoal) => {
    USER_KCAL_GOAL = kcalGoal;
    data_processing.setUserIdealKcal(kcalGoal, USER_KCAL_TODAY)
}

const setUserKcalToday = (kcalToday) => {
    USER_KCAL_TODAY = kcalToday;
    data_processing.setUserIdealKcal(USER_KCAL_GOAL, kcalToday)
}

const setUserCuisineLike = (cuisineLike) => {
    USER_CUISINE_LIKE = cuisineLike;
}


//////////////////////////////////// GETTERS ////////////////////////////////////
const getUserInputs = () => {
    return [USER_INGREDIENTS, USER_TIME_COOK, USER_RANDOMNESS, USER_HEALTH, USER_EXCLUSION, USER_PRO, USER_CARBS, USER_FATS, USER_KCAL_GOAL, USER_KCAL_TODAY, USER_CUISINE_LIKE]
}

const getUserIngredients = () => {
    return USER_INGREDIENTS
}

const getUserTimeCook = () => {
    return USER_TIME_COOK
}

const getUserRandomness = () => {
    return USER_RANDOMNESS
}

const getUserHealthLabels = () => {
    return USER_HEALTH
}

const getUserExclusionIngredients = () => {
    return USER_EXCLUSION
}

const getUserNutrients = () => {
    return [USER_PRO, USER_CARBS, USER_FATS]
}

const getUserProtein = () => {
    return USER_PRO
}

const getUserCarbs = () => {
    return USER_CARBS
}

const getUserFats = () => {
    return USER_FATS
}

const getUserKcalGoal = () => {
    return USER_KCAL_GOAL
}

const getUserKcalToday = () => {
    return USER_KCAL_TODAY
}

const getUserCuisineLike = () => {
    return USER_CUISINE_LIKE
}

const userInputs = {
    setUserInputs,
    setUserIngredients,
    setUserTimeCook,
    setUserRandomness,
    setUserHealthLabels,
    setUserExclusionIngredients,
    setUserProtein,
    setUserCarbs,
    setUserFats,
    setUserKcalGoal,
    setUserKcalToday,
    setUserCuisineLike
}

const userOutputs = {
    getUserInputs,
    getUserIngredients,
    getUserTimeCook,
    getUserRandomness,
    getUserHealthLabels,
    getUserExclusionIngredients,
    getUserNutrients,
    getUserProtein,
    getUserCarbs,
    getUserFats,
    getUserKcalGoal,
    getUserKcalToday,
    getUserCuisineLike
}

module.exports = { userInputs, userOutputs }
