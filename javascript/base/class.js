class Module {
    constructor(x) {
        this.x = x;
    }

    getX() {
        return this.x;
    }
}

const m = new Module(42)
console.log(m, m.getX())