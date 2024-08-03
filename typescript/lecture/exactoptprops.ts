function f1(obj: { a?: string, b?: string | undefined }) {
    const { a } = obj;
    const { b } = obj;
    obj.a = 'hello';
    obj.b = 'hello';
    // obj.a = undefined;
    delete obj.a;
    obj.b = undefined;
}

function f2(obj: { a?: string }) {
    if ('a' in obj) {
        console.log(obj.a);
    }

    if (Object.prototype.hasOwnProperty.call(obj, 'a')) {
        console.log(obj.a);
    }
}
