
const helper = require('./helpers')
const user = require('./inputs').userOutputs
const data_processing = require('./data_processing').getters

///////////////////////////////////   POINTS RULES   //////////////////////////////////////////////
const OVERLAP_POINTS = 10
const MEAL_TYPE_POINTS = 3
const TIME_COOK_POINTS = 8
const KCAL_POINTS = 8

const TOP_1_2_CUISINE_POINTS = 3
const TOP_3_4_CUISINE_POINTS = 2
const TOP_5_CUISINE_POINTS = 1
const RANDOM_POINTS = 10

class MealRanked {
    constructor() {
        this.food = {}
        this.overlapPoints = 0
        this.mealTypePoints = 0
        this.timeCookPoints = 0
        this.idealKcalPoints = 0
        this.rank = 0
        this.cuisinePoints = new Map()
        this.userRandomness = user.getUserRandomness()
        this.maxRandomPoints = RANDOM_POINTS * user.getUserRandomness()
    }

    setFood = (food) => {
        this.food = food
    }

    getFood = () => {
        return this.food
    }

    // Function to get overlapping elements between two arrays, by dividing the ingredient by words and then storing them into arrays to then combine them and put it in a set to get the non repeating ones.
    // so that in the set are only distinct values and if this value is less than the two arrays combined it means there are words that match, so we count it as overlap of ingredient
    setOverlapIngredientsPoints = (food) => {
        const userIngredientsMap = data_processing.getUserIngredientsWords()
        const foodIngredients = food.ingredients
        const overlap = helper.wordSeparation(foodIngredients, userIngredientsMap)
        const similarPercent = overlap / userIngredientsMap.size
        this.overlapPoints = OVERLAP_POINTS * (1 - this.userRandomness) * similarPercent
    }

    getOverlapIngredientsPoints = () => {
        return this.overlapPoints
    }

    // Function to get the points of the user based on the hour and the type of meal
    setHourMealTypePoints = (food, hour) => {
        if (5 <= hour && hour < 12) {
            if (food.mealType === 'breakfast') {
                this.mealTypePoints = MEAL_TYPE_POINTS
            }
        } else if (12 <= hour && hour < 6) {
            if (food.mealType === 'lunch' || food.mealType === 'lunch/dinner') {
                this.mealTypePoints = MEAL_TYPE_POINTS
            }
        } else if (6 <= hour && hour <= 23) {
            if (food.mealType === 'dinner' || food.mealType === 'lunch/dinner') {
                this.mealTypePoints = MEAL_TYPE_POINTS
            }
        }
    }

    getHourMealTypePoints = () => {
        return this.mealTypePoints
    }

    // Function to see if the cooking time of a meal satisfies the user input
    setTimeCookPoints = (food) => {
        const userTimeCook = user.getUserTimeCook()
        if (userTimeCook === 'fast' && food.totalTime <= 25) {
            this.timeCookPoints = TIME_COOK_POINTS
        } else if (userTimeCook === 'normal' && (25 < food.totalTime && food.totalTime <= 60)) {
            this.timeCookPoints = TIME_COOK_POINTS
        } else if (userTimeCook === 'long' && (60 < food.totalTime)) {
            this.timeCookPoints = TIME_COOK_POINTS
        }
    }

    getTimeCookPoints = () => {
        return this.timeCookPoints
    }

    // Function to check if a meal satisfy in a range of 10% the ideal calories for a meal
    setIdealKcalPoints = (food) => {
        const idealKcal = data_processing.getUserIdealKcal()
        if ((idealKcal * 0.9) < food.calories && food.calories < (idealKcal * 1.1)) {
            this.idealKcalPoints = KCAL_POINTS
        }
    }

    getIdealKcalPoints = () => {
        return this.idealKcalPoints
    }

    setCuisinePoints = () => {
        const cuisineLikes = user.getUserCuisineLike()
        cuisineLikes.sort(helper.compareCuisine)

        // Giving points to cuisines depending on the order the user has liked them
        for (let i = 0; i < cuisineLikes.length; i++) {
            const name = Object.keys(cuisineLikes[i])[0]
            let value = cuisineLikes[i][name]
            if (i <= 1) {
                value += TOP_1_2_CUISINE_POINTS
            } else if (i === 2 || i === 3) {
                value += TOP_3_4_CUISINE_POINTS
            } else if (i == 4) {
                value += TOP_5_CUISINE_POINTS
            }

            this.cuisinePoints.set(name, value)
        }
    }

    getCuisinePoints = (cuisine) => {
        return this.cuisinePoints.get(cuisine)
    }

    setMaxRandom = (USER_RANDOMNESS) => {
        this.userRandomness = USER_RANDOMNESS
        this.maxRandomPoints = RANDOM_POINTS * USER_RANDOMNESS
    }

    getMaxRandom = () => {
        return this.maxRandomPoints
    }

    // Function to get the total score of the meal
    rankMeal = (food, hour, cuisine) => {
        this.setCuisinePoints()
        this.setOverlapIngredientsPoints(food)
        this.setHourMealTypePoints(food, hour)
        this.setTimeCookPoints(food)
        this.setIdealKcalPoints(food)

        this.rank += this.getCuisinePoints(cuisine)
        this.rank += this.getOverlapIngredientsPoints()
        this.rank += this.getHourMealTypePoints()
        this.rank += this.getTimeCookPoints()
        this.rank += this.getIdealKcalPoints()
    }

    getRank = () => {
        return this.rank
    }


}


module.exports = MealRanked
