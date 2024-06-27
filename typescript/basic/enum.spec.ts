function getEnumNames(e: any) {
    return Object.keys(e).filter((e) => Number.isNaN(parseInt(e, 10)));
}

describe('Enum', () => {
    it('basic', () => {
        enum Days {
            Sun,
            Mon,
            Tue,
            Wed,
            Thu,
            Fri,
            Sat,
        }
        expect(Days.Sun).toBe(0);
        expect(Days.Mon).toBe(1);
        expect(Days[0]).toBe('Sun');
    });

    it('const', () => {
        const enum Goo {
            Foo,
            Bar,
            Car
        }
        expect(Goo.Foo).toBe(0);
        expect(Goo.Bar).toBe(1);
        expect(Goo.Car).toBe(2);
    });

    it('meta', () => {
        enum A {Foo, Bar, Car}
        enum B {Foo = 'Foo1', Bar = 'Bar1', Car = 'Car1'}

        expect(getEnumNames(A)).toEqual(['Foo', 'Bar', 'Car']);
        expect(getEnumNames(B)).toEqual(['Foo', 'Bar', 'Car']);

        const enumConfig = {
            A: 'foo',
            B: 'bar',
        };

        expect(Array.from(Object.keys(enumConfig))).toEqual(['A', 'B']);
        expect(Array.from(Object.values(enumConfig))).toEqual(['foo', 'bar']);
    });

    it('enumValue', () => {
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
        expect(Foo.A).toBe(1);
        expect(Foo.B).toBe('hello');

        // 这里的FooConst直接转译成对应的值 1 /* A */ 'hello' /* B */
        expect(FooConst.A).toBe(1);
        expect(FooConst.B).toBe('hello');
    });

    function getEnumKeyByValue<T>(enumObj: T, value: string | number): string {
        if (typeof enumObj !== 'object' || enumObj === null) {
            throw new Error('enumObj must be an object');
        }

        const keys = Object.keys(enumObj) as (keyof T)[];
        const key = keys.find((k) => enumObj[k] === value);
        return key as string;
    }

    it('get value by key', () => {
        enum NumberEnum {
            A = 1,
            B = 2,
        }

        const key = 'A';
        expect(NumberEnum[key]).toBe(1);
        expect(NumberEnum[1]).toBe('A');

        enum StringEnum {
            A = 'hello',
            B = 'world',
            C = 1,
        }

        expect(getEnumKeyByValue(StringEnum, 'hello')).toBe('A');
        expect(getEnumKeyByValue(StringEnum, 'world')).toBe('B');
        expect(getEnumKeyByValue(StringEnum, 1)).toBe('C');
    });
});
