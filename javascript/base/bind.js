function greet(greeting) {
    console.log(greeting + ' for ' + this.name);
}

const obj = { name: 'function' };

// 绑定this
console.log('==== bind this');
const bindGreet = greet.bind(obj);
bindGreet('bind this');

// 可以绑定参数
console.log('==== bind params');
const bindGreet2 = greet.bind(obj, 'bind params');
bindGreet2();

// new 会忽略绑定
function Person(name) {
    this.name = name;
}

const BoundPerson = Person.bind(null);
const person = new BoundPerson('Bob');
console.log('==== bind new');
console.log('person.name', person.name);
