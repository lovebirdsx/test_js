function TestType() {
    function testAs() {
        interface IFoo {
            name: string;
            age: number;
        }

        const foo = {} as IFoo; // 编译器不会报错

        function createDefaultFoo(): IFoo {
            return {
                name: 'default',
                age: 0,
            };
        }

        // 使用该方式，确保不会漏写IFoo的字段
        const foo2 = createDefaultFoo();
    }

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
            // eslint-disable-next-line no-constant-condition
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
    function testStructVariant() {
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

    // 类只比较实例化字段, 不比较构造函数和静态函数
    function testClassVariant() {
        class Foo {
            size: number;
            constructor(x: number, y: number) {
                this.size = x + y;
            }
        }

        class Car {
            size: number;
            constructor(name: string) {
                this.size = 100;
            }
        }

        let foo = new Foo(1, 1);
        let car = new Car('hello');
        foo = car;
        car = foo;
        console.log(foo, car);
    }

    testUnknown();
    testAny();
    testVoid();
    testObject();
    testPrimitives();
    testStructVariant();
    testClassVariant();
}

TestType();
