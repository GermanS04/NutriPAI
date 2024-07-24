
// Helper function to sort the foods by score where food = [mealObject, score]
const compareFoods = (a, b) => {
    return b[1] - a[1]
}

// Helper function to sort cuisine by score where {"cuisine": score}
const compareCuisine = (a, b) => {
    return b[Object.keys(b)[0]] - a[Object.keys(a)[0]]
}

// Helper function to generate a random number between a minimum and a maximum, the random number is rounded to two decimal points
const getRandomNumber = (min, max) => {
    const randomValue = Math.random() * (max - min) + min;
    const roundTwoDecimalsRandom = Math.round(randomValue * 100) / 100
    return roundTwoDecimalsRandom
}

// Helper function to check if any of the words in a list of ingredients is in a map of the words of ingredients the user gave us
const wordSeparation = (ingredientsArray, map) => {
    var wordSeparateSpaces = []
    let count = 0
    for (let ingredient of ingredientsArray) {
        wordSeparateSpaces = wordSeparateSpaces.concat(ingredient.food.split(" "))
    }
    for (let word of wordSeparateSpaces) {
        if (map.has(word)) {
            count++
        }
    }
    return count
}

// Getting the hour in a 24 hour format
const getHour = () => {
    const date = new Date()
    const hour = Number(date.toLocaleTimeString("en-GB").slice(0, 2));
    return hour
}

module.exports = {
    compareFoods,
    compareCuisine,
    getRandomNumber,
    wordSeparation,
    getHour
}
