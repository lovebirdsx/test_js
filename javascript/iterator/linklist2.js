class Obj2 {
    /**
     * @param {*} value 
     * @param {Obj2 | null | undefined} next 
     */
    constructor(value, next) {
        this.value = value
        this.next = next
    }

    [Symbol.iterator] () {
        var current = this
        var iterator = {
            next: function () {
                if (current) {
                    const value = current.value
                    current = current.next
                    return {value: value}
                } else {
                    return {done: true}
                }
            }
        }
        return iterator
    }
}

let c = new Obj2(1)
let b = new Obj2(2, c)
let a = new Obj2(3, b)

for (const i of a) {
    console.log(i)
}