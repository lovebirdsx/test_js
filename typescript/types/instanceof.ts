module test_instanceof {
    function testBasic() {
        class Animal {
            constructor(public name: string) {}

            walk() {
                console.log(`this is ${this.name} walking`);
            }
        }

        class Cat extends Animal {
            constructor() {
                super('Cat');
            }
        }

        class Dog extends Animal {
            constructor() {
                super('Dog');
            }
        }

        const cat = new Cat();
        const dog = new Dog();
        console.log(`cat is instanceof Animal = ${cat instanceof Animal}`);
        console.log(`cat is instanceof Dog = ${cat instanceof Dog}`);
        console.log(`cat is instanceof Cat = ${cat instanceof Cat}`);
        cat.walk();
        dog.walk();
    }

    testBasic();
}
