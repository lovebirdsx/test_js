class Fibonacci {
    [Symbol.iterator]() {
        let a = 1
        let b = 1
        return {
            next : function () {
                const c = a + b
                a = b
                b = c
                return {value: a}
            }
        }
    }
}

let fibonacci = new Fibonacci()

for (const n of fibonacci) {
    if (n > 1000) {
        break
    }
    console.log(n)
}
