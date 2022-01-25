/* eslint-disable max-classes-per-file */
class TestMap {
    static testBase() {
        class Foo {
            name: string;
            constructor(name:string) {
                this.name = name;
            }
        }

        class Bar {
            name: string;
            constructor(name:string) {
                this.name = name;
            }
        }

        const foo = new Foo('Foo');
        const bar = new Bar('Bar');
        console.log(foo, bar);
    }

    static run() {
        TestMap.testBase();
    }
}

TestMap.run();
