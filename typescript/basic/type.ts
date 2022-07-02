/* eslint-disable no-unused-vars */
function TestType() {
    function testUnknown() {
        let a: unknown;
        console.log(typeof a);

        let b: any;
        console.log(typeof b);

        a = 'hello';
        console.log(typeof a);

        a = 123;
        console.log(typeof a);

        function foo(n: number): unknown {
            if (n === 0) {
                return 1;
            }

            if (n === 1) {
                return 'hello';
            }

            return undefined;
        }

        console.log(typeof foo);
    }

    function testAny() {
        const a: unknown = 10;
        const b: any = 10;
        console.log(typeof a, typeof b);

        // const c: number = a; // 此句报错, unknown不可以被赋值为非unknown
        const c: unknown = a;
        console.log(c, typeof c);

        const d: number = b;
        console.log(d, typeof d);

        console.log(b.method);
        // a.method(); // 此句报错, unknown
    }

    function testVoid() {
        let a: void;
        console.log(typeof a);
    }

    function testNever() {
        function error(message:string) : never {
            throw new Error(message);
        }

        function fail() {
            return error('Something failed');
        }

        function infiniteLoop(): never {
            while (true) {
                console.log('hello');
            }
        }
    }

    function testObject() {
        let a: object | null;

        // 下面3个都会报错
        // a = 1;
        // a = '100';
        // a = undefined;
        a = null;
        a = { prop: 0 };
        console.log(a);
    }

    function testPrimitives() {
        function reverse1(s:String) : String {
            return s.split('').reverse().join('');
        }

        function reverse2(s:string) : string {
            return s.split('').reverse().join('');
        }

        console.log(reverse1('12345'));
        console.log(reverse2('12345'));
    }

    // 结构化, 只要结构相同, 名称无所谓
    function testStructable() {
        interface IPoint {
            x: number;
            y: number;
        }

        class Point {
            readonly name;
            constructor(public x: number, public y: number) {
                this.name = `${x}-${y}`;
            }
        }

        const p: IPoint = new Point(100, 100);
        console.log(p, p.x, p.y);
    }

    testUnknown();
    testAny();
    testVoid();
    testObject();
    testPrimitives();
    testStructable();
}

TestType();
