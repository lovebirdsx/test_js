/**
 * 元组转合集 https://tsch.js.org/10/zh-CN
 * 解答：https://tsch.js.org/10/solutions
 */

import { Expect, Equal } from '../utils';

type TupleToUnion<T extends unknown[]> = T extends [infer First, ... infer Rest] ? First | TupleToUnion<Rest> : never;

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]
