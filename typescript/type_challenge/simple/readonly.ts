import { Expect, Equal } from '../utils';

type MyReadonly<T> = {readonly [key in keyof T]: T[key]}

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type cases = [
    Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]
