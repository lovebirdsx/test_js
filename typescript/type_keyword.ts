class TestTypeKeyword {
    static testBasic() {
        type Second = number;
        const a: Second = 1;
        console.log(a);

        type Foo = number | string | undefined;
        let f: Foo = 1;
        f = 'wahaha';
        f = undefined;
        // f = null; // 此句会报错
        console.log(f);

        type User = {
            name: string
            age: number
        }
        const user: User = {
            name: 'hello',
            age: 12,
        };
        console.log(user);
    }

    static testExtendsAndImplement() {
        interface Foo {
            name: string;
        }
        interface Bar extends Foo {
            age: number;
        }
        const bar: Bar = { name: 'lovebird', age: 18 };
        console.log(bar);

        type Foo1 = Foo;
        type Bar1 = Foo1 & {
            age: number
        }
        const bar2: Bar1 = { name: 'hello', age: 20 };
        console.log(bar2);
    }

    static testInterfaceMultipleDefine() {
        interface Foo {
            name: string
        }

        // eslint-disable-next-line no-redeclare
        interface Foo {
            age: number;
        }

        const foo: Foo = { name: 'lovebird', age: 18 };
        console.log(foo);
    }

    static testMapType() {
        type Keys = 'name' | 'sex';
        type Keys2 = {
            // eslint-disable-next-line no-unused-vars
            [key in Keys] : string
        }
        const k1: Keys = 'name';
        const k2: Keys2 = { name: 'lovebird', sex: 'male' };
        console.log(k1, k2);

        type Place = 'Guangzhou' | 'Beijin' | 'Shanghai' | 'Hangzhou';
        const place: Place = 'Beijin';
        console.log(place, typeof place);

        // eslint-disable-next-line no-unused-vars
        type Callback = (name: string) => void;
        const cb: Callback = (name: string) => console.log(name);
        cb('lovebird');
    }

    static run() {
        TestTypeKeyword.testBasic();
        TestTypeKeyword.testExtendsAndImplement();
        TestTypeKeyword.testInterfaceMultipleDefine();
        TestTypeKeyword.testMapType();
    }
}

TestTypeKeyword.run();
