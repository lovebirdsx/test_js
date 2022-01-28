let s = 'hi'

var it = s[Symbol.iterator]()
console.log(it)
console.log(it.next())
console.log(it.next())
console.log(it.next())