function testBind() {
    class Foo {
        constructor(name) {
            this.name = name;
        }

        logInfo() {
            console.log(this.name);
        }

        logCallback() {
            this.logInfo = this.logInfo.bind(this);
            setTimeout(this.logInfo, 0.1);
        }
    }

    function classBind() {
        const foo = new Foo('hello');
        foo.logInfo();
        foo.logCallback();
    }

    classBind();
}

testBind();
