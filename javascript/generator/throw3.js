// throw被内部捕获时,会顺带执行一次yield

function* gen3() {
    try {
        yield console.log('a');
    } catch (e) {
        console.log('Inner error', e)
    }
    yield console.log('b');
    yield console.log('c');
}

let g = gen3()
g.next()    // a
g.throw()   // b
g.next()    // c