/**
 * StartsWith https://tsch.js.org/2688/zh-CN
 * 解答：https://tsch.js.org/2688/solutions
 */

import { Expect, Equal } from '../utils';

type StartsWith<T extends string, U extends string> = T extends `${U}${infer _}` ? true : false;

type cases = [
    Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
    Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
    Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
    Expect<Equal<StartsWith<'abc', ''>, true>>,
    Expect<Equal<StartsWith<'abc', ' '>, false>>
];
