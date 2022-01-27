const map = new Map()
const k1 = ['a']
const k2 = ['b']

map.set(k1, 111)
map.set(k2, 222)

console.log(map.get(k1));
console.log(map.get(k2));
console.log(map.has(k1));

const map2 = {
    'foo' : 1,
    'bar' : 2
}

for (const key in map2) {
    console.log(key, map2[key])
}

console.log(JSON.stringify(map2))

const list = [1, 2, 3, 4, 5]

const map3 = {
    name: 'lovebird',
    age: 18
}

for (const key in map3) {
    console.log(key, map3[key])
}

const map4 = new Map();
map4.set('foo', 1);
map4.set('bar', 2);
console.log(map4)
console.log(map4.entries())
for (const [key, value] of map4) {
    console.log(key, value);
}