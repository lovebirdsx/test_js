function testTypeFuction() {
    function keyof() {
        type A = {a: string, b: boolean, c: number}
        type B = keyof A;
        const b: B = 'a';
    }

    function misc() {
        type p31 = Exclude<'x' | 'y', 'x'> // 'y'
        type p32 = Uppercase<'xyz'>
        type p33 = Lowercase<'HELLO'>
        type p34 = Capitalize<'yes?'>
    }

    function record() {
        type A = {a: string, b: boolean, c: number}
        type B = 'a'
        type C = Record<B, A>
        const c: C = {
            a: {
                a: 'hello',
                b: true,
                c: 1,
            },
        };
    }

    function pick() {
        type A = {a: string, b: boolean, c: number}
        type B = 'a' | 'b'
        type C = Pick<A, B>
        const c: C = {
            a: 'hello',
            b: false,
        };
    }

    function omit() {
        type A = {a: string, b: boolean, c: number}
        type C = Omit<A, 'a' | 'b'>
    }

    function readonly() {
        type A = {a: string, b: boolean, c: number}
        type RA = Readonly<A>;
        const a: RA = {
            a: 'hello',
            b: false,
            c: 1,
        };
        // a.a = 'fuck'; 此行会报错
    }

    function partial() {
        type A = {a: string, b: boolean, c: number}
        type PA = Partial<A>;
        const a: PA = {
            a: 'hello',
        };
    }

    function required() {
        type A = {a?: string, b?: boolean, c?: number}
        type PA = Required<A>;
        const a: PA = {
            a: 'hello',
            b: false,
            c: 111,
        };
    }

    function extract() {
        type A = 'A' | 'B' | 'C' | 1 | 2 | 3
        type B = Extract<A, string>
        type C = Extract<A, number>

        type D = Extract<[1, 2, 3] | 1 | 'hello', any[]>
    }

    function exclude() {
        type A = {a: string, b: boolean, c: number}
        type B = {a: string, b: boolean}
        type C = Exclude<B, A>
    }

    function instanceType() {
        class Foo {

        }
        type A = InstanceType<typeof Foo>;
    }

    function constructorParameters() {
        class Foo {
            constructor(a: string, b: boolean) {}
        }
        type A = ConstructorParameters<typeof Foo>;
    }
}
