const { PrismaClient } = require('@prisma/client')

const express = require('express')
const app = express();
const PORT = 2024;
const prisma = new PrismaClient();
const cors = require('cors')

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const usersRoute = require('./routes/users');
const mealsRoute = require('./routes/meals');
const historyRoute = require('./routes/history');
const todayRoute = require('./routes/today')

app.get('/', (req, res, next) => {
    res.send("Welcome to the NutriPal API");
    next();
})

app.use('/users', usersRoute);
app.use('/meals', mealsRoute);
app.use('/history', historyRoute);
app.use('/today', todayRoute)

app.listen(PORT, () => {
    console.log(`Running API on localhost ${PORT}`)
})
