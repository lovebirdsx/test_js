let obj = {
    foo:1,
    bar:2,
    get baz() {
        return this.foo + this.bar
    }
}

console.log(Reflect.get(obj, 'foo'))
console.log(Reflect.get(obj, 'bar'))
console.log(Reflect.get(obj, 'baz'))

console.log(Reflect.set(obj, 'foo', 2))
console.log(obj.foo)

console.log(Reflect.set(obj, 'baz', 'Hello'))
console.log(obj.baz)