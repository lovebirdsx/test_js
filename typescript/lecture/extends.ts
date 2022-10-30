import { Equal, Expect, ExpectNot, Extends } from "./utils";

type ToArray1<T> = T extends any ? T[] : never;
type ToArray2<T> = [T] extends any ? T[] : never;

type Cases = [
    // 注意下面两者的差别，后者泛型会做分发
    Expect<Equal<'X' | 'Y' extends 'X' ? true : false, false>>,
    Expect<Equal<Extends<('X' | 'Y'), 'X'>, boolean>>,

    // 参考：https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
    Expect<Equal<ToArray1<number>, number[]>>,
    // 分发了
    Expect<Equal<ToArray1<number | string>, number[] | string[]>>,
    // 避免分发
    Expect<Equal<ToArray2<number | string>, (number | string)[]>>,

    Expect<Equal<Extends<'X', 'X' | 'Y'>, true>>,
    Expect<Equal<'X' extends 'X' | 'Y' ? true : false, true>>,
    Expect<Equal<Extends<'A', 'X' | 'Y'>, false>>,
]