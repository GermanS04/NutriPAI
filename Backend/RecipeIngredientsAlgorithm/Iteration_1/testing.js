
const generateData = require('./dataGenerator')
const script = require('./script')

const data = generateData(10000)
const TEST_NUMBER = 100

const avg = (arr) => {
    let sum = 0;
    arr.shift()
    arr.forEach((item) => {
        sum += item;
    });

    return sum / arr.length;
}

const testTimeScript = (scriptRecipe, useFilter, useTree) => {
    const startTime = performance.now()

    scriptRecipe(data, useFilter, useTree, true)

    const endTime = performance.now()

    return endTime - startTime
}

const consoleTestsScript = (N, useFilter, useTree) => {
    let times = []

    console.log('Test')
    console.log('Use Filter Value =', useFilter)
    console.log('Use Tree Value =', useTree)
    for (let i = 0; i < N; i++) {
        times.push(testTimeScript(script.script, useFilter, useTree))
    }
    if (times.length > 1) {
        times.shift()
    }
    console.log('Average time is ', avg(times), 'milliseconds')
    console.log('\n')
}

var useF = true
var useT = true
consoleTestsScript(TEST_NUMBER, useF, useT)

useF = false
consoleTestsScript(TEST_NUMBER, useF, useT)

useT = false
consoleTestsScript(TEST_NUMBER, useF, useT)

useF = true
consoleTestsScript(TEST_NUMBER, useF, useT)
