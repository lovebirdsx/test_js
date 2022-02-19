/* eslint-disable no-shadow */
/* eslint-disable max-len */
function testMyFunctions() {
    // 条件判断
    function condition() {
        // 是否继承
        type r1 = 'car' extends 'car' & 'plane' ? true : false;
        type r2 = 'car' & 'plane' extends 'car' ? true : false;
        type r3 = 'car' | 'plane' extends 'car' & 'plane' ? true : false;
        type r4 = 'car' & 'plane' extends 'car' | 'plane' ? true : false;
        type r5 = 'car' extends 'car' | 'plane' ? true : false;
        type r6 = 'plane' & 'car' extends 'car' & 'plane' ? true : false;
        type r7 = {name: string} extends {name: string} ? true : false;
        type r8 = {name: string, id: number} extends {name: string} ? true : false;
        type r9 = {name: string} extends {name: string, id: number} ? true : false;
        type r10 = [1, 2] extends [1] ? true : false;
        type r11 = [1] extends [1, 2] ? true : false;
        type r12 = [1, 2] extends [1, 2] ? true : false;

        // 是否包含字段
        type GetValueType<T, K extends string> = T extends {[key in K]: any} ? T[K] : never;
        type vt1 = GetValueType<{name: string, id: number}, 'name'> // string
        type vt2 = GetValueType<{name: string, id: number}, 'ids'> // never

        interface Action {
            name: string;
            params: {
                id: number;
            }
        }
        type pt = GetValueType<Action, 'params'>

        // 获得最后1个
        type GetLast<T extends any[]> = T extends [...any[], infer R] ? R : never;
        type l1 = GetLast<[1, 2, 3]>

        // 获得字段个数
        type GetLen<T extends any[]> = T extends any ? T['length'] : never;
        type len = GetLen<[1, 2, 3, 4]>
    }

    // 递归调用
    function recursion() {
        type Combine<T, U> = [T, U]
        type C = Combine<'foo', 'bar'>
        type C1 = [keyof C]
        type D = C['length']

        type GetLast<T extends any[]> = T extends [...any[], infer R] ? R : never;
        type Map<T extends any[]> = T extends [...infer Args, infer Last] ? [Last, ...Map<Args>] : never;
        type l = Map<[1, 2, 3, 4]>
    }

    function testA() {
        type Foo = {name: string, id: number};
        type ValueType<T> = T extends {[K: string] : infer R} ? R : never;
        type FooV = ValueType<Foo>;
    }

    // 官方示例
    function officialSample() {
        const data = {
            name: 'lovebird',
            email: 'lovebird@love.com',
            age: 18,
        };

        type PropEventSouce<T> = {
            data: T,
            on<Key extends string & keyof T>(eventName: `${Key}Changed`, callback: (value: T[Key]) => void) : void;
        };

        type PropEventEnv<T> = {
            register<Key extends string & keyof T>(eventName: `${Key}Changed`, callback: (value: T[Key]) => void) : void
            fire<Key extends string & keyof T>(eventName: `${Key}Changed`, value: T[Key]): void;
        }

        type EventCallback = (value: any) => void;
        function createEnv<T>(data:T) : PropEventEnv<T> {
            class Env implements PropEventEnv<T> {
                callbacks = new Map<string, EventCallback>();

                register(eventName: string, cb: EventCallback) {
                    this.callbacks.set(eventName, cb);
                }

                fire(eventName: string, value: any): void {
                    const cb = this.callbacks.get(eventName);
                    if (cb) {
                        cb(value);
                    }
                }
            }
            return new Env();
        }

        const env = createEnv(data);

        function declareCallback<T>(data:T) : PropEventSouce<T> {
            class Callback implements PropEventSouce<T> {
                data = data;
                on(eventName: any, callback: (value: any) => void): void {
                    env.register(eventName, callback);
                }
            }

            return new Callback();
        }

        const person = declareCallback(data);
        person.on('emailChanged', (email) => {
            console.log('emailChanged', person.data.email, email);
        });
        person.on('nameChanged', (name) => {
            console.log('nameChanged', person.data.name, name);
        });
        person.on('ageChanged', (age) => {
            console.log('ageChanged', person.data.age, age);
        });

        env.fire('ageChanged', 18);
        env.fire('nameChanged', 'firebird');
        env.fire('emailChanged', 'hell@world.com');
    }

    officialSample();
}

testMyFunctions();
