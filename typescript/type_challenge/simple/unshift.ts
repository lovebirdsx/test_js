/**
 * https://tsch.js.org/3060/zh-CN
 * 解答：https://tsch.js.org/3060/solutions
 */

import { Expect, Equal } from '../utils';

type Unshift<T extends unknown[], U> = [U, ...T]

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]
