// arguments是一个类数组对象，包含了函数调用时传递的参数
function foo() {
    console.log(arguments);
}

foo(1, 2, 3);

// 通过arguments求和
function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }

    return total;
}

console.log(sum(1, 2, 3, 4, 5));

// ES6中求和的推荐用法
function sumEs6(...args) {
    return args.reduce((total, current) => total + current, 0);
}

console.log(sumEs6(1, 2, 3, 4, 5));

// 将arguments转换为数组
function argumentsToArray() {
    return Array.from(arguments);
}

console.log(argumentsToArray(1, 2, 3, 4, 5));
