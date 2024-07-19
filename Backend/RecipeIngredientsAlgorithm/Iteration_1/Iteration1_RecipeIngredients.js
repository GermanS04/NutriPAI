const data = [
    {
        "name": "Pizza",
        "ingredients": ["flour", "yeast", "water", "salt", "olive oil", "tomato sauce", "mozzarella cheese", "pepperoni"],
        "protein": 25,
        "carbs": 40,
        "fats": 20,
        "cuisine": ["italian"],
        "mealType": "lunch",
        "totalTime": 25.0
    },
    {
        "name": "Burger",
        "ingredients": ["beef patty", "bun", "lettuce", "tomato", "cheese", "ketchup", "mustard", "pickles"],
        "protein": 30,
        "carbs": 35,
        "fats": 25,
        "cuisine": ["american"],
        "mealType": "dinner",
        "totalTime": 15.0
    },
    {
        "name": "Tacos",
        "ingredients": ["tortilla", "ground beef", "shredded lettuce", "diced tomatoes", "shredded cheese", "salsa", "avocado"],
        "protein": 20,
        "carbs": 30,
        "fats": 15,
        "cuisine": ["mexican"],
        "mealType": "dinner",
        "totalTime": 10.0
    },
    {
        "name": "Salad",
        "ingredients": ["mixed greens", "cherry tomatoes", "cucumber", "carrots", "red onion", "croutons", "ranch dressing"],
        "protein": 10,
        "carbs": 20,
        "fats": 10,
        "cuisine": ["american"],
        "mealType": "lunch",
        "totalTime": 5.0
    },
    {
        "name": "Sandwich",
        "ingredients": ["bread", "turkey breast", "bacon", "lettuce", "tomato", "mayonnaise", "swiss cheese"],
        "protein": 35,
        "carbs": 30,
        "fats": 20,
        "cuisine": ["american"],
        "mealType": "lunch",
        "totalTime": 10.0
    },
    {
        "name": "Sushi",
        "ingredients": ["rice", "seaweed", "salmon", "cucumber", "avocado", "wasabi", "soy sauce"],
        "protein": 25,
        "carbs": 30,
        "fats": 15,
        "cuisine": ["japanese"],
        "mealType": "dinner",
        "totalTime": 20.0
    },
    {
        "name": "Fried Rice",
        "ingredients": ["cooked rice", "scrambled eggs", "chopped vegetables", "soy sauce", "sesame oil", "green onions"],
        "protein": 20,
        "carbs": 40,
        "fats": 20,
        "cuisine": ["chinese"],
        "mealType": "dinner",
        "totalTime": 15.0
    },
    {
        "name": "Curry",
        "ingredients": ["chicken breast", "curry powder", "coconut milk", "onion", "garlic", "ginger", "basil"],
        "protein": 30,
        "carbs": 30,
        "fats": 20,
        "cuisine": ["indian"],
        "mealType": "dinner",
        "totalTime": 20.0
    },
    {
        "name": "Pasta",
        "ingredients": ["spaghetti", "marinara sauce", "parmesan cheese", "meatballs", "basil"],
        "protein": 25,
        "carbs": 40,
        "fats": 20,
        "cuisine": ["italian"],
        "mealType": "dinner",
        "totalTime": 25.0
    },
    {
        "name": "Stir Fry",
        "ingredients": ["vegetables", "soy sauce", "oil", "garlic", "ginger", "chicken breast"],
        "protein": 20,
        "carbs": 30,
        "fats": 15,
        "cuisine": ["chinese"],
        "mealType": "dinner",
        "totalTime": 10.0
    },
    {
        "name": "Soup",
        "ingredients": ["chicken broth", "vegetables", "noodles", "carrots", "celery", "onion"],
        "protein": 15,
        "carbs": 30,
        "fats": 10,
        "cuisine": ["american"],
        "mealType": "lunch",
        "totalTime": 20.0
    },
    {
        "name": "Grilled Cheese",
        "ingredients": ["bread", "cheese", "butter", "tomato"],
        "protein": 15,
        "carbs": 35,
        "fats": 20,
        "cuisine": ["american"],
        "mealType": "lunch",
        "totalTime": 5.0
    },
    {
        "name": "Fajitas",
        "ingredients": ["tortilla", "beef strips", "peppers", "onion", "salsa", "guacamole"],
        "protein": 25,
        "carbs": 30,
        "fats": 20,
        "cuisine": ["mexican"],
        "mealType": "dinner",
        "totalTime": 15.0
    },
    {
        "name": "Chicken Tenders",
        "ingredients": ["chicken breast", "flour", "eggs", "breadcrumbs", "oil"],
        "protein": 30,
        "carbs": 20,
        "fats": 15,
        "cuisine": ["american"],
        "mealType": "dinner",
        "totalTime": 10.0
    },
    {
        "name": "Baked Potato",
        "ingredients": ["potato", "butter", "cheese", "sour cream", "chives"],
        "protein": 5,
        "carbs": 40,
        "fats": 20,
        "cuisine": ["american"],
        "mealType": "lunch",
        "totalTime": 45.0
    }
]

const overlapIngredients = (foodIngredients, userIngredients) => {
    const numberOverlapping = foodIngredients.length + userIngredients.length - new Set(foodIngredients.concat(userIngredients)).size
    const similarPercent = numberOverlapping / userIngredients.length
    return (10 * similarPercent)
}

const compareFoods = (a, b) => {
    return b[1] - a[1]
}

const compareCuisine = (a, b) => {
    return b[Object.keys(b)[0]] - a[Object.keys(a)[0]]
}

cuisineType = [
    { "american": 0.64 },
    { "asian": 0.75 },
    { "british": 0.32 },
    { "caribbean": 0.45 },
    { "central europe": 0.21 },
    { "chinese": 0.68 },
    { "eastern europe": 0.39 },
    { "french": 0.51 },
    { "india": 0.62 },
    { "italian": 0.58 },
    { "japanese": 0.71 },
    { "kosher": 0.69 },
    { "mediterranean": 0.48 },
    { "mexican": 0.55 },
    { "middle eastern": 0.42 },
    { "nordic": 0.35 },
    { "south american": 0.49 },
    { "south east asian": 0.63 }
]


cuisineType.sort(compareCuisine)

const cuisineRanking = new Map()

for (let i = 0; i < cuisineType.length; i++) {
    const name = Object.keys(cuisineType[i])[0]
    let value = cuisineType[i][name]
    if (i <= 1) {
        value += 3
    } else if (i === 2 || i === 3) {
        value += 2
    } else if (i == 4) {
        value += 1
    }

    cuisineRanking.set(name, value)
}

console.log('cuisine', cuisineRanking)

const recommendationsArray = []

const getRankMeal = (food, overlap, cuisine, hour, userTimeCook) => {
    var rank = overlap + cuisine

    if (5 <= hour && hour < 12) {
        if (food.mealType === 'breakfast') {
            rank += 3
        }
    } else if (12 <= hour && hour < 6) {
        if (food.mealType === 'lunch' || food.mealType === 'lunch/dinner') {
            rank += 3
        }
    } else if (6 <= hour && hour <= 23) {
        if (food.mealType === 'dinner' || food.mealType === 'lunch/dinner') {
            rank += 3
        }
    }

    if (userTimeCook === 'fast' && food.totalTime <= 25) {
        rank += 8
    } else if (userTimeCook === 'normal' && (25 < food.totalTime && food.totalTime <= 60)) {
        rank += 8
    } else if (userTimeCook === 'long' && (60 < food.totalTime)) {
        rank += 8
    }

    return rank
}

const date = new Date()
const hour = Number(date.toLocaleTimeString("en-GB").slice(0, 2));

userIngredients = ["potato", "butter", "cheese", "sour cream", "chives"]
const userTimeCook = 'fast'


for (var food of data) {
    if (cuisineRanking.has(food.cuisine[0])) {
        recommendationsArray.push([food, getRankMeal(food, overlapIngredients(food.ingredients, userIngredients), cuisineRanking.get(food.cuisine[0]), hour, userTimeCook)])
    }
}

recommendationsArray.sort(compareFoods)

console.log('recommendation', recommendationsArray)
