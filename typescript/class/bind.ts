function testBind() {
    class Foo {
        name: string;
        constructor(name: string) {
            this.name = name;
            this.logInfo.bind(this);
        }

        logInfo() {
            console.log(`Foo.name = ${this.name}`);
        }

        logInfoDelay() {
            setTimeout(this.logInfo, 0.1);
        }
    }

    function classBind() {
        const foo = new Foo('classBind');
        console.log(JSON.stringify(foo.logInfo));
        console.log(JSON.stringify(foo));
        // 以下两个都会输出undefined
        foo.logInfoDelay();
        setTimeout(foo.logInfo, 0.1);

        // 为了避免该情况,使用bind来明确告知函数运行时的this位置
        foo.logInfo = foo.logInfo.bind(foo);
        foo.logInfoDelay();
        setTimeout(foo.logInfo, 0.1);
    }

    classBind();
}

testBind();
