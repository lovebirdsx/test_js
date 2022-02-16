class Spread {
    static testBase() {
        const foo = [1, 2, 3];
        const bar = [...foo, 4, 5, 6];
        console.log(bar);
    }

    static testPassToFunction() {
        const foo = [1, 2, 3];
        console.log(Math.max(...foo));
    }

    static testPush() {
        const foo = [1, 2, 3];
        const bar = [4];
        bar.push(...foo);
        console.log(bar);
    }

    static testStringToArray() {
        const s = 'Hello World';
        const sa = [...s];
        console.log(sa);
    }

    static testConcatMap() {
        const a = { foo: 'Foo' };
        const b = { bar: 'Bar' };
        const c = { ...a, ...b };
        console.log(c);
    }

    static run() {
        Spread.testBase();
        Spread.testPassToFunction();
        Spread.testPush();
        Spread.testStringToArray();
        Spread.testConcatMap();
    }
}

Spread.run();
