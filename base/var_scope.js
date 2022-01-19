function foo(a, b) {
    var sum = a + b
    return sum
}

foo(2, 3)
// console.log(sum);

function bar(a, b) {
    sum = a + b
    return sum
}

bar(2, 3)
console.log(sum)

function baz() {
    console.log(foo)
    var foo = 'hello'
    console.log(foo)
}

baz()