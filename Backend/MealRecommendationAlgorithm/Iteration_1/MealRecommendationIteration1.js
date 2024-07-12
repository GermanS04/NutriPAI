const data = [
    {
        "name": "Pizza",
        "ingredients": ["flour", "yeast", "water", "salt", "olive oil", "tomato sauce", "mozzarella cheese", "pepperoni"]
    },
    {
        "name": "Burger",
        "ingredients": ["beef patty", "bun", "lettuce", "tomato", "cheese", "ketchup", "mustard", "pickles"]
    },
    {
        "name": "Tacos",
        "ingredients": ["tortilla", "ground beef", "shredded lettuce", "diced tomatoes", "shredded cheese", "salsa", "avocado"]
    },
    {
        "name": "Salad",
        "ingredients": ["mixed greens", "cherry tomatoes", "cucumber", "carrots", "red onion", "croutons", "ranch dressing"]
    },
    {
        "name": "Sandwich",
        "ingredients": ["bread", "turkey breast", "bacon", "lettuce", "tomato", "mayonnaise", "swiss cheese"]
    },
    {
        "name": "Sushi",
        "ingredients": ["rice", "seaweed", "salmon", "cucumber", "avocado", "wasabi", "soy sauce"]
    },
    {
        "name": "Fried Rice",
        "ingredients": ["cooked rice", "scrambled eggs", "chopped vegetables", "soy sauce", "sesame oil", "green onions"]
    },
    {
        "name": "Curry",
        "ingredients": ["chicken breast", "curry powder", "coconut milk", "onion", "garlic", "ginger", "basil"]
    },
    {
        "name": "Pasta",
        "ingredients": ["spaghetti", "marinara sauce", "parmesan cheese", "meatballs", "basil"]
    },
    {
        "name": "Stir Fry",
        "ingredients": ["vegetables", "soy sauce", "oil", "garlic", "ginger", "chicken breast"]
    },
    {
        "name": "Soup",
        "ingredients": ["broth", "vegetables", "noodles", "chicken breast", "herbs"]
    },
    {
        "name": "Grilled Cheese",
        "ingredients": ["bread", "cheese", "butter", "tomato soup"]
    }
]

const map = new Map();

// Filling the map on ingredient pointing to foods that need that ingredient
for (let i = 0; i < data.length; i++) {
    for (ingredient of data[i].ingredients) {
        if (!map.has(ingredient)) {
            map.set(ingredient, []);
        }
        map.get(ingredient).push(i)
    }
}

var INGR
const FOOD = new Set();

// Max foods inside a ingredient
var maxVal = 0

// Loop through the map and if the ingredient has more foods depending on it then add it to FOOD
for ([key, value] of map) {
    if (value.length > maxVal) {
        FOOD.clear()
        maxVal = value.length
        INGR = key;
        for (i of map.get(key)) {
            FOOD.add(i)
        }
    }
}

console.log(map)
console.log("Most appearing ingredients", INGR)
console.log("Foods made of most appearing ingredients", FOOD)

const INGR_SET = new Set()
const FOOD_NAME = []

// For every food add the name instead of index and get all it's ingredients
for (food of FOOD) {
    FOOD_NAME.push(data[food].name)
    for (ingr of data[food].ingredients) {
        INGR_SET.add(ingr)
    }
}

console.log("All the selected foods", FOOD_NAME)
console.log("All ingredients to make the selected foods", INGR_SET)
