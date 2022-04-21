function testAssgin() {
    class Foo {
        name: string = 'hello';

        hello() {
            console.log('hello', this.name);
        }
    }

    function createFoo(fooParams: Partial<Foo>): Foo {
        const foo = new Foo();
        Object.assign(foo, fooParams);
        return foo;
    }

    const foo = createFoo({
        name: 'hello 1',
        hello: () => console.log('This is modified'),
    });

    foo.hello();
}

testAssgin();
