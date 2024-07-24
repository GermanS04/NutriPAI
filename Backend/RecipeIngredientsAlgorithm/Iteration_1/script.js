
const data = require('./data')
const userInputs = require('./inputs').userInputs
const userOutputs = require('./inputs').userOutputs
const data_processing = require('./data_processing').getters
const filtering = require('./filtering')
const ranking = require('./ranking').getters
const helper = require('./helpers')


///////////////////////////////   DUMMY INPUTS   ///////////////////////////////
const USER_TIME_COOK = 'fast'
const USER_HEALTH = []
const USER_RANDOMNESS = 90

const USER_INGREDIENTS = ['water']
const USER_EXCLUSION = []

const USER_PRO = 8
const USER_CARBS = 5
const USER_FATS = 3

const USER_KCAL_GOAL = 3000
const USER_KCAL_TODAY = 0

const USER_CUISINE_LIKE = [
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

////////////////////////////    SCRIPT   ///////////////////////////
userInputs.setUserInputs(USER_INGREDIENTS, USER_TIME_COOK, USER_RANDOMNESS, USER_HEALTH, USER_EXCLUSION, USER_PRO, USER_CARBS, USER_FATS, USER_KCAL_GOAL, USER_KCAL_TODAY, USER_CUISINE_LIKE)
const recommendationsArray = []
const hour = helper.getHour()

// If randomness is not max then do a ranking depending on the user data
for (var recipe of data) {
    const food = recipe.recipe
    if (filtering.filterMeal(food)) {
        const userIdealKcal = data_processing.getUserIdealKcal()
        const userIngredientsWords = data_processing.getUserIngredientsWords()
        const cuisineType = food.cuisineType[0]

        const rank = ranking.getRankMeal(food, hour, cuisineType, USER_TIME_COOK, USER_CUISINE_LIKE, userIdealKcal, userIngredientsWords)
        recommendationsArray.push([food, rank])
    }
}

recommendationsArray.sort(helper.compareFoods)

for (let recommendation of recommendationsArray) {
    console.log(recommendation)
}

console.log("recommendation size", recommendationsArray.length)
