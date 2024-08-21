/**
 * Drop Char https://tsch.js.org/2070/zh-CN
 * 解答：https://tsch.js.org/2070/solutions
 */

import { Expect, Equal } from '../utils';

type DropChar<S, C extends string = ' '> = S extends `${infer R}${infer E}` ?
    (R extends C ? DropChar<E, C> : `${R}${DropChar<E, C>}`) :
    '';

type cases = [
    // @ts-expect-error
    Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
    Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
    Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
    Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
    Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
    Expect<
        Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>
    >,
    Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>
];
