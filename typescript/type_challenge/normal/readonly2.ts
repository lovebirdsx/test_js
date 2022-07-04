/**
 * Readonly https://tsch.js.org/8/zh-CN
 * 解答：https://tsch.js.org/8/solutions
 */

import { Alike, Expect } from '../utils';

// -readonly
// & 可以对已有字段进行修改
// as 可以对已映射的字段进行引用
type MyReadonly2<T, K extends keyof T = keyof T> = {
    readonly [Key in keyof T]: T[Key];
} & { -readonly [Key in keyof T as Key extends K ? never : Key]: T[Key] };

interface Todo1 {
    title: string;
    description?: string;
    completed: boolean;
}

interface Todo2 {
    readonly title: string;
    description?: string;
    completed: boolean;
}

interface Expected {
    readonly title: string;
    readonly description?: string;
    completed: boolean;
}

type cases = [
    Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
    Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
    Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>
];
