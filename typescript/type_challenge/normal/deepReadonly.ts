/**
 * 深度 Readonly https://tsch.js.org/9/zh-CN
 * 解答：https://tsch.js.org/9/solutions
 */

import { Equal, Expect } from '../utils';

// type DeepReadonly<T> = {readonly[K in keyof T]: T[K] extends never ? T[K] : DeepReadonly<T[K]> }
type DeepReadonly<T> = {readonly[K in keyof T]: T[K] extends Record<keyof any, unknown> | unknown[] ? DeepReadonly<T[K]> : T[K] }

type From1 = DeepReadonly<{a: 'h', b: {c: 'h'}}>;
type To1 = { readonly a: 'h'; readonly b: { readonly c: 'h' } };
type Case1 = Expect<Equal<From1, To1>>;

type From2 = DeepReadonly<{a: 'h', b: {c: () => 22}}>;
type To2 = { readonly a: 'h'; readonly b: { readonly c: () => 22 } };
type Case2 = Expect<Equal<From2, To2>>;

type From21 = DeepReadonly<{c: () => 22}>;
type To21 = {readonly c: () => 22 };
type Case21 = Expect<Equal<From21, To21>>;

type From22 = DeepReadonly<() => 22>;
type To22 = () => 22;
type Case22 = Expect<Equal<From21, To21>>;

type From3 = DeepReadonly<{a: 'h', b: {c: true}}>;
type To3 = { readonly a: 'h'; readonly b: { readonly c: true } };
type Case3 = Expect<Equal<From3, To3>>;

type From41 = DeepReadonly<{c: ['h', 'i']}>;
type To41 = { readonly c: readonly ['h', 'i'] };
type Case41 = Expect<Equal<From41, To41>>;

type From4 = DeepReadonly<{a: 'h', b: {c: ['h', 'i']}}>;
type To4 = { readonly a: 'h'; readonly b: { readonly c: readonly ['h', 'i'] } };
type Case4 = Expect<Equal<From4, To4>>;

type Test1 = ['h', 'i'] extends unknown[] ? true : false;
type Test2 = ['h', 'i'] extends Record<keyof any, unknown> | unknown[] ? true : false;

type From5 = DeepReadonly<['h', 'i', {a: 'j'}]>;
type To5 = readonly ['h', 'i', {readonly a: 'j'}];
type Case5 = Expect<Equal<From5, To5>>;

type From6 = DeepReadonly<{c: ['h', 'i', {a: 'j'}]}>;
type To6 = { readonly c: readonly ['h', 'i', {readonly a: 'j'}] };
type Case6 = Expect<Equal<From6, To6>>;

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type cases = [
    Expect<Equal<DeepReadonly<X>, Expected>>,
]
