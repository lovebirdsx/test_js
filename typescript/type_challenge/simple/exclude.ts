import { Expect, Equal } from '../utils';

// 注意T是联合类型
type MyExclude<T, U> = T extends U ? never : T;

type Case1 = MyExclude<'a' | 'b' | 'c', 'a' | 'b'>;

// 此处返回的never
type Case2 = MyExclude<{a: 1, b:2, c: 3}, {a: 1}>;

type cases = [
    Expect<
        Equal<MyExclude<'a' | 'b' | 'c', 'a'>, Exclude<'a' | 'b' | 'c', 'a'>>
    >,
    Expect<
        Equal<
            MyExclude<'a' | 'b' | 'c', 'a' | 'b'>,
            Exclude<'a' | 'b' | 'c', 'a' | 'b'>
        >
    >,
    Expect<
        Equal<
            MyExclude<string | number | (() => void), Function>,
            Exclude<string | number | (() => void), Function>
        >
    >
];
