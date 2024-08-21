/**
 * Length of String https://tsch.js.org/298
 * solutions: https://tsch.js.org/298/solutions
 */

import { Expect, Equal } from '../utils';

type StringToTupples<S extends string> = S extends `${infer R}${infer End}` ? [R, ...StringToTupples<End>]: [];
type LengthOfString<S extends string> = StringToTupples<S>['length'];

type cases = [
    Expect<Equal<LengthOfString<''>, 0>>,
    Expect<Equal<LengthOfString<'kumiko'>, 6>>,
    Expect<Equal<LengthOfString<'reina'>, 5>>,
    Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
];
