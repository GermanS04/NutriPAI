
const userInputs = require('./inputs').userInputs
const filtering = require('./filtering')
const MealRank = require('./ranking')
const helper = require('./helpers')
const AVL = require('./AVL')

const getRecipesRanked = (data, hour, tree, randomness, useOverlap) => {
    for (var recipe of data) {
        const food = recipe.recipe
        if (randomness !== 100) {
            if (filtering.filterMeal(food, useOverlap)) {
                const cuisineType = food.cuisineType[0]

                const rankedMeal = new MealRank()
                rankedMeal.rankMeal(food, hour, cuisineType)
                const rank = rankedMeal.getRank()


                const node = new AVL.Node(food, rank)
                tree.root = tree.insert(tree.root, node)

            }
        } else {
            break
        }
    }
}

////////////////////////////    SCRIPT   ///////////////////////////
const script = (data, userIngredients, userTimeCook, userRandomness, userHealth, userExclusionIngredients, userProteins, userCarbs, userFats, userKcalGoal, userKcalToday, userCuisineLike, useFilter, useTree, perfomanceTesting) => {
    userInputs.setUserInputs(userIngredients, userTimeCook, userRandomness, userHealth, userExclusionIngredients, userProteins, userCarbs, userFats, userKcalGoal, userKcalToday, userCuisineLike)
    const hour = helper.getHour()
    const treeStorage = new AVL.AVL()

    var useOverlap = true

    getRecipesRanked(data, hour, treeStorage, userRandomness, useOverlap)
    filtering.reset()

    if (userRandomness !== 100) {
        const top = treeStorage.getTop(treeStorage.root)
        if (top === null) {
            useOverlap = false
            getRecipesRanked(data, hour, treeStorage, userRandomness, !useOverlap)
            const topNoOverlap = treeStorage.getTop(treeStorage.root)
            if (topNoOverlap === null) {
                return null
            } else {
                return treeStorage
            }
        } else {
            return treeStorage
        }
    } else {
        const node = new AVL.Node(helper.getRandomRecipe(data).recipe, 100)
        treeStorage.root = treeStorage.insert(treeStorage.root, node)
        return treeStorage
    }
}

module.exports = { script }
