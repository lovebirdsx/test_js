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

// for 瑞来
const rowCount = 20;
for (let i = 0; i < 100 * 10000 / rowCount; i++) {
    const buff = []
    for (let j = 0; j < rowCount; j++) {
        buff.push(i * rowCount + j + 1);
    }
    console.log(buff.join(', '));
}
