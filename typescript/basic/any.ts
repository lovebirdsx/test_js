function testAny() {
    class Foo {
        // eslint-disable-next-line class-methods-use-this
        setName(name: string): void {
            console.log(name);
        }
    }
    let a: any = 'hello';
    console.log(a);
    a = 1;
    console.log(a);

    let something: any;
    something = 'serven';
    something = 7;
    something = new Foo();
    something.setName('Tom');
}

testAny();
