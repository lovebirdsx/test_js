/* eslint-disable no-param-reassign */
import produce from 'immer';

function testImmer() {
    class Foo {
        a = 'hello';
        b = 1;
        c: boolean;

        constructor() {
            this.c = false;
        }

        logInfo() {
            console.log(this.a, this.b, this.c);
        }
    }

    function classImmer() {
        const f = new Foo();
        f.logInfo();

        // 此处会报错, immer只能作用于纯数据
        const f1 = produce(f, (draft) => {
            draft.a = 'lovebird';
        });
        f1.logInfo();
    }

    classImmer();
}

testImmer();
