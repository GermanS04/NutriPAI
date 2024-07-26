const script = require('./script').script
const userTest = require('./userTest')
const UNIT_TESTS = require('./unitTests')

for (let unitTest of UNIT_TESTS) {
    const user = new userTest()

    user.setTimeCook(unitTest.user.USER_TIME_COOK)
    user.setHealth(unitTest.user.USER_HEALTH)
    user.setRandomness(unitTest.user.USER_RANDOMNESS)
    user.setIngredients(unitTest.user.USER_INGREDIENTS)
    user.setExclusion(unitTest.user.USER_EXCLUSION)
    user.setPro(unitTest.user.USER_PRO)
    user.setCarbs(unitTest.user.USER_CARBS)
    user.setFats(unitTest.user.USER_FATS)
    user.setKcalGoal(unitTest.user.USER_KCAL_GOAL)
    user.setKcalToday(unitTest.user.USER_KCAL_TODAY)
    user.setCuisineLike(unitTest.user.USER_CUISINE_LIKE)

    script(unitTest.data, true, true, false, user)
    console.log('\n')
}
