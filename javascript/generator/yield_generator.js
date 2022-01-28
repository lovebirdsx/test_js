function* foo() {
    yield 'a'
    yield 'b'
    yield 'c'
}

function* bar() {
    yield 1
    yield* foo()
    yield 2
}

for (const i of bar()) {
    console.log(i)
}

function* baz() {
    yield 'hello'
    yield* 'world'
}

for (const i of baz()) {
    console.log(i)
}