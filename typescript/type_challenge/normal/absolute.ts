/**
 * Absolute https://tsch.js.org/529
 * solutions: https://tsch.js.org/529/solutions
 */

import { Expect, Equal } from '../utils';

// 关键点在 `${T}` 表示将T转换成字符串
type Absolute<T extends number | string | bigint> = `${T}` extends `${'-'}${infer N}` ? `${N}` : `${T}`;

type cases = [
    Expect<Equal<Absolute<0>, '0'>>,
    Expect<Equal<Absolute<-0>, '0'>>,
    Expect<Equal<Absolute<10>, '10'>>,
    Expect<Equal<Absolute<-5>, '5'>>,
    Expect<Equal<Absolute<'0'>, '0'>>,
    Expect<Equal<Absolute<'-0'>, '0'>>,
    Expect<Equal<Absolute<'10'>, '10'>>,
    Expect<Equal<Absolute<'-5'>, '5'>>,
    Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
    Expect<Equal<Absolute<9_999n>, '9999'>>
];
