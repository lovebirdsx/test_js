/* eslint-disable no-underscore-dangle */
function testArray() {
    function testBasic(): void {
        const fabolacci: number[] = [1, 2, 3, 5, 8];
        console.log(fabolacci);

        console.log('fabolacci[-1]', fabolacci[-1]);

        // fabolacci.push('8'); 只允许传入number类型

        const foo = [1, 2];
        console.log(foo[1], foo[2]);
        foo[2] = 3;
        console.log(foo, foo.length);
    }

    function testInterface(): void {
        interface Person {
            name: string;
            ids: number[];
        }

        const p: Person = {
            name: 'foo',
            ids: [1, 2, 3],
        };

        console.log(p);
    }

    function testInterface2(): void {
        interface MyArray {
            [index: number]: number;
        }

        const a: MyArray = [1, 2, 3, 4];
        console.log(a);
    }

    function testAny(): void {
        const f: any[] = ['lovebird', 123, true];
        console.log(f);
    }

    function testRemove() {
        console.log('[1, 2, 3, 4].splice(1, 1)', [1, 2, 3, 4].splice(1, 1));
        console.log('[1, 2, 3, 4].splice(1)', [1, 2, 3, 4].splice(1));
    }

    function testRemove2() {
        interface Foo {
            _key: number;
        }

        function genUniqueKey(array: {_key: number}[], range: number) {
            const all: number[] = array.map((_, id) => id);
            all.push(all.length);

            array.forEach((e) => {
                const id2 = Math.floor(e._key / range);
                all.splice(all.indexOf(id2), 1);
            });

            return all[0] * range;
        }

        function testFor(array: Foo[]) {
            console.log('genId for', array, 'result', genUniqueKey(array, 100));
        }
        testFor([{ _key: 10 }, { _key: 203 }, { _key: 303 }]);
        testFor([{ _key: 10 }, { _key: 103 }, { _key: 203 }]);
    }

    function testIndex() {
        const a = [1, 2, 3, 4, 5];
        console.log(a[-1]);
        console.log(a.at(-1));
    }

    testBasic();
    testInterface();
    testInterface2();
    testAny();
    testRemove();
    testRemove2();
    testIndex();
}

testArray();
