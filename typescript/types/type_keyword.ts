module type_keyworld {
    function testBasic() {
        type Foo = number & string; // nerver
        type Bar = {
            name: string
        } & {
            id: number;
        };
        const b: Bar = {
            name: 'lovebird',
            id: 1,
        };
        console.log(b);

        interface A {
            name: string;
        }
        interface B {
            age: number;
        }
        type C = A & B;
        const c : C = {
            name: 'lovebird',
            age: 18,
        };
        console.log(c);
    }

    function testAdvanced() {
        type Foo = {
            name: 'lovebird',
            id: 1001,
        };

        interface Bar {
            name: 'lovebird',
            id: 1002,
        }

        const foo: Foo = {
            name: 'lovebird',
            id: 1001,
        };
        console.log(foo);

        // 下面这句会失败
        // let foo2 = foo as Bar;
    }

    function testAdvanced2() {
        type Foo = {
            name: string;
            id: number;
        }
        interface Bar {
            name: string;
            id: number;
        }
        const foo: Foo = {
            name: 'lovebird',
            id: 1001,
        };
        const foo2 = foo as Bar;
        console.log(foo, foo2);
    }

    function testAdvanced3() {
        type Foo = {
            name: 'lovebird'
        }

        function bar(value:Foo) {
            console.log(value.name);
        }

        // 下面这句会报错
        // bar({ name: 'lovebird', age: 18 });

        interface Foo2 {
            name: string;
        }

        function bar2<Type extends Foo2>(value: Type) {
            console.log(value.name);
        }

        bar2({ name: 'lovebird', age: 18 });
    }

    testBasic();
    testAdvanced();
    testAdvanced3();
}
