const data = [
    {
        "name": "Pizza",
        "ingredients": ["flour", "yeast", "water", "salt", "olive oil", "tomato sauce", "mozzarella cheese", "pepperoni"],
        "protein": 25,
        "carbs": 40,
        "fats": 20
    },
    {
        "name": "Burger",
        "ingredients": ["beef patty", "bun", "lettuce", "tomato", "cheese", "ketchup", "mustard", "pickles"],
        "protein": 30,
        "carbs": 35,
        "fats": 25
    },
    {
        "name": "Tacos",
        "ingredients": ["tortilla", "ground beef", "shredded lettuce", "diced tomatoes", "shredded cheese", "salsa", "avocado"],
        "protein": 20,
        "carbs": 30,
        "fats": 15
    },
    {
        "name": "Salad",
        "ingredients": ["mixed greens", "cherry tomatoes", "cucumber", "carrots", "red onion", "croutons", "ranch dressing"],
        "protein": 10,
        "carbs": 20,
        "fats": 10
    },
    {
        "name": "Sandwich",
        "ingredients": ["bread", "turkey breast", "bacon", "lettuce", "tomato", "mayonnaise", "swiss cheese"],
        "protein": 35,
        "carbs": 30,
        "fats": 20
    },
    {
        "name": "Sushi",
        "ingredients": ["rice", "seaweed", "salmon", "cucumber", "avocado", "wasabi", "soy sauce"],
        "protein": 25,
        "carbs": 30,
        "fats": 15
    },
    {
        "name": "Fried Rice",
        "ingredients": ["cooked rice", "scrambled eggs", "chopped vegetables", "soy sauce", "sesame oil", "green onions"],
        "protein": 20,
        "carbs": 40,
        "fats": 20
    },
    {
        "name": "Curry",
        "ingredients": ["chicken breast", "curry powder", "coconut milk", "onion", "garlic", "ginger", "basil"],
        "protein": 30,
        "carbs": 30,
        "fats": 20
    },
    {
        "name": "Pasta",
        "ingredients": ["spaghetti", "marinara sauce", "parmesan cheese", "meatballs", "basil"],
        "protein": 25,
        "carbs": 40,
        "fats": 20
    },
    {
        "name": "Stir Fry",
        "ingredients": ["vegetables", "soy sauce", "oil", "garlic", "ginger", "chicken breast"],
        "protein": 20,
        "carbs": 30,
        "fats": 15
    },
    {
        "name": "Soup",
        "ingredients": ["broth", "vegetables", "noodles", "chicken breast", "herbs"],
        "protein": 20,
        "carbs": 30,
        "fats": 10
    },
    {
        "name": "Grilled Cheese",
        "ingredients": ["bread", "cheese", "butter", "tomato soup"],
        "protein": 15,
        "carbs": 30,
        "fats": 20
    },
    {
        "name": "Chicken Tenders",
        "ingredients": ["chicken breast", "breadcrumbs", "eggs", "flour", "oil"],
        "protein": 30,
        "carbs": 20,
        "fats": 15
    },
    {
        "name": "Meatball Sub",
        "ingredients": ["meatballs", "sub roll", "marinara sauce", "melted mozzarella"],
        "protein": 25,
        "carbs": 35,
        "fats": 20
    },
    {
        "name": "Chicken Caesar Salad",
        "ingredients": ["romaine lettuce", "grilled chicken", "caesar dressing", "croutons", "parmesan cheese"],
        "protein": 30,
        "carbs": 10,
        "fats": 20
    },
    {
        "name": "Turkey Club Sandwich",
        "ingredients": ["turkey breast", "bacon", "lettuce", "tomato", "mayonnaise", "bread"],
        "protein": 35,
        "carbs": 30,
        "fats": 20
    },
    {
        "name": "Veggie Wrap",
        "ingredients": ["tortilla", "hummus", "cucumber", "bell peppers", "spinach", "avocado"],
        "protein": 15,
        "carbs": 30,
        "fats": 10
    },
    {
        "name": "Chicken Quesadilla",
        "ingredients": ["tortilla", "shredded chicken", "cheese", "salsa", "guacamole"],
        "protein": 25,
        "carbs": 30,
        "fats": 15
    },
    {
        "name": "Steak Fajitas",
        "ingredients": ["steak", "peppers", "onions", "tortillas", "salsa", "guacamole"],
        "protein": 35,
        "carbs": 30,
        "fats": 20
    },
    {
        "name": "Chicken Tikka Masala",
        "ingredients": ["chicken breast", "tikka masala sauce", "basmati rice", "naan bread"],
        "protein": 30,
        "carbs": 40,
        "fats": 20
    },
    {
        "name": "Grilled Chicken Breast",
        "ingredients": ["chicken breast", "olive oil", "salt", "pepper"],
        "protein": 35,
        "carbs": 0,
        "fats": 10
    },
    {
        "name": "Baked Sweet Potato",
        "ingredients": ["sweet potato", "olive oil", "salt", "pepper"],
        "protein": 2,
        "carbs": 40,
        "fats": 0
    }
]


// Test for user input
const USER_PRO = 80
const USER_CARBS = 80
const USER_FATS = 30

const Graph = require('../Iteration_3/Graph')

// Creates graph and a map to store the proteins, carbs, fats of meals
const graph = new Graph()
const nutrientsMap = new Map()

// Function to compare both meals ingredient lists and know how many of them overlap
// Gets the size of the both arrays and then it gets substracted by the size of a Set that contains all non repeating ingredients
const getOverlap = (ingredients1, ingredients2) => {
    return (ingredients1.length + ingredients2.length - new Set(ingredients1.concat(ingredients2)).size)
}

// Add food into the graph and set the nutrients map
for (food of data) {
    graph.addNode(food.name)
    nutrientsMap.set(food.name, [food.protein, food.carbs, food.fats])
}

// Add edges on the graph based on the quantity of ingredients that overlap between two meals
for (meal1 of data) {
    for (meal2 of data) {
        if (meal1.name !== meal2.name) {
            graph.addEdge(meal1.name, meal2.name, getOverlap(meal1.ingredients, meal2.ingredients))
        }
    }
}

// Get the recommended meal plan from the graph
const bestPlan = graph.getRecommendations(nutrientsMap, USER_PRO, USER_CARBS, USER_FATS);

console.log('best plan', bestPlan)

const ingredientsSet = new Set()

// Get all the ingredients needed to make the three meals
for (food of data) {
    if (bestPlan.includes(food.name)) {
        for (ingr of food.ingredients) {
            ingredientsSet.add(ingr)
        }
    }
}

console.log(ingredientsSet)
