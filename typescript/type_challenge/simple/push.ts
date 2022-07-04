import { Expect, Equal } from '../utils';

/**
 * 在 Github 上查看：https://tsch.js.org/3057/zh-CN
 * 查看解答：https://tsch.js.org/3057/solutions
 */

// 主要考察在[]中使用...
type Push<T extends unknown[], U> = [...T, U]

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]
