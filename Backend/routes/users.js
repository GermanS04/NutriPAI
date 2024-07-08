const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})

// Getting the information of the user by the id on the path /users/id (the id is the UID of firebase a string of 28 characters)
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await prisma.users.findUnique({
        where: {
            id
        }
    })
    res.json(user);
})

// Posting the user from registration, since Firebase is in charge of the authentication we do not need the password to be stored in the database
router.post('/', async (req, res) => {
    const { id, name, lastName, username, email } = req.body;
    const user = await prisma.users.create({
        data: {
            id,
            name,
            lastName,
            username,
            email
        }
    })
    res.json(user);
})

router.post('/goal', async (req, res) => {
    const { id, kcalGoal } = req.body;
    const user = await prisma.users.update({
        where: {
            id
        },
        data: {
            kcalGoal
        }
    })
    res.json(user);
})

module.exports = router;
