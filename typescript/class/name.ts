class TestClassName {
    field1 = 0;
    field2 = 'hello';

    constructor(f1?: number, f2?: string) {
        if (f1) {
            this.field1 = f1;
        }
        if (f2) {
            this.field2 = f2;
        }
    }

    foo() {}

    bar() {}
}

console.log(TestClassName.name);
console.log(TestClassName.length);
console.log(TestClassName.prototype.bar);
console.log(TestClassName.prototype.bar.name);
console.log(TestClassName.prototype.field1);
console.log(TestClassName.prototype.field2);
