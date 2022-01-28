var weekdays = new Set(['Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
for (const i of weekdays) {
    console.log(i)
}

var me = {
    name: 'lovebird',
    age: 23
}

console.log(typeof me)
// for (const [name, value] of me) {
//     console.log(name, value)
// }

var me2 = new Map()
me2.set('name', 'lovebird')
me2.set('age', 37)
console.log(typeof me2)
for (const [name, value] of me2) {
    console.log(name, value)
}
