import { ExpectNot, Equal, Expect } from "./utils";

type Cases = [
    ExpectNot<Equal<1, 2>>,
    Expect<Equal<'A', 'A'>>,
]

interface A {
    name: string;
}

interface B {
    id: number;
}


type C = A & B;

const a = { name: '' };
type D = typeof a;

type Result<T> = T extends (...args: unknown[]) => infer R ? R : never;
type R1 = Result<() => string>;
type R2 = Result<number>;

// type T1 = 'a' | 'b';
// type T2 = 'b' | 'c';
// type T3 = T1 | T2;  // 'a' | 'b' | 'c'

// interface T1 {
//     name: string;
// }

// interface T2 {
//     id: number;
// }

// type T3 = T1 | T2; // { name: string } | { id: number }

interface NamedItem {
    name: string;
    id: number;
}

interface Person {
    name: string;
    age: number;
    id: string;
}

// type T3 = NamedItem & Person;
const t3: T3 = {
    name: 'name',
    age: 12,
    id: undefined as never,
}

type T3 = {
    name: string;
    age: number;
    id: never;
}

type T5 = keyof(T3)

function double(x: number | string): number | string {
    if (typeof x === 'number') {
        return 2 *x;
    }
    return (2 * Number(x)).toString();
}

type Square = {
    type: 'square',
    size: number;
};
  
type Rectangle = {
    type: 'rectangle'
    width: number;
    height: number;
};

type Shape = Square | Rectangle;

function area(shape: Shape) {
    switch (shape.type) {
        case 'square':
            return shape.size * shape.size;
        case 'rectangle':
            return shape.width * shape.height;
    }
}

type GreetName = 'hello' | 'hi';

function greet(name: GreetName) {
    return `hello, ${name}!`;
}

greet('hello'); // Ok.
greet('hi'); // Ok.

const ident = (x: unknown) => x; // 值
type Ident<T> = T; // 类型

const pair = (x: unknown, y: unknown) => [x, y]; // 值
type Pair<T, U> = [T, U]; // 类型

interface Foo {
    x: number;
    y: number;
}

type Foo1 = Partial<Foo>

interface PartialFoo {
    x?: number;
    y?: number;
}
