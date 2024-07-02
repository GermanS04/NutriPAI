const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})


router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const meal = await prisma.meals.findUnique({
        where: {
            id
        }
    })
    res.json(meal);
})


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
