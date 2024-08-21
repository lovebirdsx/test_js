/**
 * Percentage Parser https://tsch.js.org/1978/zh-CN
 * https://tsch.js.org/1978/solutions
 */

import { Expect, Equal } from '../utils';

type Parse1<A extends string> = A extends `${infer R}${infer _}` ? R extends '+' | '-' ? R : '' : '';
type Parse3<A extends string> = A extends `${infer _}${'%'}` ? '%': '';
type Parse2<A extends string> = A extends `${Parse1<A>}${infer R}${Parse3<A>}` ? R : '';
type PercentageParser<A extends string> = [Parse1<A>, Parse2<A>, Parse3<A>];

type Case0 = ['', '', ''];
type Case1 = ['+', '', ''];
type Case2 = ['+', '1', ''];
type Case3 = ['+', '100', ''];
type Case4 = ['+', '100', '%'];
type Case5 = ['', '100', '%'];
type Case6 = ['-', '100', '%'];
type Case7 = ['-', '100', ''];
type Case8 = ['-', '1', ''];
type Case9 = ['', '', '%'];
type Case10 = ['', '1', ''];
type Case11 = ['', '100', ''];

type cases = [
    Expect<Equal<PercentageParser<''>, Case0>>,
    Expect<Equal<PercentageParser<'+'>, Case1>>,
    Expect<Equal<PercentageParser<'+1'>, Case2>>,
    Expect<Equal<PercentageParser<'+100'>, Case3>>,
    Expect<Equal<PercentageParser<'+100%'>, Case4>>,
    Expect<Equal<PercentageParser<'100%'>, Case5>>,
    Expect<Equal<PercentageParser<'-100%'>, Case6>>,
    Expect<Equal<PercentageParser<'-100'>, Case7>>,
    Expect<Equal<PercentageParser<'-1'>, Case8>>,
    Expect<Equal<PercentageParser<'%'>, Case9>>,
    Expect<Equal<PercentageParser<'1'>, Case10>>,
    Expect<Equal<PercentageParser<'100'>, Case11>>
];
