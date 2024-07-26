
const data = require('./data')
const userInputs = require('./inputs').userInputs
const filtering = require('./filtering')
const MealRank = require('./ranking')
const helper = require('./helpers')
const AVL = require('./AVL')


///////////////////////////////   DUMMY INPUTS   ///////////////////////////////
const USER_TIME_COOK = 'fast'
const USER_HEALTH = []
const USER_RANDOMNESS = 1

const USER_INGREDIENTS = ['water']
const USER_EXCLUSION = []

const USER_PRO = 10
const USER_CARBS = 5
const USER_FATS = 7

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
const script = (useFilter, useTree) => {
    userInputs.setUserInputs(USER_INGREDIENTS, USER_TIME_COOK, USER_RANDOMNESS, USER_HEALTH, USER_EXCLUSION, USER_PRO, USER_CARBS, USER_FATS, USER_KCAL_GOAL, USER_KCAL_TODAY, USER_CUISINE_LIKE)
    const hour = helper.getHour()
    var treeStorage
    var recommendation
    if (useTree) {
        treeStorage = new AVL.AVL()
    } else {
        recommendation = []
    }
    var filterFlag
    if (useFilter) {
        filterFlag = true
    }

    for (var recipe of data) {
        const food = recipe.recipe
        if (USER_RANDOMNESS !== 100) {
            if (!useFilter) {
                filterFlag = filtering.filterMeal(food)
            }
            if (filterFlag) {
                const cuisineType = food.cuisineType[0]

                const rankedMeal = new MealRank()
                rankedMeal.rankMeal(food, hour, cuisineType)
                const rank = rankedMeal.getRank()

                if (useTree) {
                    const node = new AVL.Node(food, rank)
                    treeStorage.root = treeStorage.insert(treeStorage.root, node)
                } else {
                    recommendation.push([food, rank])
                }
            }
        } else {
            break
        }
    }

    if (!useTree) {
        recommendation.sort(helper.compareFoods)
    }

    /*
    if (USER_RANDOMNESS !== 100) {
        console.log(treeStorage.getTop(treeStorage.root))
        if (treeStorage.getSize() > 1) {
            treeStorage.deleteTop(treeStorage.root)
            console.log(treeStorage.getTop(treeStorage.root))
        }
    } else {
        console.log(helper.getRandomRecipe(data))
    }*/
}

module.exports = { script, USER_CARBS, USER_FATS, USER_PRO, USER_KCAL_GOAL }
