const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.use('/', (req, res, next) => {
    next();
})

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const page = parseInt(req.query.page);
    const year = req.query.year;
    const month = req.query.month;

    if (year && !(month)) {
        const history = await prisma.meals.findMany({
            skip: page * 5,
            take: 5,
            where: {
                userId,
                date: {
                    gte: new Date(year + "-01-01"),
                    lte: new Date(year + "-12-31")
                }
            }
        })
        res.json(history);

    } else if (year && month) {
        const history = await prisma.meals.findMany({
            skip: page * 5,
            take: 5,
            where: {
                userId,
                date: {
                    gte: new Date(year + '-' + month + '-01'),
                    lte: new Date(year + '-' + month + '-31')
                }
            }
        })
        res.json(history);
    } else {
        const history = await prisma.meals.findMany({
            skip: page * 5,
            take: 5,
            where: {
                userId
            }
        })
        res.json(history);

    }

})


module.exports = router;
