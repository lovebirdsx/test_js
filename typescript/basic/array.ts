class TestArray {
    static testBasic(): void {
        const fabolacci: number[] = [1, 2, 3, 5, 8];
        console.log(fabolacci);

        console.log('fabolacci[-1]', fabolacci[-1]);

        // fabolacci.push('8'); 只允许传入number类型

        const foo = [1, 2];
        console.log(foo[1], foo[2]);
        foo[2] = 3;
        console.log(foo, foo.length);
    }

    static testInterface(): void {
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

    static testInterface2(): void {
        interface MyArray {
            [index: number]: number;
        }

        const a: MyArray = [1, 2, 3, 4];
        console.log(a);
    }

    static testAny(): void {
        const f: any[] = ['lovebird', 123, true];
        console.log(f);
    }

    static testRemove() {
        console.log('[1, 2, 3, 4].splice(1, 1)', [1, 2, 3, 4].splice(1, 1));
        console.log('[1, 2, 3, 4].splice(1)', [1, 2, 3, 4].splice(1));
    }

    static Run(): void {
        TestArray.testBasic();
        TestArray.testInterface();
        TestArray.testInterface2();
        TestArray.testAny();
        TestArray.testRemove();
    }
}

TestArray.Run();
