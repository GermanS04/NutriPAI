
const express = require('express')
const app = express();
const PORT = 2024;
const cors = require('cors')

app.use(express.json());

// Giving authorization to the webapp to use the methods
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Getting the route files
const usersRoute = require('./routes/users');
const mealsRoute = require('./routes/meals');
const historyRoute = require('./routes/history');
const todayRoute = require('./routes/today')

// Response to no route
app.get('/', (req, res, next) => {
    res.send("Welcome to the NutriPal API");
    next();
})

// Specifing the file to each route
app.use('/users', usersRoute);
app.use('/meals', mealsRoute);
app.use('/history', historyRoute);
app.use('/today', todayRoute)

// Running API
app.listen(PORT, () => {
    console.log(`Running API on localhost ${PORT}`)
})
