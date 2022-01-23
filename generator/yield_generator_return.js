// generator通过return向yield*返回值

function* foo() {
    yield 1
    yield 2
    return 'foo'
}

function* bar() {
    yield 'a'
    let f = yield* foo()
    console.log(f)
    yield 'b'
}

for (const i of bar()) {
    console.log(i)
}