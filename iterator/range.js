class RangeIterator {
    constructor(from, to) {
        this.index = from
        this.to = to
    }

    [Symbol.iterator]() { return this }

    next() {
        return this.index < this.to ? {value: this.index++} : {done: true}
    }
}

function range(from, to) {
    return new RangeIterator(from, to)
}

for (const i of range(0, 10)) {
    console.log(i)
}
