/* eslint-disable max-classes-per-file */
import 'reflect-metadata';
import { jsonMember, jsonObject, TypedJSON } from 'typedjson';

class TestSerialize {
    static TestBasic() {
        class Animal {
            name: string;
            leg: number;

            constructor(name: string, leg: number) {
                this.name = name;
                this.leg = leg;
            }
        }

        const a1 = new Animal('Cat', 4);
        const jsonStr = JSON.stringify(a1);
        const a2:Animal = JSON.parse(jsonStr);
        console.log(a1);
        console.log(a2);
    }

    static TestExtend() {
        class Animal {
            name: string;
            constructor(name: string) {
                this.name = name;
            }

            halk() {
                console.log(`this is ${this.name} halk`);
            }
        }

        class Cat extends Animal {
            leg: number;

            constructor(leg:number) {
                super('Cat');
                this.leg = leg;
            }

            halk(): void {
                super.halk();
                console.log(`I have ${this.leg} legs`);
            }
        }

        const cat = new Cat(4);
        const jsonStr = JSON.stringify(cat);
        const animal: Animal = JSON.parse(jsonStr);
        console.log('cat', cat);
        console.log('jsonStr', jsonStr);
        cat.halk();
        console.log(animal);
        // animal.halk(); 此处会报错,不能反序列化函数

        const animal2 = new Animal('Dog');
        Object.assign(animal2, JSON.parse(jsonStr));
        animal2.halk();
    }

    static TestExtend2() {
        @jsonObject
        class Animal {
            @jsonMember
            name: string;

            constructor(name: string) {
                this.name = name;
            }

            halk() {
                console.log(`this is ${this.name} halk`);
            }
        }

        @jsonObject
        class Cat extends Animal {
            @jsonMember
            leg: number;

            constructor(leg:number) {
                super('Cat');
                this.leg = leg;
            }

            halk(): void {
                super.halk();
                console.log(`I have ${this.leg} legs`);
            }
        }

        const cat = new Cat(4);
        const jsonStr = JSON.stringify(cat);
        const animal = TypedJSON.parse(jsonStr, Animal);
        console.log(animal);
        animal?.halk();
    }

    static Main() {
        TestSerialize.TestBasic();
        TestSerialize.TestExtend();
        TestSerialize.TestExtend2();
    }
}

TestSerialize.Main();
