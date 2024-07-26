
const generator = require('./dataGeneratorFunctions')

const dataRandom = []

for (let i = 0; i < 10; i++) {
    const recipe = {
        "recipe": {
            "label": generator.getRandomString(20),
            "healthLabels": generator.getRandomHealthLabels(),
            "ingredients": generator.getRandomIngredientsJSON(),
            "calories": generator.getRandomCalories(),
            "cuisineType": generator.getRandomCuisine(),
            "mealType": generator.getRandomMealType(),
            "totalNutrients": {
                "FAT": {
                    "quantity": generator.getRandomFats()
                },
                "CHOCDF": {
                    "quantity": generator.getRandomCarbs()
                },
                "PROCNT": {
                    "quantity": generator.getRandomProtein()
                }
            }
        }
    }

    dataRandom.push(recipe)
}

module.exports = dataRandom
