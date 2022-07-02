/* eslint-disable no-redeclare */
/* eslint-disable dot-notation */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
function TestEnum() {
    function testBasic() {
        enum Days {
            Sun,
            Mon,
            Tue,
            Wed,
            Thu,
            Fri,
            Sat,
        }
        console.log(Days.Sun);
        console.log(Days.Mon);
        console.log(Days[0]);
    }

    function testConst() {
        const enum Goo {
            Foo,
            Bar,
            Car
        }
        console.log(Goo.Foo);
        console.log(Goo.Bar);
        console.log(Goo.Car);
    }

    function getEnumNames(e: any) {
        return Object.keys(e).filter((e) => Number.isNaN(parseInt(e, 10)));
    }

    function testMeta() {
        enum A {Foo, Bar, Car}
        enum B {Foo = 'Foo1', Bar = 'Bar1', Car = 'Car1'}
        console.log(getEnumNames(A));
        console.log(getEnumNames(B));

        const enumConfig = {
            A: 'foo',
            B: 'bar',
        };

        console.log(Array.from(Object.keys(enumConfig)));
        console.log(Array.from(Object.values(enumConfig)));
    }

    function testName() {
        enum Foo {
            A = 'NameA',
            B = 'NameB',
        }

        console.log(Foo['A']);
        console.log(Foo['B']);
    }

    function testEnumValue() {
        enum Foo {
            A = 1,
            B = 'hello',
        }

        const enum FooConst {
            A = 1,
            B = 'hello',
        }

        // 编译出来的js有差别
        // 这里的Foo是一个对象
        console.log(Foo.A, Foo.B);

        // 这里的FooConst直接转译成对应的值 1 /* A */ 'hello' /* B */
        console.log(FooConst.A, FooConst.B);

        interface IFoo<T extends Record<string, number | string>> {
            names: {[K in keyof T]: string};
            values: {[K in T[keyof T]]: string};
        }

        const foo: IFoo<typeof FooConst> = {
            names: {
                A: 'Option A',
                B: 'Option B',
            },
            values: {
                1: 'Option A',
                hello: 'Option hello',
            },
        };

        console.log(foo);
    }

    console.log('testBasic ==================');
    testBasic();
    console.log('testConst ==================');
    testConst();
    console.log('testMeta ==================');
    testMeta();
    console.log('testName ==================');
    testName();
    console.log('testEnumValue ==================');
    testEnumValue();
}

TestEnum();

class FooClass<T extends Record<string, number | string>> {
    nameByValue: {
        [K in T[keyof T]]: string;
    } | undefined;

    // 注意此处需要用 T[keyof T] 表示value的类型
    // 如果使用 number | string, 编译器会报错
    public getName(value: T[keyof T]): string {
        if (!this.nameByValue) {
            return 'unknown';
        }
        return this.nameByValue[value];
    }
}

// 通过命名空间给枚举添加静态方法
enum WeekDay { Mon, Tue, Wed, Thu, Fri, Sat, Sun }

namespace WeekDay {
    export function IsWeekEnd(day: WeekDay) {
        switch (day) {
            case WeekDay.Sat:
            case WeekDay.Sun:
                return true;
            default:
                return false;
        }
    }
}

console.log(WeekDay.IsWeekEnd(WeekDay.Sat));
console.log(WeekDay.IsWeekEnd(WeekDay.Mon));
