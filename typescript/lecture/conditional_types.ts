import { Equal, Expect } from "./utils";

type TypeName<T> = 
    T extends string ? 'string' :
    T extends number ? 'number' :
    T extends boolean ? 'boolean' :
    T extends undefined ? 'undefined':
    T extends Function ? 'function' :
    T extends bigint ? 'bigint' :
    'object';

type Cases = [
    Expect<Equal<TypeName<string>, 'string'>>,
    Expect<Equal<TypeName<bigint>, 'bigint'>>,
    Expect<Equal<TypeName<() => string>, 'function'>>,
    Expect<Equal<TypeName<string[]>, 'object'>>,
    Expect<Equal<TypeName<number | string | undefined>, 'number' | 'string' | 'undefined'>>,
]

interface Thing {
    a: number;
    b: string;
    
    foo(s: string): void;
    foo(s: number): void;
}

const thing: Thing = {
    a: 1,
    b: 'hello',
    foo(s: string | number): void {
        if (typeof s === 'string') {
            console.log('string', s);
        } else {
            console.log('number', s);
        }
    }
}

thing.foo('hello');
thing.foo(88);
