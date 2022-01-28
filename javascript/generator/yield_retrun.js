function* foo() {
    for (let i = 0; i < 100; i++) {
        const reset = yield i
        if (reset) {
            i = 0
        }
    }
}

var f = foo()
console.log(f.next())
console.log(f.next())
console.log(f.next(true))
console.log(f.next())

console.log('============================')

function* bar(x) {
    let y = 10 + 2 * (yield (x + 1))
    let z = (yield y) + 1
    return x + y + z
}

var b = bar(3)
console.log(b.next(1))
console.log(b.next(2))
console.log(b.next())
console.log(b.next())
