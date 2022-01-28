/* eslint-disable no-unused-vars */
class TestEnum {
    static testBasic() {
        // eslint-disable-next-line no-shadow
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

    static testConst() {
        // eslint-disable-next-line no-shadow
        const enum Goo {
            Foo,
            Bar,
            Car
        }
        console.log(Goo.Foo);
        console.log(Goo.Bar);
        console.log(Goo.Car);
    }

    static Run() {
        TestEnum.testBasic();
        TestEnum.testConst();
    }
}

TestEnum.Run();
