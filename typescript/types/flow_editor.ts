/* eslint-disable max-len */

// type MakeByKes<T extends keyof any> = {[P in keyof T]: any}
type ReplaceValByOwnKey<T, S extends T> = { [P in keyof T]: S[P] };
type A1 = {
    foo: string,
    bar: boolean,
}
type B1 = {bar: boolean}
type R1 = ReplaceValByOwnKey<B1, A1>;

type ShiftAction<T extends any[]> = [...args: T] extends [arg1: any, ...rest: infer R] ? R : never;
type UnshiftAction<T extends any[], A> = [args1: A, ...rest: T] extends [...args: infer R] ? R : never;
type PopAction<T extends any[]> = [...args: T] extends [...rest: infer R, arg: any] ? R : never;
type PushAction<T extends any[], A> = [...rest: T, arg: A] extends [...args: infer R] ? R : never;

type tuple1 = ['vue', 'react', 'angular'];
type resultWithShiftAction = ShiftAction<tuple1>; // ["react", "angular"]
type resultWithUnshiftAction = UnshiftAction<tuple1, 'jquery'>; // ["jquery", "vue", "react", "angular"]
type resultWithPopAction = PopAction<tuple1>; // ["vue", "react"]
type resultWithPushAction = PushAction<tuple1, 'jquery'>; // ["vue", "react", "angular", "jquery"]
