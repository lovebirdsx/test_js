const map = new Map()
const k1 = ['a']
const k2 = ['b']

map.set(k1, 111)
map.set(k2, 222)

console.log(map.get(k1));
console.log(map.get(k2));


const map2 = {
    'foo' : 1,
    'bar' : 2
}

console.log(JSON.stringify(map2))