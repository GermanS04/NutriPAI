class User {
    constructor() {
        this.timeCook = 'fast';
        this.health = [];
        this.randomness = 0;
        this.ingredients = ['water'];
        this.exclusion = [];
        this.pro = 10;
        this.carbs = 5;
        this.fats = 7;
        this.kcalGoal = 3000;
        this.kcalToday = 0;
        this.cuisineLike = [
            { "american": 0.64 },
            { "asian": 0.75 },
            { "british": 0.32 },
            { "caribbean": 0.45 },
            { "central europe": 0.21 },
            { "chinese": 0.68 },
            { "eastern europe": 0.39 },
            { "french": 0.51 },
            { "indian": 0.62 },
            { "italian": 0.58 },
            { "japanese": 0.71 },
            { "korean": 0.75 },
            { "kosher": 0.69 },
            { "mediterranean": 0.48 },
            { "mexican": 0.55 },
            { "middle eastern": 0.42 },
            { "nordic": 0.35 },
            { "south american": 0.49 },
            { "south east asian": 0.63 },
        ];
    }

    setTimeCook(timeCook) {
        this.timeCook = timeCook;
    }

    getTimeCook() {
        return this.timeCook;
    }

    setHealth(health) {
        this.health = health;
    }

    getHealth() {
        return this.health;
    }

    setRandomness(randomness) {
        this.randomness = randomness;
    }

    getRandomness() {
        return this.randomness;
    }

    setIngredients(ingredients) {
        this.ingredients = ingredients;
    }

    getIngredients() {
        return this.ingredients;
    }

    setExclusion(exclusion) {
        this.exclusion = exclusion;
    }

    getExclusion() {
        return this.exclusion;
    }

    setPro(pro) {
        this.pro = pro;
    }

    getPro() {
        return this.pro;
    }

    setCarbs(carbs) {
        this.carbs = carbs;
    }

    getCarbs() {
        return this.carbs;
    }

    setFats(fats) {
        this.fats = fats;
    }

    getFats() {
        return this.fats;
    }

    setKcalGoal(kcalGoal) {
        this.kcalGoal = kcalGoal;
    }

    getKcalGoal() {
        return this.kcalGoal;
    }

    setKcalToday(kcalToday) {
        this.kcalToday = kcalToday;
    }

    getKcalToday() {
        return this.kcalToday;
    }

    setCuisineLike(cuisineLike) {
        this.cuisineLike = cuisineLike;
    }

    getCuisineLike() {
        return this.cuisineLike;
    }
}

module.exports = User
