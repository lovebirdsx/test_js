/* eslint-disable no-redeclare */
class TestFunction {
    static sum(a: number, b: number): number {
        return a + b;
    }

    static testBasic(): void {
        console.log(TestFunction.sum(1, 2));
    }

    static testExpression(): void {
        const mySum = function s(a: number, b: number): number {
            return a + b;
        };
        // eslint-disable-next-line no-unused-vars
        const mySum2: (a: number, b: number) => number = mySum;
        console.log(mySum(1, 2));
        console.log(mySum2(2, 3));
    }

    static testType(): void {
        interface AddFun {
            // eslint-disable-next-line no-unused-vars
            (a: number, b: number): number;
        }

        const fun: AddFun = function add(a: number, b: number) {
            return a + b;
        };

        console.log(fun(100, 101));
    }

    static testInterface(): void {
        interface Person {
            name: string;
            age: number;
            info: () => string;
        }

        const p: Person = {
            name: 'lovebird',
            age: 18,
            info(): string {
                return `${this.name} ${this.age}`;
            },
        };

        console.log(p, p.info());
    }

    static testOptional(): void {
        function buildName(first: string, second?: string): string {
            if (second) {
                return `${first} ${second}`;
            }

            return first;
        }

        console.log(buildName('love'));
        console.log(buildName('love', 'bird'));
    }

    static testDefault(): void {
        function foo(a: number, b: number = 1): number {
            return a + b;
        }

        console.log(foo(100));
        console.log(foo(100, 100));
    }

    static testParam(): void {
        function push(name: string[], ...values: string[]) {
            for (let i = 0; i < values.length; i++) {
                name.push(values[i]);
            }
            return name;
        }

        const a: string[] = [];
        console.log(push(a, 'foo', 'bar', 'car', 'baz'));
    }

    static testReturn() {
        function parse(value: boolean) {
            if (value) {
                return 1;
            }

            return false;
        }

        const a = parse(true);
        console.log(typeof a, a);
    }

    static testLeftParams() {
        function foo(name:string, ...otherParams : string[]) {
            console.log(name);
            for (let i = 0; i < otherParams.length; i++) {
                console.log(otherParams[i]);
            }
        }

        foo('Hello', 'foo', 'bar', 'car');
    }

    static testOverload() {
        function makeDate(timestamp: number): Date;
        function makeDate(m: number, d: number, y: number): Date;
        function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
            if (d !== undefined && y !== undefined) {
                return new Date(y, mOrTimestamp, d);
            }

            return new Date(mOrTimestamp);
        }
        const d1 = makeDate(12345678);
        const d2 = makeDate(5, 5, 5);
        // const d3 = makeDate(1, 3);
        console.log(d1, d2);
    }

    static Run(): void {
        TestFunction.testBasic();
        TestFunction.testExpression();
        TestFunction.testType();
        TestFunction.testInterface();
        TestFunction.testOptional();
        TestFunction.testDefault();
        TestFunction.testParam();
        TestFunction.testReturn();
        TestFunction.testLeftParams();
        TestFunction.testOverload();
    }
}

TestFunction.Run();
