function testReturnTypes() {
    type Foo = () => boolean;
    type K = ReturnType<Foo>;
    const a: K = false;
    console.log(a);

    function foo() {
        return { x: 10, y: 20 };
    }

    console.log(typeof foo);
    type T = ReturnType<typeof foo>;
    const t: T = {
        x: 10,
        y: 20,
    };
}
