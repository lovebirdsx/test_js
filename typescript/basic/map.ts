/* eslint-disable max-classes-per-file */
function testMap() {
    function testBase() {
        class Foo {
            name: string;
            constructor(name:string) {
                this.name = name;
            }
        }

        class Bar {
            name: string;
            constructor(name:string) {
                this.name = name;
            }
        }

        const foo = new Foo('Foo');
        const bar = new Bar('Bar');
        console.log(foo, bar);
    }

    function testSet() {
        const a = new Map();
        a.set('hello', 'world');

        // 注意,此处输出的结果是 '{}'
        console.log(JSON.stringify(a));

        console.log(typeof a, typeof {});
    }

    testBase();
    testSet();
}

testMap();
