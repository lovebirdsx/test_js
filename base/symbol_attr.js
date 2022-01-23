let s1 = Symbol('foo')
let s2 = Symbol('bar')
let s3 = Symbol('baz')
let s4 = Symbol('qux')

let o = {
    s1 : 'foo var'
}
console.log(o)

Object.defineProperty(o, s2, {value : 'bar value'})
console.log(o)
