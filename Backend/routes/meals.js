const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { MEAL_CUISINE_ROUTE } = require('../consts');
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})

// Getting a meal by its ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const meal = await prisma.meals.findUnique({
        where: {
            id
        }
    })
    res.json(meal);
})

// Getting an average of how much the user likes a cuisine by getting all the meals from the user and
// put in a map the cuisine as and the like or dislike in an array as value. then go through the map
// to get the weighted average of each cuisine array and put that into a json format string
router.get('/cuisine' + '/:id', async (req, res) => {
    const userId = req.params.id;
    const cuisines = await prisma.meals.findMany({
        where: {
            userId
        },
        select: {
            cuisine: true,
            like: true
        }
    })

    const mapCuisines = new Map()

    for (let cuisine of cuisines) {
        if (!mapCuisines.has(cuisine.cuisine)) {
            if (cuisine.like === true) {
                mapCuisines.set(cuisine.cuisine, [1])
            } else {
                mapCuisines.set(cuisine.cuisine, [0])
            }
        } else {
            if (cuisine.like === true) {
                mapCuisines.get(cuisine.cuisine).push(1)
            } else {
                mapCuisines.get(cuisine.cuisine).push(0)
            }
        }
    }

    var jsonStr = '[{'
    for (let cuisine of mapCuisines) {
        let likeCount = 0
        for (let likes of cuisine[1]) {
            if (likes) {
                likeCount++
            }
        }
        let weightAverage = likeCount / cuisine[1].length
        jsonStr += `"${cuisine[0]}": ${weightAverage},`
    }

    jsonStr = jsonStr.slice(0, -1)
    jsonStr += '}]'
    const jsonRes = JSON.parse(jsonStr)

    res.json(jsonRes)
})

// Posting a meal following the next types
/*
    name: string;
    category: string;
    description: string;
    proteins: number;
    carbs: number;
    fats: number;
    calories: number;
    cuisine: string;
    like: boolean;
    date: string;
    userId: string;
*/
router.post('/', async (req, res) => {
    const { name, category, description, proteins, carbs, fats, calories, cuisine, like, date, userId } = req.body;
    const meal = await prisma.meals.create({
        data: {
            name,
            category,
            description,
            proteins,
            carbs,
            fats,
            calories,
            cuisine,
            like,
            date,
            userId
        }
    })
    res.json(meal);
})

// Getting the meal of a user based on the date and category (Breakfast, Lunch, Dinner)
router.get('/:date/:id', async (req, res) => {
    const date = req.params.date;
    const userId = req.params.id;
    const category = req.query.category;
    const meals = await prisma.meals.findMany({
        where: {
            userId,
            date,
            category
        }
    })
    res.json(meals)
})

module.exports = router
