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

    static Run() {
        TestInterface2.testBasic();
    }
}

TestInterface2.Run();
