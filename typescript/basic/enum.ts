/* eslint-disable dot-notation */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
function TestEnum() {
    function testBasic() {
        enum Days {
            Sun,
            Mon,
            Tue,
            Wed,
            Thu,
            Fri,
            Sat,
        }
        console.log(Days.Sun);
        console.log(Days.Mon);
        console.log(Days[0]);
    }

    function testConst() {
        const enum Goo {
            Foo,
            Bar,
            Car
        }
        console.log(Goo.Foo);
        console.log(Goo.Bar);
        console.log(Goo.Car);
    }

    function getEnumNames(e: any) {
        return Object.keys(e).filter((e) => Number.isNaN(parseInt(e, 10)));
    }

    function testMeta() {
        enum A {Foo, Bar, Car}
        console.log(getEnumNames(A));
    }

    function testName() {
        enum Foo {
            A = 'NameA',
            B = 'NameB',
        }

        console.log(Foo['A']);
        console.log(Foo['B']);
    }

    testBasic();
    testConst();
    testMeta();
    testName();
}

TestEnum();
