function testFoo() {
    interface Foo {
        run?: () => void;
    }

    const foo: Foo = {};
    foo.run?.call(foo);
    const foo2: Foo = { run: () => console.log('foo') };
    foo2.run?.call(foo2);
}

testFoo();
