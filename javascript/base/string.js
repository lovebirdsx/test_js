let fristName = `John`
console.log(fristName);

fristName = 'Carmark'
console.log(fristName);

// 使用`来定义多行
console.log(`first line
second line`);

console.log(`
<div>
    <a href="#">
        <span>Lovebird</span>
    </a>
</div>
`)

let value = 5
let exponent = 'second'
console.log(`${value} by ${exponent} is ${value * value}`);

console.log(exponent.includes('sec'))

const foo = 'hello world hello you!';
console.log(foo.replace('hello', 'Hi'));
console.log(foo.replace(/hello/g, 'Hi'));
console.log(foo.split('hello').join('Hi'));

console.log('hello foo bar'.search('hello'));
console.log('hello foo bar'.search('aa|bb|cc'));
