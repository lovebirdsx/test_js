/**
 * Replace https://tsch.js.org/116
 * solutions: https://tsch.js.org/116/solutions
 */

import { Expect, Equal } from '../utils';

type Replace<S extends string, From extends string, To extends string> = S extends `${infer Start}${From}${infer End}` ?
    (From extends '' ? S : `${Start}${To}${End}`)
    : S;

type cases = [
    Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
    Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
    Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
    Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
    Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
    Expect<Equal<Replace<'', '', ''>, ''>>
];
