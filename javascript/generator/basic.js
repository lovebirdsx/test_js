function* foo() {
    yield 'hello'
    yield 'world'
    return '!'
}

let f = foo()
console.log(f)

console.log(f.next())
console.log(f.next())
console.log(f.next())
console.log(f.next())

function* bar() {
    console.log('bar')
}

let b = bar()
console.log('before bar()')
b.next()