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
        try {
            const f1 = produce(f, (draft) => {
                draft.a = 'lovebird';
            });
            f1.logInfo();
        } catch (e) {
            // console.log(e);
        }
    }

    function modifyObjInArray() {
        const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
        const array2 = produce(array, (draft) => {
            draft.push({ a: 4 });
            const obj = draft[draft.length - 1];
            obj.a = 5;

            const obj2 = { a: 6 };
            draft.push(obj2);
            obj2.a = 7;

            draft[0].a = 6;
        });

        const array3 = produce(array2, (draft) => {
            draft.push({ a: 4 });
            const obj = draft[draft.length - 1];
            obj.a = 5;

            draft[0].a = 7;
        });
        console.log(array2);
        console.log(array3);
    }

    classImmer();
    modifyObjInArray();
}

testImmer();
