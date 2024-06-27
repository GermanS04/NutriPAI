const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await prisma.users.findUnique({
        where: {
            id
        }
    })
    res.json(user);
})

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

module.exports = router;
