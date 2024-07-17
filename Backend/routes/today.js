const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})

// Get all the meals of the user that were registered today and make a summation of the nutrients
// gte = Greater than or equal to
// lte = Least than or equal to
router.get('/:userId', async (req, res) => {
    const now = new Date();             // Creating a Date object
    const year = now.getFullYear();     // Getting todays year
    let month = now.getMonth() + 1;     // Getting todays month (January = 0)
    let day = now.getDate();            // Getting todays day

    // Make the day and month adapt to format dd and mm if they are below 10
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    // Date in format yyyy-mm-dd
    const formattedToday = year + '-' + month + '-' + day;

    const userId = req.params.userId;

    // Getting an array of objects of the meals from today
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

    let proteins = 0, carbs = 0, fats = 0, calories = 0;

    // Going through each of the meals and doing the summation of the nutrients
    for (let index in today) {
        proteins += today[index].proteins
        carbs += today[index].carbs
        fats += today[index].fats
        calories += today[index].calories
    }

    // Declaring the object to return
    const sumToday = [
        {
            "proteins": proteins,
            "carbs": carbs,
            "fats": fats,
            "calories": calories
        }
    ]

    res.json(sumToday)
})

module.exports = router;
