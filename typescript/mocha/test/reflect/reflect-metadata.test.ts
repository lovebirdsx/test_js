import { expect } from 'chai';

describe('Reflect metadata', () => {
  it('decorate class', () => {
    function classDecorator(target: any) {
      target.isClassDecorated = true;
    }

    class Foo {}
    Reflect.decorate([classDecorator], Foo);
    expect((Foo as any).isClassDecorated).to.be.true;
  });

  it('decorate method', () => {
    function methodDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
      target.isMethodDecorated = true;
    }

    class Foo {
      foo() {}
    }

    Reflect.decorate([methodDecorator], Foo, 'foo');
    
    expect((Foo as any).isMethodDecorated).to.be.true;
  });

  it('metadata', () => {
    @Reflect.metadata('classKey', 'classKeyValue')
    class Foo {
      @Reflect.metadata('staticProp', 'staticPropValue')
      static sName = 'Foo';

      @Reflect.metadata('prop', 'propValue')
      name = 'Foo';

      @Reflect.metadata('staticMethod', 'staticMethodValue')
      static sFoo() {}

      @Reflect.metadata('method', 'methodValue')
      foo() {}
    }

    const result = Reflect.getMetadata('classKey', Foo);
    expect(result).to.equal('classKeyValue');

    const result2 = Reflect.getMetadata('staticProp', Foo, 'sName');
    expect(result2).to.equal('staticPropValue');

    // 注意，这里的 name 是实例属性，不是静态属性
    const result3 = Reflect.getMetadata('prop', new Foo(), 'name');
    expect(result3).to.equal('propValue');

    const result4 = Reflect.getMetadata('staticMethod', Foo, 'sFoo');
    expect(result4).to.equal('staticMethodValue');

    // 注意，这里的 foo 是实例方法，不是静态方法
    const result5 = Reflect.getMetadata('method', new Foo(), 'foo');
    expect(result5).to.equal('methodValue');
  });

  it('defineMetadata', () => {
    class Foo {}
  
    Reflect.defineMetadata('key', 'value', Foo);
    const result = Reflect.getMetadata('key', Foo);
  
    expect(result).to.equal('value');
  });

  it('hasMetadata', () => {
    class Foo {
      bar() {}
    }

    expect(Reflect.hasMetadata('key', Foo)).to.be.false;
    Reflect.defineMetadata('key', 'value', Foo);
    expect(Reflect.hasMetadata('key', Foo)).to.be.true;

    expect(Reflect.hasMetadata('key', Foo, 'bar')).to.be.false;
    Reflect.defineMetadata('key', 'value', Foo, 'bar');
    expect(Reflect.hasMetadata('key', Foo, 'bar')).to.be.true;
  });

  it('hasOwnMetadata', () => {
    @Reflect.metadata('classKey', 'classKeyValue')
    class A {
      @Reflect.metadata('key', 'valueA')
      methodA() {}
    }

    class B extends A {
      @Reflect.metadata('key', 'valueB')
      methodB() {}
    }
    
    // 注意，这里的 key 是继承自父类的
    expect(Reflect.hasMetadata('key', B.prototype, 'methodA')).to.be.true;
    expect(Reflect.hasMetadata('key', B.prototype, 'methodB')).to.be.true;
    
    // 注意，这里的 key 是自身的
    expect(Reflect.hasOwnMetadata('key', B.prototype, 'methodA')).to.be.false;
    expect(Reflect.hasOwnMetadata('key', B.prototype, 'methodB')).to.be.true;
  });
});
