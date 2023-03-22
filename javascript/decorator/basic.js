const assert = require('assert');

function replaceMethod() {
    return function () { // (A)
        return `How are you, ${this.name}?`;
    };
}

class Person {
    constructor(name) {
        this.name = name;
    }

    @replaceMethod
    hello() { // (B)
        return `Hi ${this.name}!`;
    }
}

const robin = new Person('Robin');
assert.equal(robin.hello(), 'How are you, Robin?');
