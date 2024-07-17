const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { HISTORY_REGISTERED_DAYS_ROUTE, HISTORY_MAX_MIN_DATE_ROUTE } = require('../consts')

router.use('/', (req, res, next) => {
    next();
})

// Helper function to return the date in format yyyy-mm-dd
const formatDate = (year, month, day) => {
    return (year + '-' + month + '-' + day)
}

// Route to get all the registered meals of a user using pagination
// gte = Greater than or equal to
// lte = Least than or equal to
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const page = parseInt(req.query.page);
    const year = req.query.year;
    const month = req.query.month;

    // If on the filter option there's year selected but no month then do a search from Jan 1st to Dec 31st
    if (year && !(month)) {
        const history = await prisma.meals.findMany({
            skip: page * 5,
            take: 5,
            where: {
                userId,
                date: {
                    gte: new Date(formatDate(year, "01", "01")),
                    lte: new Date(formatDate(year, "12", "31"))
                }
            }
        })
        res.json(history);

        // If on the filter option there's both year and month then search from that year and month from the 1st to 31st
    } else if (year && month) {
        const history = await prisma.meals.findMany({
            skip: page * 5,
            take: 5,
            where: {
                userId,
                date: {
                    gte: new Date(formatDate(year, month, '01')),
                    lte: new Date(formatDate(year, month, '31'))
                }
            }
        })
        res.json(history);

        // If there are no year nor month specified then just return all the meals registered of the user
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

// Route to get only the dates, in format 2020-07-10T15:00:00.000 (ISO 8601), when the user registered meals
// gte = Greater than or equal to
// lte = Least than or equal to
router.get(HISTORY_REGISTERED_DAYS_ROUTE + '/:userId', async (req, res) => {
    const userId = req.params.userId;
    const page = parseInt(req.query.page);
    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;

    // If on the filter option there's year selected but no month then do a search of the dates from Jan 1st to Dec 31st
    if (year && !(month)) {
        const history = await prisma.meals.groupBy({
            skip: page * 5,
            take: 5,
            by: ['date'],
            where: {
                userId,
                date: {
                    gte: new Date(formatDate(year, "01", "01")),
                    lte: new Date(formatDate(year, "12", "31"))
                }
            },
            orderBy: {
                date: 'desc'
            }
        })
        res.json(history)

        // If on the filter option there's year and month selected but no day specified then do a search of the dates from that year and month from the 1st to 31st
    } else if (year && month && !(day)) {
        const history = await prisma.meals.groupBy({
            skip: page * 5,
            take: 5,
            by: ['date'],
            where: {
                userId,
                date: {
                    gte: new Date(formatDate(year, month, '01')),
                    lte: new Date(formatDate(year, month, '31'))
                }
            },
            orderBy: {
                date: 'desc'
            }
        })
        res.json(history)

        // If on the filter option there's year, month, and day specified then look if the user has a meal registered that day
    } else if (year && month && day) {
        const history = await prisma.meals.groupBy({
            skip: page * 5,
            take: 5,
            by: ['date'],
            where: {
                userId,
                date: {
                    gte: new Date(formatDate(year, month, day)),
                    lte: new Date(formatDate(year, month, day))
                }
            }
        })
        res.json(history)

        // If there are no filters specified then return all the dates the user has registered a meal
    } else {
        const history = await prisma.meals.groupBy({
            skip: page * 5,
            take: 5,
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

// Route to get the maximum and minimum date the user has registered a meal
router.get(HISTORY_MAX_MIN_DATE_ROUTE + '/:userId', async (req, res) => {
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
