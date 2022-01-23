// 内部和外部catch error的方式

function* g() {
    try {
        yield
    } catch (error) {
        console.log('Internal error', error)
    }
}

var f = g()
try {
    f.next()
    f.throw()
    f.throw()
} catch (error) {
    console.log('Outter error', error)
}