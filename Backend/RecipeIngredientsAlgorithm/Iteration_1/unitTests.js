const script = require('./script').script
const userTest = require('./userTest')

const UNIT_TESTS = [
    {
        "user": {
            "USER_TIME_COOK": 'fast',
            "USER_HEALTH": [

            ],
            "USER_RANDOMNESS": 0,
            "USER_INGREDIENTS": [
                'water'
            ],
            "USER_EXCLUSION": [
                'water'
            ],
            "USER_PRO": 20,
            "USER_CARBS": 20,
            "USER_FATS": 20,
            "USER_KCAL_GOAL": 3000,
            "USER_KCAL_TODAY": 0,
            "USER_CUISINE_LIKE": [
                { "american": 0 },
                { "asian": 1 }
            ]
        },
        "data": [
            {
                "recipe": {
                    "label": "a",
                    "healthLabels": [],
                    "ingredients": [
                        { "food": "water" }
                    ],
                    "calories": 1200,
                    "cuisineType": ['asian'],
                    "mealType": ['lunch/dinner'],
                    "totalTime": 10,
                    "totalNutrients": {
                        "FAT": {
                            "quantity": 20
                        },
                        "CHOCDF": {
                            "quantity": 20
                        },
                        "PROCNT": {
                            "quantity": 20
                        }
                    }
                }
            },
            {
                "recipe": {
                    "label": "b",
                    "healthLabels": [],
                    "ingredients": [
                        { "food": "water" }
                    ],
                    "calories": 1500,
                    "cuisineType": ['american'],
                    "mealType": ['lunch/dinner'],
                    "totalTime": 10,
                    "totalNutrients": {
                        "FAT": {
                            "quantity": 20
                        },
                        "CHOCDF": {
                            "quantity": 20
                        },
                        "PROCNT": {
                            "quantity": 20
                        }
                    }
                }
            }
        ]
    },
]

for (let unitTest of UNIT_TESTS) {
    const user = new userTest()

    user.setTimeCook(unitTest.user.USER_TIME_COOK)
    user.setHealth(unitTest.user.USER_HEALTH)
    user.setRandomness(unitTest.user.USER_RANDOMNESS)
    user.setIngredients(unitTest.user.USER_INGREDIENTS)
    user.setExclusion(unitTest.user.USER_EXCLUSION)
    user.setPro(unitTest.user.USER_PRO)
    user.setCarbs(unitTest.user.USER_CARBS)
    user.setFats(unitTest.user.USER_FATS)
    user.setKcalGoal(unitTest.user.USER_KCAL_GOAL)
    user.setKcalToday(unitTest.user.USER_KCAL_TODAY)
    user.setCuisineLike(unitTest.user.USER_CUISINE_LIKE)

    script(unitTest.data, true, true, false, user)
}
