/**
 * Trim https://tsch.js.org/108
 * solutions: https://tsch.js.org/108/solutions
 */

import { Expect, Equal } from '../utils';

// 关键在于 S extends `${infer R}${Space}`
type Space = ' ' | '\n' | '\t';

type Trim<S extends string> =
    S extends `${Space}${infer R}` ? Trim<R> : (S extends `${infer R}${Space}` ? Trim<R>: S);

type Case1 = Trim<'str   '>;

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]
