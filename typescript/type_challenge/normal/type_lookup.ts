/**
 * Type Lookup https://tsch.js.org/62/zh-CN
 * 解答：https://tsch.js.org/62/solutions
 */

import { Expect, Equal } from '../utils';

type LookUp<U extends {type: string}, T extends U['type']> = U extends {type: T} ? U : never;

interface Cat {
    type: 'cat';
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
    type: 'dog';
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
    color: 'brown' | 'white' | 'black';
}

type Animal = Cat | Dog;

type cases = [
    Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
    Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
    // @ts-expect-error
    Expect<Equal<LookUp<Animal, 'duck'>, never>>,
];
