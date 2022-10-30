export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
export type Expect<T extends true> = T;
export type ExpectNot<T extends false> = T;
export type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]>; } : T
export type Alike<X, Y> = (<T>() => T extends MergeInsertions<X> ? 1 : 2) extends <T>() => T extends MergeInsertions<Y> ? 1 : 2 ? true : false
export type Extends<X, Y> = X extends Y ? true : false;
export type Not<X extends true | false> = X extends true ? false : true;
