/**
 * EndsWith https://tsch.js.org/2693/zh-CN
 * 解答：https://tsch.js.org/2693/solutions
 */

import { Expect, Equal } from '../utils';

type EndsWith<T extends string, U extends string> = T extends U ? true :
    T extends `${infer _}${infer E}` ?
        (E extends U ? true: EndsWith<E, U>) :
        false;

type cases = [
    Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
    Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
    Expect<Equal<EndsWith<'abc', 'd'>, false>>
];
