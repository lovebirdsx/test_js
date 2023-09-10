/* eslint-disable no-dupe-class-members */
/* eslint-disable max-classes-per-file */
function TestClass() {
    function testBasic() {
        class Animal {
            readonly name;

            protected legCount = 0;

            constructor(name: string) {
                this.name = name;
            }
        }

        class Cat extends Animal {
            constructor(legCount: number) {
                super('Cat');
                this.legCount = legCount;
            }

            getLegCount() {
                return this.legCount;
            }
        }

        const a = new Animal('Dog');
        console.log(a.name);
        // a.name = 'Cat'; readonly 不允许修改
        // a.legCount; protected 不允许外部访问
        const c = new Cat(4);
        console.log(c.name, c.getLegCount());
    }

    function testAbstract() {
        abstract class Animal {
            readonly name;

            constructor(name: string) {
                this.name = name;
            }

            abstract run(): void;
        }

        class Cat extends Animal {
            constructor() {
                super('Cat');
            }

            // eslint-disable-next-line class-methods-use-this
            run(): void {
                console.log('This is cat running');
            }
        }

        const cat = new Cat();
        cat.run();
    }

    function testClassName() {
        class Foo {
            public readonly id = 1;
            public readonly name = 'hello';
        }
        const obj = new Foo();
        console.log(obj.constructor.name);
        // eslint-disable-next-line space-unary-ops
        console.log(typeof(Foo), Foo.name);
    }

    function testOperatorOverload() {
        class Foo {
            bar(id: number): void;
            bar(id: string): void;
            bar(id: boolean): void;
            bar(id: any): void {
                if (typeof id === 'number') {
                    console.log('id is number');
                } else if (typeof id === 'string') {
                    console.log('id is string');
                } else if (typeof id === 'boolean') {
                    console.log('id is boolean');
                } else {
                    console.log('id is unknown');
                }
            }
        }

        const foo = new Foo();
        foo.bar(1);
        foo.bar('1');
        foo.bar(true);
    }

    testBasic();
    testAbstract();
    testClassName();
    testOperatorOverload();
}

TestClass();
