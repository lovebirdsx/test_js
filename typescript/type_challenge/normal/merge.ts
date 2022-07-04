/**
 * Merge https://tsch.js.org/599
 * solutions: https://tsch.js.org/599/solutions
 */

import { Expect, Equal } from '../utils';

// 关键点在 K in keyof (F & S)
type Merge<F, S> = {[K in keyof (F & S)] : K extends keyof S ? S[K] : K extends keyof F ? F[K] : never};

type Foo = {
    a: number;
    b: string;
};

type Bar = {
    b: number;
    c: boolean;
};

type Case1 = Merge<Foo, Bar>;

type cases = [
    Expect<
        Equal<
            Merge<Foo, Bar>,
            {
                a: number;
                b: number;
                c: boolean;
            }
        >
    >
];
