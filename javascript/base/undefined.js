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

// 序列化之后会将undefined转化成null
const a1 = ['a', undefined];
console.log(a1);
console.log(JSON.stringify(a1));
console.log(JSON.parse(JSON.stringify(a1)));
