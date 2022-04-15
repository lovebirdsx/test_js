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

    // 根据枚举类型来推测对应的类型1
    function testEnum4() {
        type ValueType1 = 'int' | 'string' | 'boolean'
        const resultMap = {
            int: 0,
            string: '',
            boolean: false,
        };
        type Value2<T extends ValueType1> = (typeof resultMap)[T]

        type Value<T extends ValueType1> = T extends 'int' ? number:
            T extends 'string' ? string :
            T extends 'boolean' ? boolean : undefined;

        // 两种类型推导都是可以的
        const intValue: Value<'int'> = 10;
        const intValue2: Value2<'int'> = 10;
        const stringValue: Value<'string'> = 'hello';
        const stringValue2: Value2<'string'> = 'hello';
        const boolValue: Value<'boolean'> = true;
        const boolValue2: Value2<'boolean'> = false;
    }

    // 根据枚举类型来推测对应的类型2
    function testEnum5() {
        const csvCellTypeConfig = {
            Int: 0,
            String: '',
            Boolean: false,
            Float: 0.0,
        };

        type TCsvCellType = keyof typeof csvCellTypeConfig;
        type TCsvValue<T extends TCsvCellType> = typeof csvCellTypeConfig[T];

        function parseCsvValue<T extends TCsvCellType>(stringValue: string, type: T): TCsvValue<T> {
            switch (type) {
                case 'Boolean':
                    return Boolean(stringValue) as TCsvValue<T>;
                case 'Float':
                    return parseFloat(stringValue) as TCsvValue<T>;
                case 'Int':
                    return parseInt(stringValue, 10) as TCsvValue<T>;
                case 'String':
                    return stringValue as TCsvValue<T>;
                default:
                    throw new Error(`Unknown type ${type}`);
            }
        }

        console.log('123.0', 'Int', parseCsvValue('123.0', 'Int'));
        console.log('123', 'Float', parseCsvValue('123', 'Float'));
        console.log('true', 'Boolean', parseCsvValue('true', 'Boolean'));
        console.log('string', 'String', parseCsvValue('string', 'String'));
    }

    // 根据枚举类型来推测对应的类型3
    function testEnum6() {
        type TCsvCellTypeSlot<T> = {
            Default: T,
            Prase: (str: string) => T,
            Desc: string,
        }

        const csvCellTypeConfig = {
            Int: {
                Default: 0,
                Prase: (str: string) => parseInt(str, 10),
                Desc: '整形',
            },
            String: {
                Default: '',
                Prase: (str: string) => str,
                Desc: '字符串',
            },
            Boolean: {
                Default: false,
                Prase: (str: string) => Boolean(str),
                Desc: '布尔型',
            },
            Float: {
                Default: 0.0,
                Prase: (str: string) => parseFloat(str),
                Desc: '浮点型',
            },
        };

        type TCsvCellType = keyof typeof csvCellTypeConfig;
        type TCsvValue<T extends TCsvCellType> = typeof csvCellTypeConfig[T]['Default'];

        function parseCsvValue<T extends TCsvCellType>(stringValue: string, type: T): TCsvValue<T> {
            const config = csvCellTypeConfig[type];
            return config.Prase(stringValue);
        }

        console.log('123.0', 'Int', parseCsvValue('123.0', 'Int'));
        console.log('123', 'Float', parseCsvValue('123', 'Float'));
        console.log('true', 'Boolean', parseCsvValue('true', 'Boolean'));
        console.log('string', 'String', parseCsvValue('string', 'String'));
    }

    testEnum();
    testEnum2();
    testEnum3();
    testEnum4();
    testEnum5();
    testEnum6();
}

testEnumType();
