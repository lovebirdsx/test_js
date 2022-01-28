function* numbers() {
    yield 1
    yield 2
    return 3
    yield 4
}

var a = [1, ...numbers()]
console.log(a)

var b = Array.from(numbers())
console.log(b)

let [x, y] = numbers()
console.log(x, y)

for (const n of numbers()) {
    console.log(n)
}