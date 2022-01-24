class TestTuple {
    static testBasic() {
        const t: [string, number] = ['lovebird', 18];
        console.log(t);
        t[1] = 128;
        console.log(t);
        t.push('hello1');
        console.log(t);
        t.push('hello2');
        console.log(t);
    }

    static Run() {
        TestTuple.testBasic();
    }
}

TestTuple.Run();
