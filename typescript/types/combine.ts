function testBaisc() {
    interface Foo {
        name: string;
    }
    interface Bar {
        bar(): void;
    }
    type FooBar = Foo & Bar;

    // eslint-disable-next-line no-shadow
    function test(value: FooBar, a: Array<string>) {
        console.log(value.name);
        value.bar();
    }
}
