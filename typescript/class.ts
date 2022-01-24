/* eslint-disable max-classes-per-file */
class TestClass {
    static testBasic() {
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

    static testAbstract() {
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

    static Run() {
        TestClass.testBasic();
        TestClass.testAbstract();
    }
}

TestClass.Run();
