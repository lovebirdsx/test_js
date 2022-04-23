function testVoid() {
    function concat(who: string): string {
        return `Hello ${who}`;
    }

    console.log(concat('lovebird'));

    function hello(): void {
        console.log('Hello World');
    }

    hello();
}

testVoid();
