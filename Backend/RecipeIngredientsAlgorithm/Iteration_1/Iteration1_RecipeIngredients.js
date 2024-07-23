
const data = require('./data')

// Dummy data of cuisine scores (got an API call to get this data)
const cuisineType = [
    { "american": 0.64 },
    { "asian": 0.75 },
    { "british": 0.32 },
    { "caribbean": 0.45 },
    { "central europe": 0.21 },
    { "chinese": 0.68 },
    { "eastern europe": 0.39 },
    { "french": 0.51 },
    { "indian": 0.62 },
    { "italian": 0.58 },
    { "japanese": 0.71 },
    { "korean": 0.75 },
    { "kosher": 0.69 },
    { "mediterranean": 0.48 },
    { "mexican": 0.55 },
    { "middle eastern": 0.42 },
    { "nordic": 0.35 },
    { "south american": 0.49 },
    { "south east asian": 0.63 },
]

// Constants of user inputs
const USER_INGREDIENTS = ["potato", "butter", "cheese"]
const USER_TIME_COOK = 'fast'
const USER_RANDOMNESS = 0 / 100


// Constants of user data
const USER_KCAL_GOAL = 2500
const USER_KCAL_TODAY = 1000

// Constants of points distribution
const OVERLAP_POINTS = 10 * (1 - USER_RANDOMNESS)
const MEAL_TYPE_POINTS = 3
const TIME_COOK_POINTS = 8
const RANDOM_POINTS = 10
const KCAL_POINTS = 8

const TOP_1_2_CUISINE_POINTS = 3
const TOP_3_4_CUISINE_POINTS = 2
const TOP_5_CUISINE_POINTS = 1

const maxRandomPoints = RANDOM_POINTS * USER_RANDOMNESS


// Helper function to sort the foods by score
// food = [mealObject, score]
const compareFoods = (a, b) => {
    return b[1] - a[1]
}

// Helper function to sort cuisine by score
// {"cuisine": score}
const compareCuisine = (a, b) => {
    return b[Object.keys(b)[0]] - a[Object.keys(a)[0]]
}

// Function to generate a random number between a minimum and a maximum,
// the random number is rounded to two decimal points
function getRandomNumber(min, max) {
    const randomValue = Math.random() * (max - min) + min;
    const roundTwoDecimalsRandom = Math.round(randomValue * 100) / 100
    return roundTwoDecimalsRandom
}

// Function to get the ideal calories for the user depending on the time
// and the kcal goal that the user has, the percentages were decided by
// looking up on the internet how to distribute the calories between meals
// Breakfast = 30%        Lunch = 40%        Dinner = 40%
// If the user skipped or had a really light breakfast then lunch gets an increase to 55%
const getIdealKcal = (hour) => {
    if (5 <= hour && hour < 12) {
        return USER_KCAL_GOAL * 0.30
    } else if (12 <= hour && hour < 6) {
        if (USER_KCAL_TODAY < USER_KCAL_GOAL * 0.15) {
            return USER_KCAL_GOAL * 0.55
        } else {
            return (USER_KCAL_GOAL - USER_KCAL_TODAY) * 0.40
        }
    } else if (6 <= hour && hour <= 23) {
        return USER_KCAL_GOAL - USER_KCAL_TODAY
    }

    return 0
}

// Function to get overlapping elements between two arrays, by dividing the ingredient by words and then storing them
// into arrays to then combine them and put it in a set to get the non repeating ones.
// so that in the set are only distinct values and if this value is less than the two arrays combined it means
// there are words that match, so we count it as overlap of ingredient
const getOverlapIngredientsPoints = (foodIngredients, userIngredients) => {
    let ingrU = []
    let ingrF = []

    for (let ingredientUser of userIngredients) {
        const wordSeparateSpaces = ingredientUser.split(" ")
        ingrU = ingrU.concat(wordSeparateSpaces)
    }

    for (let ingredientFood of foodIngredients) {
        const wordSeparateSpaces = ingredientFood.food.split(" ")
        ingrF = ingrF.concat(wordSeparateSpaces)
    }

    const allIngredientWords = ingrU.concat(ingrF)
    const nonDuplicates = new Set(allIngredientWords)
    const overlapNumber = allIngredientWords.length - nonDuplicates.size

    const similarPercent = overlapNumber / userIngredients.length
    return (OVERLAP_POINTS * similarPercent)
}

// Function to get the points of the user based on the hour and the type of meal
const getHourMealTypePoints = (food, hour) => {
    if (5 <= hour && hour < 12) {
        if (food.mealType === 'breakfast') {
            return MEAL_TYPE_POINTS
        }
    } else if (12 <= hour && hour < 6) {
        if (food.mealType === 'lunch' || food.mealType === 'lunch/dinner') {
            return MEAL_TYPE_POINTS
        }
    } else if (6 <= hour && hour <= 23) {
        if (food.mealType === 'dinner' || food.mealType === 'lunch/dinner') {
            return MEAL_TYPE_POINTS
        }
    }

    return 0
}

// Function to see if the cooking time of a meal satisfies the user input
const getTimeCookPoints = (food, USER_TIME_COOK) => {
    if (USER_TIME_COOK === 'fast' && food.totalTime <= 25) {
        return TIME_COOK_POINTS
    } else if (USER_TIME_COOK === 'normal' && (25 < food.totalTime && food.totalTime <= 60)) {
        return TIME_COOK_POINTS
    } else if (USER_TIME_COOK === 'long' && (60 < food.totalTime)) {
        return TIME_COOK_POINTS
    }

    return 0
}

// Function to check if a meal satisfy in a range of 10% the ideal calories for a meal
const getIdealKcalPoints = (food, idealKcal) => {
    if ((idealKcal * 0.9) < food.calories && food.calories < (idealKcal * 1.1)) {
        return KCAL_POINTS
    }

    return 0
}



// Function to get the total score of the meal
const getRankMeal = (food, cuisine, hour, idealKcal, USER_TIME_COOK, USER_INGREDIENTS) => {
    let rank = cuisine

    rank += getOverlapIngredientsPoints(food.ingredients, USER_INGREDIENTS);
    rank += getHourMealTypePoints(food, hour)
    rank += getTimeCookPoints(food, USER_TIME_COOK)
    rank += getIdealKcalPoints(food, idealKcal)

    return rank
}

cuisineType.sort(compareCuisine)
const cuisineRanking = new Map()

// Giving points to cuisines depending on the order the user has liked them
for (let i = 0; i < cuisineType.length; i++) {
    const name = Object.keys(cuisineType[i])[0]
    let value = cuisineType[i][name]
    if (i <= 1) {
        value += TOP_1_2_CUISINE_POINTS
    } else if (i === 2 || i === 3) {
        value += TOP_3_4_CUISINE_POINTS
    } else if (i == 4) {
        value += TOP_5_CUISINE_POINTS
    }

    cuisineRanking.set(name, value)
}

console.log('cuisine', cuisineRanking)

// Getting the hour in a 24 hour format
const date = new Date()
const hour = Number(date.toLocaleTimeString("en-GB").slice(0, 2));
const idealKcal = getIdealKcal(hour)

const recommendationsArray = []

// If randomness is not max then do a ranking depending on the user data
if (0 <= USER_RANDOMNESS && USER_RANDOMNESS <= 0.99) {
    for (var recipe of data) {
        const food = recipe.recipe
        if (cuisineRanking.has(food.cuisineType[0])) {
            recommendationsArray.push([food, getRankMeal(food, cuisineRanking.get(food.cuisineType[0]), hour, idealKcal, USER_TIME_COOK, USER_INGREDIENTS)])
        }
    }

    if (USER_RANDOMNESS !== 0) {
        for (var recommendation of recommendationsArray) {
            recommendation[1] += getRandomNumber(0, maxRandomPoints)
        }
    }

} else {
    // If randomness is max then ignore all user data and just give random ranking
    for (var food of data) {
        recommendationsArray.push([food.recipe, getRandomNumber(0, maxRandomPoints)])
    }
}

recommendationsArray.sort(compareFoods)

for (let recommendation of recommendationsArray) {
    console.log(recommendation)
}
