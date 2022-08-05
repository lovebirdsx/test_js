function getName(): string {
    console.log('GetName()');
    return 'Foo.Name';
}

// 只要该文件被Import了, 那么Static类型的变量就会被自动初始化
export class Foo {
    public static Name = getName();
}

export class Bar {
    hello() {
        console.log('hello');
    }
}

// console.log('hello');
