module infer {
    // 参考: https://segmentfault.com/a/1190000040558014

    type GetFirstParamType<T> = T extends (...arg: infer R) => any
        ? R[0]
        : never;
    type GetReturnType<T> = T extends (...arg: any) => infer R ? R : never;

    function foo(a: string, b: number): boolean {
        return false;
    }

    type FooParam1 = GetFirstParamType<typeof foo>;
    type FooResult = GetReturnType<typeof foo>;

    // 获得字段的类型
    const a = { name: 'lovebird', age: 18, yes: true };
    type GetValueTypeList<T> = T extends { [key: string]: infer R } ? R : never;
    type AValueType = GetValueTypeList<typeof a>;

    type ArrayElementType<T> = T extends (infer R)[] ? R : T;
    type item1 = ArrayElementType<number[]>;
    type item2 = ArrayElementType<string>;
    type item3 = ArrayElementType<[number, string]>;

    const b: [number, string, boolean] = [1, 'hey', false];
    type CType = number | string | boolean;
    const c: CType[] = ['hey', 1, false];
}
