function Foo() {}
let foo = new Foo()
console.log(foo instanceof Foo);
console.log(Foo[Symbol.hasInstance](foo));