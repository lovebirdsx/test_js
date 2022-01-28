function* r1() {
    yield 1
    yield 2
    yield 3
}

let a = r1()
console.log(a.next()) 
console.log(a.return('foo'))
console.log(a.next())

console.log('==================================')

function* r2() {
    try {
        yield 1
        yield 2
        yield 3
    } catch (e) {
        console.log(e)
    } finally {
        yield 4
    }
    yield 5
}

let b = r2()
console.log(b.next())
console.log(b.return('bar'))
console.log(b.next())
console.log(b.next())
console.log(b.next())
