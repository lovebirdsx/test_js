/**
 * 最后一个元素 https://tsch.js.org/15/zh-CN
 * 解答：https://tsch.js.org/15/solutions
 */

import { Expect, Equal } from '../utils';

type Last<T extends unknown[]> = T['length'] extends 1 ?
    T[0] :
    T extends [infer First, ... infer Rest] ? Last<Rest> : never;

type cases = [
    Expect<Equal<Last<[]>, never>>,
    Expect<Equal<Last<[3, 2, 1]>, 1>>,
    Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];
