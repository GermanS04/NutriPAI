
const express = require('express')
const { USER_ROUTE, MEAL_ROUTE, HISTORY_ROUTE, TODAY_ROUTE } = require('./consts')
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
const usersRouteFile = require('./routes/users');
const mealsRouteFile = require('./routes/meals');
const historyRouteFile = require('./routes/history');
const todayRouteFile = require('./routes/today')

// Response to no route
app.get('/', (req, res, next) => {
    res.send("Welcome to the NutriPal API");
    next();
})

// Specifing the file to each route
app.use(USER_ROUTE, usersRouteFile);
app.use(MEAL_ROUTE, mealsRouteFile);
app.use(HISTORY_ROUTE, historyRouteFile);
app.use(TODAY_ROUTE, todayRouteFile)

// Running API
app.listen(PORT, () => {
    console.log(`Running API on localhost ${PORT}`)
})
