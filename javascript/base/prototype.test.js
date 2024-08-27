describe('prototype js', () => {
  class Foo {}
  const foo = new Foo();

  it('instance', () => {
    expect(typeof Foo).toBe('function');
    expect(typeof foo).toBe('object');
    
    expect(foo instanceof Foo).toBe(true);
    expect(foo.constructor).toBe(Foo);
    expect(foo.__proto__).toBe(Foo.prototype);

    // Foo既是函数，也是对象
    expect(Foo instanceof Function).toBe(true);
    expect(Foo instanceof Object).toBe(true);
  });

  it('instanceof', () => {
    function GrandParent() {
      this.name = 'base';
    }

    GrandParent.prototype.getName = function() {
      return this.name;
    }

    function Parent() {}
    Parent.prototype = {}

    function Child() {}

    expect(Parent instanceof GrandParent).toBe(false);

    // 通过原型链继承
    Parent.__proto__ = GrandParent.prototype;
    expect(Parent instanceof GrandParent).toBe(true);

    // 强制让Child继承Parent
    const child = new Child();
    expect(child instanceof Parent).toBe(false);

    child.__proto__ = Parent.prototype;
    expect(child instanceof Parent).toBe(true);

    // 强制让Parent继承GrandParent
    expect(child instanceof GrandParent).toBe(false);
    Parent.prototype.__proto__ = GrandParent.prototype;
    expect(child instanceof GrandParent).toBe(true);
  });

  it('constructor', () => {
    function Foo() {}
    const foo = new Foo();
    
    expect(foo.constructor).toBe(Foo);
    expect(Foo.constructor).toBe(Function);

    class Base {}
    class Extend extends Base {}

    const extend = new Extend();
    expect(extend.constructor).toBe(Extend);
    expect(Extend.constructor).toBe(Function);
    expect(Base.constructor).toBe(Function);
  });

  it('__proto__', () => {
    // ! 函数是对象，对象也是函数
    expect(Object instanceof Function).toBe(true);
    expect(Object.__proto__).toBe(Function.prototype); 
    expect(Function instanceof Object).toBe(true);
    expect(Function.__proto__).toBe(Function.prototype);
    expect(Function.prototype.__proto__).toBe(Object.prototype);
    
    // foo的原型是Foo的原型
    expect(foo.__proto__).toBe(Foo.prototype);

    // Foo的原型是Function的原型
    expect(Foo.__proto__).toBe(Function.prototype);

    expect(Function.prototype.__proto__).toBe(Object.prototype);
    expect(Object.prototype.__proto__).toBe(null);

    expect(Object.__proto__).toBe(Function.prototype);
    expect(Function.prototype.__proto__).toBe(Object.prototype);
    expect(Object.prototype.__proto__).toBe(null);

    
    expect(Function.prototype.__proto__).toBe(Object.prototype);
    
    expect(Foo.__proto__).toBe(Function.prototype);
    expect(Object.__proto__).toBe(Function.prototype);
    expect(Function.__proto__).toBe(Function.prototype);

    expect(Foo.prototype.__proto__).toBe(Object.prototype);
  });

  it('inherit', () => {
    class Base {}
    class Extend extends Base {}

    const extend = new Extend();

    expect(extend instanceof Extend).toBe(true);
    expect(extend instanceof Base).toBe(true);

    // 继承关系-实例
    expect(extend.__proto__).toBe(Extend.prototype);
    expect(Extend.prototype.__proto__).toBe(Base.prototype);
    expect(Base.prototype.__proto__).toBe(Object.prototype);
    expect(Object.prototype.__proto__).toBe(null);

    // 继承关系-instanceof
    expect(extend instanceof Extend).toBe(true);
    expect(extend instanceof Base).toBe(true);
    expect(extend instanceof Object).toBe(true);

    expect(Object instanceof Function).toBe(true);
    expect(extend instanceof Function).toBe(false);

    // 构造函数的原型链
    expect(Extend.__proto__).toBe(Base);
    expect(Base.__proto__).toBe(Function.prototype);
    expect(Function.prototype.__proto__).toBe(Object.prototype);
    expect(Object.prototype.__proto__).toBe(null);

    // 构造函数的原型链-instanceof
    expect(Extend instanceof Base).toBe(false);
    
    expect(Extend instanceof Function).toBe(true);
    expect(Extend instanceof Object).toBe(true);

    // constructor
    expect(extend.prototype).toBe(undefined);
    expect(extend.__proto__.constructor).toBe(Extend);
    expect(Extend.prototype.constructor).toBe(Extend);
    expect(Extend.constructor).toBe(Function);
    expect(Function.constructor).toBe(Function);
    expect(Function.constructor.constructor).toBe(Function);
  });

  it('primitive type', () => {
    const str = 'string';
    const num = 1;
    const bool = true;

    expect(str.__proto__).toBe(String.prototype);
    expect(num.__proto__).toBe(Number.prototype);
    expect(bool.__proto__).toBe(Boolean.prototype);
    expect(1..__proto__).toBe(Number.prototype);
    expect('hello'.__proto__).toBe(String.prototype);
    expect(true.__proto__).toBe(Boolean.prototype);

    expect(str.prototype).toBe(undefined);
    expect(num.prototype).toBe(undefined);
    expect(bool.prototype).toBe(undefined);
  });

  it('create object by function', () => {
    function Foo() {
      this.name = 'foo';
    }
    
    Foo.prototype.getName = function() {
      return this.name;
    }

    expect(() => {
      const foo1 = Foo();
    }).toThrow();

    const foo2 = new Foo();
    expect(foo2 instanceof Foo).toBe(true);
    expect(foo2.name).toBe('foo');
    expect(foo2.getName()).toBe('foo');

    expect(foo2.__proto__).toBe(Foo.prototype);
  });
})