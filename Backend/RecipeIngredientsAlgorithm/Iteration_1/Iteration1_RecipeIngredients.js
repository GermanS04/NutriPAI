const data = [
    {
        "name": "Pizza",
        "ingredients": ["flour", "yeast", "water", "salt", "olive oil", "tomato sauce", "mozzarella cheese", "pepperoni"],
        "protein": 25,
        "carbs": 40,
        "fats": 20,
        "cuisine": "Italian"
    },
    {
        "name": "Burger",
        "ingredients": ["beef patty", "bun", "lettuce", "tomato", "cheese", "ketchup", "mustard", "pickles"],
        "protein": 30,
        "carbs": 35,
        "fats": 25,
        "cuisine": "American"
    },
    {
        "name": "Tacos",
        "ingredients": ["tortilla", "ground beef", "shredded lettuce", "diced tomatoes", "shredded cheese", "salsa", "avocado"],
        "protein": 20,
        "carbs": 30,
        "fats": 15,
        "cuisine": "Mexican"
    },
    {
        "name": "Salad",
        "ingredients": ["mixed greens", "cherry tomatoes", "cucumber", "carrots", "red onion", "croutons", "ranch dressing"],
        "protein": 10,
        "carbs": 20,
        "fats": 10,
        "cuisine": "American"
    },
    {
        "name": "Sandwich",
        "ingredients": ["bread", "turkey breast", "bacon", "lettuce", "tomato", "mayonnaise", "swiss cheese"],
        "protein": 35,
        "carbs": 30,
        "fats": 20,
        "cuisine": "American"
    },
    {
        "name": "Sushi",
        "ingredients": ["rice", "seaweed", "salmon", "cucumber", "avocado", "wasabi", "soy sauce"],
        "protein": 25,
        "carbs": 30,
        "fats": 15,
        "cuisine": "Japanese"
    },
    {
        "name": "Fried Rice",
        "ingredients": ["cooked rice", "scrambled eggs", "chopped vegetables", "soy sauce", "sesame oil", "green onions"],
        "protein": 20,
        "carbs": 40,
        "fats": 20,
        "cuisine": "Chinese"
    },
    {
        "name": "Curry",
        "ingredients": ["chicken breast", "curry powder", "coconut milk", "onion", "garlic", "ginger", "basil"],
        "protein": 30,
        "carbs": 30,
        "fats": 20,
        "cuisine": "Indian"
    },
    {
        "name": "Pasta",
        "ingredients": ["spaghetti", "marinara sauce", "parmesan cheese", "meatballs", "basil"],
        "protein": 25,
        "carbs": 40,
        "fats": 20,
        "cuisine": "Italian"
    },
    {
        "name": "Stir Fry",
        "ingredients": ["vegetables", "soy sauce", "oil", "garlic", "ginger", "chicken breast"],
        "protein": 20,
        "carbs": 30,
        "fats": 15,
        "cuisine": "Chinese"
    },
    {
        "name": "Soup",
        "ingredients": ["broth", "vegetables", "noodles", "chicken breast", "herbs"],
        "protein": 20,
        "carbs": 30,
        "fats": 10,
        "cuisine": "French"
    },
    {
        "name": "Grilled Cheese",
        "ingredients": ["bread", "cheese", "butter", "tomato soup"],
        "protein": 15,
        "carbs": 30,
        "fats": 20,
        "cuisine": "American"
    },
    {
        "name": "Chicken Tenders",
        "ingredients": ["chicken breast", "breadcrumbs", "eggs", "flour", "oil"],
        "protein": 30,
        "carbs": 20,
        "fats": 15,
        "cuisine": "American"
    },
    {
        "name": "Meatball Sub",
        "ingredients": ["meatballs", "sub roll", "marinara sauce", "melted mozzarella"],
        "protein": 25,
        "carbs": 35,
        "fats": 20,
        "cuisine": "Italian"
    },
    {
        "name": "Chicken Caesar Salad",
        "ingredients": ["romaine lettuce", "grilled chicken", "caesar dressing", "croutons", "parmesan cheese"],
        "protein": 30,
        "carbs": 10,
        "fats": 20,
        "cuisine": "American"
    },
    {
        "name": "Turkey Club Sandwich",
        "ingredients": ["turkey breast", "bacon", "lettuce", "tomato", "mayonnaise", "bread"],
        "protein": 35,
        "carbs": 30,
        "fats": 20,
        "cuisine": "American"
    },
    {
        "name": "Veggie Wrap",
        "ingredients": ["tortilla", "hummus", "cucumber", "bell peppers", "spinach", "avocado"],
        "protein": 15,
        "carbs": 30,
        "fats": 10,
        "cuisine": "Middle Eastern"
    },
    {
        "name": "Chicken Quesadilla",
        "ingredients": ["tortilla", "shredded chicken", "cheese", "salsa", "guacamole"],
        "protein": 25,
        "carbs": 30,
        "fats": 15,
        "cuisine": "Mexican"
    },
    {
        "name": "Steak Fajitas",
        "ingredients": ["steak", "peppers", "onions", "tortillas", "salsa", "guacamole"],
        "protein": 35,
        "carbs": 30,
        "fats": 20,
        "cuisine": "Mexican"
    },
    {
        "name": "Chicken Tikka Masala",
        "ingredients": ["chicken breast", "tikka masala sauce", "basmati rice", "naan bread"],
        "protein": 30,
        "carbs": 40,
        "fats": 20,
        "cuisine": "Indian"
    },
    {
        "name": "Grilled Chicken Breast",
        "ingredients": ["chicken breast", "olive oil", "salt", "pepper"],
        "protein": 35,
        "carbs": 0,
        "fats": 10,
        "cuisine": "American"
    },
    {
        "name": "Baked Sweet Potato",
        "ingredients": ["sweet potato", "olive oil", "salt", "pepper"],
        "protein": 2,
        "carbs": 40,
        "fats": 0,
        "cuisine": "American"
    }
]

userIngredients = ["flour", "yeast", "water", "salt", "olive oil", "tomato sauce", "mozzarella cheese", "pepperoni"]
userMostEaten = ['American', 'Mexican', 'Indian', 'Middle Eastern', 'Italian']
recommendationsArray = []


const overlapIngredients = (ingredients1, ingredients2) => {
    return (ingredients1.length + ingredients2.length - new Set(ingredients1.concat(ingredients2)).size)
}

const compareFoods = (a, b) => {
    return b[1] - a[1]
}

for (var food of data) {
    if (userMostEaten.includes(food.cuisine)) {
        console.log(food)
        recommendationsArray.push([food, overlapIngredients(food.ingredients, userIngredients)])
    }
}

recommendationsArray.sort(compareFoods)

console.log('recommendation', recommendationsArray)
