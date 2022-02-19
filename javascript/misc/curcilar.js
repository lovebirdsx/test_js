// 可以正常输出循环引用的toString
function toString(obj) {
    const cache = new Map();
    return JSON.stringify(obj, (_, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
                return undefined;
            }
            cache.set(value, true);
        }

        return value;
    });
}

// 构造一个循环引用
let foo = {};
foo.o = foo;

console.log(toString(foo));
// 下面的调用会报错
// console.log(JSON.stringify(o));

const bar = { name: 1 };
foo = {};
foo.one = bar;
foo.two = bar;

console.log(JSON.stringify(foo));
console.log(toString(foo));
