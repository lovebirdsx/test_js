module discriminator {
    function testBasic() {
        // 注意 AnimalType 只能用enum来定义,ts才能识别
        // eslint-disable-next-line no-shadow
        enum AnimalType {Dog, Cat}

        interface Dog {
            type: AnimalType.Dog;
            name: string;
            leg: number;
        }

        interface Cat {
            type: AnimalType.Cat;
            name: string;
            walk() : void;
        }

        const dog: Dog = {
            type: AnimalType.Dog,
            name: 'John',
            leg: 4,
        };

        const cat: Cat = {
            type: AnimalType.Cat,
            name: 'Kitty',
            walk() {
                console.log(`this is ${this.name} walk`);
            },
        };

        function testAnimal(animal: Dog | Cat) {
            switch (animal.type) {
                case AnimalType.Dog:
                    console.log(animal.leg);
                    break;
                case AnimalType.Cat:
                    animal.walk();
                    break;
                default:
                    break;
            }
        }

        testAnimal(cat);
        testAnimal(dog);
    }

    testBasic();
}
