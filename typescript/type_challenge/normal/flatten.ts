/**
 * Flatten GitHub: https://tsch.js.org/459
 * solutions: https://tsch.js.org/459/solutions
 */

import { Expect, Equal } from '../utils';

type Flatten<T> = T extends unknown[] ?
    (T extends [infer R, ...infer E] ? [...Flatten<R>, ...Flatten<E>] : [])
    : [T];

type cases = [
    Expect<Equal<Flatten<[]>, []>>,
    Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
    Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
    Expect<
        Equal<
            Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>,
            [{ foo: 'bar'; 2: 10 }, 'foobar']
        >
    >
];
