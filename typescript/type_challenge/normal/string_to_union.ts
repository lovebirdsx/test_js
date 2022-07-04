/**
 * String to Union https://tsch.js.org/531
 * solutions: https://tsch.js.org/531/solutions
 */

import { Expect, Equal } from '../utils';

type StringToUnion<T extends string> = T extends `${infer R}${infer E}` ? R | StringToUnion<E> : never;

type cases = [
    Expect<Equal<StringToUnion<''>, never>>,
    Expect<Equal<StringToUnion<'t'>, 't'>>,
    Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
    Expect<
        Equal<
            StringToUnion<'coronavirus'>,
            'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'
        >
    >
];
