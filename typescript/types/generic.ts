/* eslint-disable new-cap */
module test.types.generic {
    function testBaisc() {
        function geta<Type>(value: Type): Type {
            return value;
        }

        const a1 = geta<string>('hello');
        const a2 = geta('world');
        console.log(a1, a2);

        type TypeA = string | number;
        function getb(value: TypeA[]): TypeA[] {
            console.log(value.length);
            return value;
        }
        const b = [1, 2, 3];
        getb(b);

        function getc<T>(value: T[]): T[] {
            console.log(value.length);
            return value;
        }

        const c1 = [1, 2, '3'];
        getc(c1);
        const c2 = [1, 2, 3];
        getc(c2);
    }

    function testKeyOf() {
        function getd<T, K extends keyof T>(value:T, key: K) {
            return value[key];
        }

        const d1 = {
            a: 1, b: 2, c: 3, 4: 'haha',
        };
        console.log(getd(d1, 4));
        // console.log(getd(d1, 5)); 报错
    }

    function testConstructor() {
        function create<T>(t:{new(): T}): T {
            return new t();
        }

        class Foo {
            name = 'hello';
            constructor() {}
        }

        const foo = create(Foo);
        console.log(foo.name);
    }

    function testAdvanced() {
        class BeeKeeper {
            hasMask = false;
        }

        class ZooKeeper {
            nametag = 'ZooKeeper';
        }

        class Animal {
            numLegs = 2;
        }

        class Bee extends Animal {
            keeper = new BeeKeeper();
        }

        class Lion extends Animal {
            keeper = new ZooKeeper();
        }

        function createInstance<A extends Animal>(c: new () => A): A {
            return new c();
        }

        const lion = createInstance(Lion);
        const bee = createInstance(Bee);
        console.log(lion.keeper.nametag);
        console.log(bee.keeper.hasMask);
    }

    testBaisc();
    testKeyOf();
    testConstructor();
    testAdvanced();
}
