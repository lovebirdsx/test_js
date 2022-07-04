/**
 * 实现 Omit https://tsch.js.org/3/zh-CN
 * 解答：https://tsch.js.org/3/solutions
 */

import { Expect, Equal } from '../utils';

type MyExclude<T, U> = T extends U ? never : T;
type MyOmit<T, K extends keyof T> = {[key in MyExclude<keyof T, K>]: T[key];}

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

type cases = [
    Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
    Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  ]

  // @ts-expect-error
  type error = MyOmit<Todo, 'description' | 'invalid'>
