const a = [2, 3, 4, 3, 5, 2, 2]
let s = new Set()
a.forEach(i => s.add(i))

console.log('array', a);
console.log('set', s);

s.forEach(i => console.log(i))
