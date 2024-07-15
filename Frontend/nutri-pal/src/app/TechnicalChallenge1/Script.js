
import Graph from './Graph'

// Function to compare both meals ingredient lists and know how many of them overlap
// Gets the size of the both arrays and then it gets substracted by the size of a Set that contains all non repeating ingredients
const getOverlap = (ingredients1, ingredients2) => {
    return (ingredients1.length + ingredients2.length - new Set(ingredients1.concat(ingredients2)).size)
}

export const getRecommendations = (data, USER_PRO, USER_CARBS, USER_FATS) => {
    // Creates graph and a map to store the proteins, carbs, fats of meals
    const graph = new Graph()
    const nutrientsMap = new Map()

    // Add food into the graph and set the nutrients map
    for (let food of data) {
        graph.addNode(food.name)
        nutrientsMap.set(food.name, [food.protein, food.carbs, food.fats])
    }

    // Add edges on the graph based on the quantity of ingredients that overlap between two meals
    for (let meal1 of data) {
        for (let meal2 of data) {
            if (meal1.name !== meal2.name) {
                graph.addEdge(meal1.name, meal2.name, getOverlap(meal1.ingredients, meal2.ingredients))
            }
        }
    }

    // Get the recommended meal plan from the graph
    const bestPlan = graph.getRecommendations(nutrientsMap, USER_PRO, USER_CARBS, USER_FATS);

    const objectBestPlan = []

    for (let food of data) {
        if (bestPlan.includes(food.name)) {
            objectBestPlan.push(food)
        }
    }

    return objectBestPlan
}

export const getIngredients = (meals) => {
    const ingredientsSet = new Set()

    // Get all the ingredients needed to make the three meals
    for (let food of meals) {
        for (let ingr of food.ingredients) {
            ingredientsSet.add(ingr)
        }
    }

    return Array.from(ingredientsSet)
}
