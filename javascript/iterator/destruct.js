let a = [1, 2, 3]
let b = [1, ... a]
console.log(b)
let [c, d] = b
console.log(c, d)
let [x, ...y] = b
console.log(x, y)