/**
 * 出堆 https://tsch.js.org/16/zh-CN
 * 解答：https://tsch.js.org/16/solutions
 */

import { Expect, Equal } from '../utils';

type Pop<T extends any[]> = T extends [infer R, ...infer E] ?
    (E['length'] extends 1 ? [R] : [R, ...Pop<E>])
    : [];

type cases = [
    Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
    Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>
];
