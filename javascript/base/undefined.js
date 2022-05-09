let a;
console.log(a == undefined);
a = 5;
console.log(a == undefined);

let message;
console.log('message is ', message);
console.log(message) // 报错

a = {
    foo: undefined,
    bar: 'hello',
};

console.log(a);
console.log(JSON.stringify(a))
console.log(JSON.parse(JSON.stringify(a)))
