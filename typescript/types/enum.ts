/* eslint-disable no-shadow */
function testEnumType() {
    function testEnum() {
        const keys = ['foo', 'bar', 'car'] as const;
        type A = typeof keys[number];

        const callbacks = {
            foo(p1: string) {
                console.log('foo', p1);
            },
            bar(p1: boolean) {
                console.log('bar', p1);
            },
            car(p1: number, p2: number) {
                console.log('car', p1, p2);
            },
        };

        type Callbacks = typeof callbacks;
        type Func = (...args: any[]) => void;

        function Call<T extends A>(a:T, ...args:Parameters<Callbacks[T]>) {
            const fun = callbacks[a] as Func;
            fun(...args);
        }

        Call('foo', 'hello');
        Call('bar', true);
        Call('car', 100, 200);
    }

    function testEnum2() {
        const objectFilterConfig = {
            flowList: 0,
            level: 1,
            talk: 2,
        };

        type ObjectFilter = keyof typeof objectFilterConfig;
        const allObjectFilter = Object.keys(objectFilterConfig) as ObjectFilter[];
        const type1: ObjectFilter = 'flowList';
        console.log(testEnum2.name, allObjectFilter.join(','));
    }

    function getEnumValues(enumType: Record<number, string>): number[] {
        const valueNames = Object.keys(enumType).filter((item) => !Number.isNaN(Number(item)));
        return valueNames.map((name) => Number(name));
    }

    function getEnumNames(enumType: Record<number, string>): string[] {
        const names = Object.keys(enumType).filter((item) => Number.isNaN(Number(item)));
        return names;
    }

    function testEnum3() {
        enum ObjectFilter {
            flowList,
            level,
            talk,
        }

        const allObjectFilterNames = getEnumNames(ObjectFilter);
        const allObjectFilters = getEnumValues(ObjectFilter);

        console.log(testEnum3.name, ObjectFilter[ObjectFilter.flowList], ObjectFilter.flowList);
        console.log(testEnum3.name, 'names', allObjectFilterNames.join(','));
        console.log(testEnum3.name, 'values', allObjectFilters.join(','));
    }

    testEnum();
    testEnum2();
    testEnum3();
}

testEnumType();
