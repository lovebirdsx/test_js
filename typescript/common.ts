class TestCommon {
    static testAssign() {
        interface Foo {
            name: string;
            age: number;
        }

        const foo: Foo = { name: 'lovebird', age: 12 };
        const { name, age } = foo;
        console.log(name, age);
    }

    static run() {
       TestCommon.testAssign();
    }
}

TestCommon.run();
