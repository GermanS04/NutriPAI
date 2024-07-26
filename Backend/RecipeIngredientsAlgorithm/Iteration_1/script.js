
const userInputs = require('./inputs').userInputs
const filtering = require('./filtering')
const MealRank = require('./ranking')
const helper = require('./helpers')
const AVL = require('./AVL')
const UserTest = require('./userTest')


///////////////////////////////   VALUES TO GENERATE RANDOM DATA   ///////////////////////////////
const USER_PRO = 10
const USER_CARBS = 5
const USER_FATS = 7

const USER_KCAL_GOAL = 3000

////////////////////////////    SCRIPT   ///////////////////////////
const script = (data, useFilter, useTree, perfomanceTesting, user = new UserTest()) => {
    userInputs.setUserInputs(user.getIngredients(), user.getTimeCook(), user.getRandomness(), user.getHealth(), user.getExclusion(), user.getPro(), user.getCarbs(), user.getFats(), user.getKcalGoal(), user.getKcalToday(), user.getCuisineLike())
    const hour = helper.getHour()
    var treeStorage
    var recommendation
    if (useTree) {
        treeStorage = new AVL.AVL()
    } else {
        recommendation = []
    }
    var filterFlag = true

    for (var recipe of data) {
        const food = recipe.recipe
        if (user.getRandomness() !== 100) {
            if (useFilter) {
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
    filtering.reset()

    if (!perfomanceTesting) {
        if (user.getRandomness() !== 100) {
            if (!useTree) {
                recommendation.sort(helper.compareFoods)
                console.log(recommendation[0])
            } else {
                const top = treeStorage.getTop(treeStorage.root)
                if (top === null) {
                    console.log("We couldn't found any recipe that satisfied your filters, try reducing the amount of filters")
                } else {
                    console.log(top)
                }
            }
        } else {
            console.log(helper.getRandomRecipe(data))
        }
    }
}

module.exports = { script, USER_CARBS, USER_FATS, USER_PRO, USER_KCAL_GOAL }
