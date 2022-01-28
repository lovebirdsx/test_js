function testUnionTypes(): void {
    let foo: number | string;
    foo = 7;
    console.log(typeof foo);

    foo = 'Hello';
    console.log(typeof foo);

    function getLength(n: number | string): string {
        // return n.length 会报错
        return n.toString();
    }

    console.log(getLength(foo));
}

testUnionTypes();
