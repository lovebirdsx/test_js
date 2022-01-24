/* eslint-disable max-classes-per-file */

class TestGeneric {
    static testBasic() {
        function createArray<T>(value: T, len: number): Array<T> {
            const a = new Array<T>(len);
            for (let i = 0; i < len; i++) {
                a.push(value);
            }
            return a;
        }

        console.log(createArray<string>('Hello', 3));
        console.log(createArray<number>(100, 3));
    }

    static testTuple() {
        function swap<U, T>(a: [U, T]): [T, U] {
            return [a[1], a[0]];
        }

        console.log(swap([1, 'lovebird']));
        console.log(swap([true, 3]));
    }

    static testConstraint() {
        interface IRunable {
            run(): void;
        }
        class Cat implements IRunable {
            // eslint-disable-next-line class-methods-use-this
            run(): void {
                console.log('This is cat running');
            }
        }

        function run<T extends IRunable>(t: T) {
            t.run();
        }

        const cat = new Cat();
        run(cat);
    }

    static testInterface() {
        interface SearchFunc<T> {
            // eslint-disable-next-line no-unused-vars
            (value: T, array: Array<T>): number;
        }

        const search: SearchFunc<string> = function SearchString(
            a: string,
            array: Array<string>,
        ) {
            return array.indexOf(a);
        };

        console.log(search('b', ['a', 'b', 'c', 'a']));
    }

    static testClass() {
        class Outputer<T> {
            // eslint-disable-next-line class-methods-use-this
            out(a: T) {
                console.log(a);
            }
        }

        const o = new Outputer<String>();
        o.out('hello');
    }

    static Run() {
        TestGeneric.testBasic();
        TestGeneric.testTuple();
        TestGeneric.testConstraint();
        TestGeneric.testInterface();
        TestGeneric.testClass();
    }
}

TestGeneric.Run();
