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
    }

    testBasic();
}
