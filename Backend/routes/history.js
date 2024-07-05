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

router.get('/registered_days/:userId', async (req, res) => {
    const userId = req.params.userId;
    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;

    if (year && !(month)) {
        const history = await prisma.meals.groupBy({
            by: ['date'],
            where: {
                userId,
                date: {
                    gte: new Date(year + "-01-01"),
                    lte: new Date(year + "-12-31")
                }
            },
            orderBy: {
                date: 'desc'
            }
        })
        res.json(history)
    } else if (year && month && !(day)) {
        const history = await prisma.meals.groupBy({
            by: ['date'],
            where: {
                userId,
                date: {
                    gte: new Date(year + '-' + month + '-01'),
                    lte: new Date(year + '-' + month + '-31')
                }
            },
            orderBy: {
                date: 'desc'
            }
        })
        res.json(history)
    } else if (year && month && day) {
        const history = await prisma.meals.groupBy({
            by: ['date'],
            where: {
                userId,
                date: {
                    gte: new Date(year + '-' + month + '-' + day),
                    lte: new Date(year + '-' + month + '-' + day)
                }
            }
        })
        res.json(history)
    } else {
        const history = await prisma.meals.groupBy({
            by: ['date'],
            where: {
                userId
            },
            orderBy: {
                date: 'desc'
            }
        })
        res.json(history)
    }
})

router.get('/maxmindate/:userId', async (req, res) => {
    const userId = req.params.userId;
    const history = await prisma.meals.aggregate({
        _max: {
            date: true
        },
        _min: {
            date: true
        },
        where: {
            userId
        }
    })
    res.json(history)
})

module.exports = router;
