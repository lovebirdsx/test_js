let a = ['a','b','c','d']
for (const i in a) {
    console.log(i)
}
for (const i of a) {
    console.log(i)
}

console.log(a.slice(0, 0))
console.log(a.slice(0, 1))
console.log(a.length, typeof a);

let b = Array(9).fill(null);
console.log(b, typeof(b), b.length)
