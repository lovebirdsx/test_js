function f1(obj: { a?: string, b?: string | undefined }) {
    let a  = obj.a;
    let b = obj.b;
    obj.a = 'hello';
    obj.b = 'hello';
    // obj.a = undefined;
    delete obj.a;
    obj.b = undefined;
}

function f2(obj: { a?: string }) {
    obj.a?.length;
    if ('a' in obj) {
        obj.a.length;
    }
    if (obj.hasOwnProperty('a')) {
        obj.a.length;
    }
}