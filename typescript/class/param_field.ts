function testParamField() {
    class Foo {
        constructor(
            public name:string,
            public age: number,
        ) {}

        info() {
            console.log(this.name, this.age);
        }
    }

    const f = new Foo('hello', 12);
    f.info();
}
