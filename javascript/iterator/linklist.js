function Obj(value) {
    this.value = value
    this.next = null
}

Obj.prototype[Symbol.iterator] = function () {
    var current = this
    var iterrator = {
        next : function () {
            if (current) {
                var value = current.value
                current = current.next
                return { value: value }
            } else {
                return { done: true }
            }
        }
    }
    return iterrator
}

let a = new Obj(1)
let b = new Obj(3)
let c = new Obj(2)
a.next = b
b.next = c
for (const v of a) {
    console.log(v)
}
