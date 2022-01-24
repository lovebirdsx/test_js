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

    static Run() {
        TestEnum.testBasic();
    }
}

TestEnum.Run();
