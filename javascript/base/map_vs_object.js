// Map 和 Object的比较
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map

const map1 = new Map();
map1.set('foo', 1);
map1.set('bar', 2);

for (const [name, id] of map1) {
    console.log(name, id);
}

const map2 = {foo:1, bar:2}

for (const key in map2) {
    console.log(key, map2[key]);
}