// 参考 https://github.com/microsoft/TypeScript/issues/15300
function testRecord() {
    class Foo<T extends Record<string, unknown>> {
        getList(): T[] {
            return [];
        }
    }

    // 此处Bar如果不继承Record<string, unknown>,会编译失败
    interface Bar extends Record<string, unknown> {
        id: number;
        name: string;
    }

    const f = new Foo<Bar>();
}
