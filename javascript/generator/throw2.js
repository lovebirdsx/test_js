// 外部捕获错误

function* gen() {
    yield console.log('hello')
    yield console.log('world')
}

let g = gen()
g.next()
try {
    g.throw('Error Fuck')
} catch (error) {
    console.log(error)
}
