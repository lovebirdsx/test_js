function testNumberOutOfRange() {
    // 使用biginit是正确的
    const a = 94410573200000000n;
    for (let index = 0n; index < 40n; index++) {
        console.log(a + index);
    }

    // 不使用biginit,精度只能到20
    const b = 94410573200000000;
    for (let index = 0; index < 40; index++) {
        console.log(b + index);
    }
}

testNumberOutOfRange();
