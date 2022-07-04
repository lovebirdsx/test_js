/**
 * Trim Left https://tsch.js.org/106
 * 答案: https://tsch.js.org/106/solutions
 */

import { Expect, Equal } from '../utils';

type TrimLeft<S extends string> = S extends `${infer Start}${infer End}` ?
    (Start extends ' ' | '\n' | '\t' ? TrimLeft<End> : S)
    : '';

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]
