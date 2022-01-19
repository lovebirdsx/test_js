// 参考 https://zhuanlan.zhihu.com/p/22652486
let s1 = Symbol()
let s2 = Symbol('foo')

console.log(s1)
console.log(s2)

let race = {
    terran: Symbol('terran'),
    protoss: Symbol('protoss'),
    zerg: Symbol('zerg')
}

console.log(race.terran)
console.log(race.protoss)
console.log(race.zerg)

s1 = Symbol('protoss')
s2 = Symbol('protoss')
console.log(s1 == s2)

let s3 = Symbol.for('terran')
let s4 = Symbol.for('terran')
console.log(s3 == s4)
