const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})

users.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await prisma.users.findUnique({
        where: {
            id
        }
    })
    res.json(user);
})

users.post('/', (req, res) => {
    const { name, lastName, username, email } = req.body;

})

module.exports = router;
