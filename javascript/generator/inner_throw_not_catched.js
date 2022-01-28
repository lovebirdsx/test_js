function* gen4() {
    yield console.log(1)
    throw 'Inner Error'
    yield console.log(2)
    yield console.log(3)
}

let g4 = gen4()
try {
    console.log('Step 1')
    g4.next()
    console.log('Step 1')
} catch (e) {
    console.log(e)
}
try {
    console.log('Step 2')
    g4.next()
    console.log('Step 2')
} catch (e) {
    console.log(e)
}
try {
    console.log('Step 3')
    g4.next()
    console.log('Step 3')
} catch (e) {
    console.log(e)
}