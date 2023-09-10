// call的用法
function sum(a, b) {
    return a + b;
}

console.log(sum.call(undefined, 1, 2));

// apply的用法
console.log(sum.apply(undefined, [1, 2]));

// bind的用法
let sumBind = sum.bind(undefined, 1, 2);
console.log(sumBind());

// once
function once(fn) {
    let done = false;
    let result;

    return function () {
        if (!done) {
            result = fn();
            done = true;
        }
        return result;
    }
}

let pay = once(() => {
    console.log(this.name);
    console.log(`支付了5元`);
    return true;
});

console.log(pay());
console.log(pay());
