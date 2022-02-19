/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
import 'reflect-metadata';
import { jsonMember, jsonObject, TypedJSON } from 'typedjson';

class TestSerialize {
    static testBasic() {
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

    static testExtend() {
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

    static testExtend2() {
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

    static testFilter() {
        const foo = {
            id: 1,
            name: 'Hello',
        };
        console.log('testFilter', JSON.stringify(foo, ['name']));
    }

    static deepEqual(a: any, b: any) {
        for (const key in a) {
            if (Object.prototype.hasOwnProperty.call(a, key)) {
                const va = a[key];
                const vb = b[key];
                if (vb === undefined) {
                    console.log('1', key, va);
                    return false;
                }

                const vaType = typeof va;
                const vbType = typeof vb;
                if (vaType !== vbType) {
                    console.log('2', vaType, vbType);
                    return false;
                }

                if (vaType === 'object') {
                    if (!this.deepEqual(va, vb)) {
                        return false;
                    }
                } else if (va !== vb) {
                    console.log('3', va, vb);
                    return false;
                }
            }
        }

        return true;
    }

    static mergeDeep(obj1: any, obj2: any) {
        for (const key in obj2) {
            if (Object.prototype.hasOwnProperty.call(obj2, key)) {
                const v2 = obj2[key];
                if (typeof v2 === 'object') {
                    if (!obj1[key]) {
                        obj1[key] = {};
                    }
                    obj1[key] = TestSerialize.mergeDeep(obj1[key], obj2[key]);
                } else {
                    obj1[key] = obj2[key];
                }
            }
        }
        return obj1;
    }

    static testFilterByName() {
        const data = {
            id: 1,
            name: 'lovebird',
            _fold: false,
            flow: {
                name: 'foo',
                _fold: true,
                _bar: {
                    _name: '_bar',
                },
                baz: {
                    name: '_baz',
                    _fold: true,
                },
            },
        };

        console.log('data', data);

        const configStr = JSON.stringify(data, (key, value) => {
            if (typeof key === 'string' && key[0] === '_') {
                return undefined;
            }
            return value;
        }, 2);

        const stateStr = JSON.stringify(data, (key, value) => {
            if (typeof key === 'string' && key.length > 0 && key[0] !== '_' && typeof value !== 'object') {
                return undefined;
            }
            return value;
        }, 2);

        const config = JSON.parse(configStr);
        console.log('config', config);

        const state = JSON.parse(stateStr);
        console.log('state', state);

        const data2 = TestSerialize.mergeDeep(TestSerialize.mergeDeep({}, config), state);
        console.log('data2', data2);
        if (!TestSerialize.deepEqual(data, data2)) {
            console.log('data1 !== data2');
        }
    }

    static Main() {
        TestSerialize.testBasic();
        TestSerialize.testExtend();
        TestSerialize.testExtend2();
        TestSerialize.testFilter();
        TestSerialize.testFilterByName();
    }
}

TestSerialize.Main();
