/**
 * Promise.all https://tsch.js.org/20/zh-CN
 * 解答：https://tsch.js.org/20/solutions
 */

import { Expect, Equal } from '../utils';

// readonly [...T] 表示给数组类型的T加入readonly的前缀
// Promise<infer R> R可以表示Promise中的参数
declare function PromiseAll<T extends unknown[]>(values: readonly [...T]): Promise<{[K in keyof T]: T[K] extends Promise<infer R> ? R: T[K]}>;

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);

type cases = [
    Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
    Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
    Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>
];
