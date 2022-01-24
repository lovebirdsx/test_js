function testInterface(): void {
    interface Person {
        name: string;
        age: number;
    }

    const foo: Person = {
        name: 'lovebird',
        age: 18,
    };

    console.log(foo);

    interface Person2 {
        name: string;
        age?: number;
    }

    const bar1: Person2 = {
        name: 'firebird',
    };
    console.log(bar1);

    const bar2: Person2 = {
        name: 'flyaway',
        age: 24,
    };
    console.log(bar2);
}

function testInterfaceAny(): void {
    interface Person {
        name: string;
        // age: number; 此句不满足下面的属性描述,故而编译不过
        [propName: string]: string;
    }

    const foo: Person = {
        name: 'lovebird',
        age: 'hello',
        bala: 'bala',
    };

    console.log(foo);
}

function testInterfaceReadonly() {
    interface Person {
        readonly name: string;
        age: number;
    }

    const foo: Person = {
        name: 'lovebird',
        age: 18,
    };

    // foo.name = 'yes'; 只能在创建时赋值
    foo.age = 20;
    console.log(foo);
}

testInterface();
testInterfaceAny();
testInterfaceReadonly();
