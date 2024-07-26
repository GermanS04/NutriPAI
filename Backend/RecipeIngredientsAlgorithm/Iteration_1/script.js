
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

const getRecipesRanked = (data, hour, tree, recommendation, randomness, useFilter, filterFlag, useTree, useOverlap) => {
    for (var recipe of data) {
        const food = recipe.recipe
        if (randomness !== 100) {
            if (useFilter) {
                filterFlag = filtering.filterMeal(food, useOverlap)
            }
            if (filterFlag) {
                const cuisineType = food.cuisineType[0]

                const rankedMeal = new MealRank()
                rankedMeal.rankMeal(food, hour, cuisineType)
                const rank = rankedMeal.getRank()

                if (useTree) {
                    const node = new AVL.Node(food, rank)
                    tree.root = tree.insert(tree.root, node)
                } else {
                    recommendation.push([food, rank])
                }
            }
        } else {
            break
        }
    }
}

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
    var useOverlap = true

    getRecipesRanked(data, hour, treeStorage, recommendation, user.getRandomness(), useFilter, filterFlag, useTree, useOverlap)
    filtering.reset()

    if (!perfomanceTesting) {
        if (user.getRandomness() !== 100) {
            if (!useTree) {
                recommendation.sort(helper.compareFoods)
                console.log(recommendation[0])
            } else {
                const top = treeStorage.getTop(treeStorage.root)
                if (top === null) {
                    useOverlap = false
                    getRecipesRanked(data, hour, treeStorage, recommendation, user.getRandomness(), useFilter, filterFlag, useTree, useOverlap)
                    const topNoOverlap = treeStorage.getTop(treeStorage.root)
                    if (topNoOverlap === null) {
                        console.log("We couldn't find any recipes, try changing the filters")
                    } else {
                        console.log(topNoOverlap)
                    }
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
