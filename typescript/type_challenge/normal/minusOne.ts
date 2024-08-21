/**
 * MinusOne https://tsch.js.org/2257/zh-CN
 * 解答：https://tsch.js.org/2257/solutions
 */

import { Expect, Equal } from '../utils';

// type MinusOne<T extends number, U extends unknown[] = []> = [...U, unknown]['length'] extends T ? U['length'] : MinusOne<T, [...U, unknown]>;

// Multiplying tuples
type Twice<T extends unknown[]> = [...T, ...T]
type Triple<T extends unknown[]> = [...T, ...T, ...T]
type FourTimes<T extends unknown[]> = Twice<Twice<T>>
type FiveTimes<T extends unknown[]> = [...FourTimes<T>, ...T]
type SixTimes<T extends unknown[]> = Twice<Triple<T>>
type SevenTimes<T extends unknown[]> = [...SixTimes<T>, ...T]
type EightTimes<T extends unknown[]> = Twice<FourTimes<T>>
type NineTimes<T extends unknown[]> = Triple<Triple<T>>
type TenTimes<T extends unknown[]> = Twice<FiveTimes<T>>

// Adding N elements into tuple
type Plus<T extends unknown[], N extends string, One extends unknown[] = [null]> = [
  ...T,
  ...(
    N extends '1' ? One :
      N extends '2' ? Twice<One> :
      N extends '3' ? Triple<One> :
      N extends '4' ? FourTimes<One> :
      N extends '5' ? FiveTimes<One> :
      N extends '6' ? SixTimes<One> :
      N extends '7' ? SevenTimes<One> :
      N extends '8' ? EightTimes<One> :
      N extends '9' ? NineTimes<One> :
      []
  )
]

// Drop one element from tuple
type DropOne<T extends unknown[]> = T extends [unknown, ...infer Rest] ? Rest : []

type MinusOneStr<T extends string, U extends unknown[] = []> = `${T}` extends `${infer D}${infer Rest}` ? (
  MinusOneStr<Rest, Plus<TenTimes<U>, D>>
) : DropOne<U>['length']

type MinusOne<T extends number> = MinusOneStr<`${T}`>

type cases = [
    Expect<Equal<MinusOne<1>, 0>>,
    Expect<Equal<MinusOne<55>, 54>>,
    Expect<Equal<MinusOne<3>, 2>>,
    Expect<Equal<MinusOne<100>, 99>>,
    Expect<Equal<MinusOne<1101>, 1100>>
];
