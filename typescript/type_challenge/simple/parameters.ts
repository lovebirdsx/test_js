/**
 * https://tsch.js.org/3312/zh-CN
 * 解答：https://tsch.js.org/3312/solutions
 */

import { Equal, Expect } from '../utils';

// 考察infer的使用
type MyParameters<T extends (...args: any[]) => any> =
    T extends (...args: infer Args) => any ? Args : never;

const foo = (arg1: string, arg2: number): void => {};
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {};
const baz = (): void => {};

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]
