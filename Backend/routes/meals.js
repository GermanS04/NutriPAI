const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
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

// Posting a meal following the next types
/*
    name: string;
    category: string;
    description: string;
    proteins: number;
    carbs: number;
    fats: number;
    calories: number;
    date: string;
    userId: string;
*/
router.post('/', async (req, res) => {
    const { name, category, description, proteins, carbs, fats, calories, date, userId } = req.body;
    const meal = await prisma.meals.create({
        data: {
            name,
            category,
            description,
            proteins,
            carbs,
            fats,
            calories,
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
