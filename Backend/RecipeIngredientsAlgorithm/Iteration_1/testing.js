
const script = require('./script')

var useFilter = false
var useTree = false

const avg = (arr) => {
    let sum = 0;
    arr.shift()
    arr.forEach((item) => {
        sum += item;
    });

    return sum / arr.length;
}

const testTimeScript = (scriptRecipe) => {
    const startTime = performance.now()

    scriptRecipe(useFilter, useTree);

    const endTime = performance.now()

    console.log(`The function ${scriptRecipe.name} took ${endTime - startTime} milliseconds`)
    return endTime - startTime
}

const times = []

console.log('Test')
console.log('Use Filter Value =', useFilter)
console.log('Use Tree Value =', useTree)
for (let i = 0; i < 10; i++) {
    times.push(testTimeScript(script))
    console.log('\n')
}

console.log('Average time is ', avg(times))
