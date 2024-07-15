import { Equal, Expect } from '../utils';

type VectorInfo = {
  x?: number;
  y?: number;
  z?: number;
}

type IBoxTriggerShape = {
  type: 'Box';
  center: VectorInfo;
  size: VectorInfo;
  rotator?: VectorInfo;
}

type Foo = {
  a: VectorInfo;
  b: VectorInfo & { name: string };
}

type TFilteredType<T> = {
  [K in keyof T as T[K] extends never | undefined ? never : K]: T[K];
};

type TCompatibleKeys<T, TLimited> = TFilteredType<{
  [K in keyof T]: Required<T>[K] extends TLimited ? T[K] : never;
}>;

type A = TCompatibleKeys<VectorInfo, string>;

type cases1 = [
  Expect<Equal<TCompatibleKeys<VectorInfo, string>, {}>>,
  Expect<Equal<TCompatibleKeys<VectorInfo, number>, { x?: number; y?: number; z?: number; }>>,
  Expect<Equal<TCompatibleKeys<Foo, VectorInfo>, { a: VectorInfo; b: VectorInfo & { name: string; }; }>>
];

type TVectorInfoField<T> = keyof TCompatibleKeys<T, VectorInfo>;

type cases2 = [
  Expect<Equal<TVectorInfoField<VectorInfo>, never>>,
  Expect<Equal<TVectorInfoField<VectorInfo & { name: string }>, never>>,
  Expect<Equal<TVectorInfoField<Foo>, 'a' | 'b'>>,
  Expect<Equal<TVectorInfoField<IBoxTriggerShape>, 'center' | 'size' | 'rotator'>>,
];
