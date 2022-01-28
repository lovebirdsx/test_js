function simpleTag(strings, aExp, bExp, sumExp) {
    console.log(strings)
    console.log(aExp)
    console.log(bExp)
    console.log(sumExp)
}

function simpleTag2(strings, ...exps) {
    console.log(strings)
    for (const exp of exps) {
        console.log(exp)
    }
}

let a = 6
let b = 9
simpleTag `${a} + ${b} = ${a+b}`
simpleTag2 `${a} + ${b} = ${a+b}, ${"yeah?"}`
