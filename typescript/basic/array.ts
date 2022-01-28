class TestArray {
    static testBasic(): void {
        const fabolacci: number[] = [1, 2, 3, 5, 8];
        console.log(fabolacci);

        // fabolacci.push('8'); 只允许传入number类型
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

    static Run(): void {
        TestArray.testBasic();
        TestArray.testInterface();
        TestArray.testInterface2();
        TestArray.testAny();
    }
}

TestArray.Run();
