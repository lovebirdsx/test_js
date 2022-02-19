function testUnionTypes() {
    function testBasic() {
        interface Dog {
            name: string;
            walk() : void;
        }
        interface Cat {
            id: number;
            walk() : void;
        }
        type SmallPet = Dog | Cat;
        const sp : SmallPet = {
            // id: 1,
            name: 'fuck',
            walk() {
                console.log('This is small pet walking');
            },
        };
        sp.walk();

        // 此处调用时合理的,因为ts认为sp要么是Dog,要么是Cat
        // 这里s直接赋值,并且赋值的类型是Dog
        console.log(sp.name);

        function getSmallPet(): Dog | Cat {
            return {
                name: 'Dog',
                walk() {
                    console.log('This is small pet walking 2');
                },
            };
        }
        const sp2 = getSmallPet();
        sp2.walk();

        // 此处调用会出错,ts编译器认为返回的sp2有可能是
        // Dog和Cat中的某一种,因此只能访问他们共有的元素
        // sp2.name;
    }

    // in 和 keyof是相反的两对操作
    function testBasic2() {
        type A = 'foo' | 'bar' | 'baz';
        type B = {[K in A] : string };
        type B1 = keyof {[K in A] : string };
        type C = {name: string, id: number};
        type D = keyof C;
    }

    function testMap() {
        type A = 'foo' | 'bar' | 'baz';
        type MapToFun<T> = T extends any ? () => T : never;
        type B = MapToFun<A>
    }

    function testKey() {
        type A = 'foo' | 'bar' | 'baz';
        type a1 = A['length'];

        type B = 1 | 2;
        type b1 = B['toString']

        type C = true | false | number | string
        type c1 = C['toLocaleString']
    }

    function combine() {
        type Name = 'foo' | 'bar' | 'baz'
        type Lan = 'zh' | 'en'
        type LocaleNames = `${Lan}_${Name}`
    }

    testBasic();
}
