function testBind() {
    class Foo {
        name: string;
        constructor(name: string) {
            this.name = name;
            this.logInfo.bind(this);
        }

        logInfo() {
            console.log('Foo.name', this && this.name);
        }
    }

    function call(cb:() => void) {
        cb();
    }

    function classBind() {
        const foo = new Foo('classBind');
        // 会输出undefined
        call(foo.logInfo);

        // 为了避免该情况,使用bind来明确告知函数运行时的this位置
        foo.logInfo = foo.logInfo.bind(foo);
        call(foo.logInfo);
    }

    function objectBind() {
        const foo = {
            name: 'objectBind',
            loginInfo() {
                console.log('info', this && this.name);
            },
        };

        foo.loginInfo();
        const cb1 = foo.loginInfo;
        cb1();

        const cb2 = foo.loginInfo.bind(foo);
        cb2();
    }

    function test(cb:() => void) {
        console.log('=========== Test', cb.name);
        cb();
    }

    test(classBind);
    test(objectBind);
}

testBind();
