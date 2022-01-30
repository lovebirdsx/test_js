/* eslint-disable max-classes-per-file */
class TestInterface2 {
    static testBasic() {
        abstract class Animal {
            name: string;

            constructor(name: string) {
                this.name = name;
            }

            abstract run(): void;
        }

        interface IEatable {
            eat(): void;
        }
        interface IHowlable {
            howl(): void;
        }
        interface ILoudlyHowlable extends IHowlable {
            loudlyHowl(): void;
        }

        class Cat extends Animal implements ILoudlyHowlable, IEatable {
            constructor() {
                super('Cat');
            }

            eat(): void {
                console.log(`${this.name} eat`);
            }

            loudlyHowl(): void {
                console.log(`${this.name} loudly howl`);
            }

            howl(): void {
                console.log(`${this.name} howl`);
            }

            run(): void {
                console.log(`${this.name} is running`);
            }
        }

        const cat = new Cat();
        cat.run();

        const eatable: IEatable = cat;
        eatable.eat();

        const howable: IHowlable = cat;
        howable.howl();

        (howable as ILoudlyHowlable).loudlyHowl();
        // (howable as IEatable).eat(); 报错
    }

    static testAdvanced() {
        interface Foo {
            foo: string;
        }
        interface Bar {
            bar: string;
        }

        function isFoo(obj:Foo | Bar): obj is Foo {
            return (obj as Foo).foo !== undefined;
        }

        const foo = { foo: 'Foo' };
        const bar = { bar: 'Bar' };
        console.log(`foo is foo = ${isFoo(foo)}`);
        console.log(`bar is foo = ${isFoo(bar)}`);
    }

    static Run() {
        TestInterface2.testBasic();
        TestInterface2.testAdvanced();
    }
}

TestInterface2.Run();
