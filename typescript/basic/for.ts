function testFor() {
    const obj = {
        one: 'foo',
        two: 'bar',
        three: 'baz',
    };

    let k: keyof typeof obj;
    Object.entries(obj).forEach(([key, value]) => {
        console.log(key, value);
    });
}

testFor();
