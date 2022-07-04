/**
 * 可串联构造器 https://tsch.js.org/12/zh-CN
 * 解答：https://tsch.js.org/12/solutions
 * 详细解答: https://ghaiklor.github.io/type-challenges-solutions/en/medium-chainable-options.html
 */

import { Expect, Alike } from '../utils';

type Chainable<O = {}> = {
    option<K extends string, V>(key: (K extends keyof O ? never: K), value: V): Chainable<O & {[_ in K]: V}>;
    get(): O;
};

declare const a: Chainable;

const result1 = a
    .option('foo', 123)
    .option('bar', { value: 'Hello World' })
    .option('name', 'type-challenges')
    .get();

const result2 = a
    .option('name', 'another name')
    // @ts-expect-error
    .option('name', 'last name')
    .get();

type Expected1 = {
    foo: number;
    bar: {
        value: string;
    };
    name: string;
};

type Expected2 = {
    name: string;
};

type cases = [
    Expect<Alike<typeof result1, Expected1>>,
    Expect<Alike<typeof result2, Expected2>>
];
