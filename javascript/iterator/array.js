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

// 数组可以随便设定值?
let c = [];
c[1] = 'a';
c[3] = 'c';
console.log(c, c.length);
