/**
 * Remove Index Signature https://tsch.js.org/1367
 * solutions: https://tsch.js.org/1367/solutions
 */

import { Expect, Equal } from '../utils';

type RemoveIndexSignature<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: T[K]
};

type Foo = {
    [key: string]: any;
    foo(): void;
};

type Bar = {
    [key: number]: any;
    bar(): void;
    0: string;
};

const foobar = Symbol('foobar');
type FooBar = {
    [key: symbol]: any;
    [foobar](): void;
};

type Baz = {
    bar(): void;
    baz: string;
};

type cases = [
    Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
    Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
    Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
    Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>
];
