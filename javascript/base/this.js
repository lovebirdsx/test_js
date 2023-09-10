// 全局上下文
console.log(this);

// 函数调用
function foo() {
    console.log(this);
}

foo();

// 对象方法
const obj = {
    name: 'Alice',
    showName: function() {
        console.log(this);
    },
};
obj.showName();

// 构造函数
function Person(name) {
    this.name = name;
}

const p = new Person('Bob');
console.log(p.name);

// 箭头函数
const obj2 = {
    name: 'Alice',
    showName: () => {
        console.log(this.name);
    },
};
obj2.showName();

// 显示设置this - call
function demo() {
    console.log(this);
}

const obj3 = { name: 'Alice' }
demo.call(obj3);

// 显示设置this - aplly
function demo2() {
    console.log(this);
}

const obj4 = { name: 'Alice' }
demo2.apply(obj4);

// 显示设置this - bind
function demo3() {
    console.log(this);
}

const obj5 = { name: 'Alice' }
const fn = demo3.bind(obj5);
fn();
