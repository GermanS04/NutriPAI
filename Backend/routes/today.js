const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})

router.get('/:userId', async (req, res) => {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    const formattedToday = year + '-' + month + '-' + day;

    const userId = req.params.userId;
    const today = await prisma.meals.findMany({
        where: {
            userId,
            date: {
                gte: new Date(formattedToday),
                lte: new Date(formattedToday)
            }
        },
        select: {
            proteins: true,
            carbs: true,
            fats: true,
            calories: true,
        },
    })
    res.json(today)
})

module.exports = router;
