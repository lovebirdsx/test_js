import { Equal, Expect, ExpectNot } from "./utils";

interface Foo {
    name: string;
}

interface Bar {
    id: number;
}

interface FooBar {
    name: string;
    id: number;
}

type Combine<T, U> = { [K in (keyof T | keyof U)]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never}
type T = Combine<Foo, Bar>

const foobar = {
    name: '',
    id: 0,
}

type A = 'A' | 'C'
type B = 'B'
type C = 'C'
type D = 'D'

const t0 = { name: '', id: 0, extra: '' };
const t01: FooBar = t0;
const t02: Foo & Bar = t0;

const t1: Foo & Bar = { name: '', id: 0 };
const t2: FooBar = { name: '', id: 0 };
const t3 = { name: '', id: 0 };

type cases = [
    Expect<Equal<('A' | 'B') & 'B', 'B'>>,
    Expect<Equal<('A' | 'B') | 'B', 'A' | 'B'>>,
    Expect<Equal<Foo | never, Foo>>,
    Expect<Equal<Foo & never, never>>,
    Expect<Equal<(A | B) & (C | D), 'C'>>,
    Expect<Equal<keyof (Foo & Bar), 'name' | 'id'>>,
    ExpectNot<Equal<Foo & Bar, FooBar>>,
    Expect<Equal<Combine<Foo, Bar>, FooBar>>,
    ExpectNot<Equal<typeof t1, typeof t2>>,
    Expect<Equal<typeof t2, typeof t3>>,
]


