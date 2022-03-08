module foo {
    interface Foo {
        a?: String;
    }

    const f: Foo = {};

    console.log(f.a || 'hello');
}
