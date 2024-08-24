import 'reflect-metadata';

describe('Reflect metadata', () => {
  it('decorate class', () => {
    function classDecorator(target: any) {
      target.isClassDecorated = true;
    }

    class Foo {}
    Reflect.decorate([classDecorator], Foo);
    expect((Foo as any).isClassDecorated).toBeTruthy();
  });

  it('decorate method', () => {
    function methodDecorator(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
      (target as any).isMethodDecorated = true;
    }

    class Foo {
      foo() {}
    }

    Reflect.decorate([methodDecorator as MethodDecorator], Foo, 'foo');

    expect((Foo as any).isMethodDecorated).toBeTruthy();
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
    expect(result).toEqual('classKeyValue');

    const result2 = Reflect.getMetadata('staticProp', Foo, 'sName');
    expect(result2).toEqual('staticPropValue');

    // 注意，这里的 name 是实例属性，不是静态属性
    const result3 = Reflect.getMetadata('prop', new Foo(), 'name');
    expect(result3).toEqual('propValue');

    const result4 = Reflect.getMetadata('staticMethod', Foo, 'sFoo');
    expect(result4).toEqual('staticMethodValue');

    // 注意，这里的 foo 是实例方法，不是静态方法
    const result5 = Reflect.getMetadata('method', new Foo(), 'foo');
    expect(result5).toEqual('methodValue');
  });

  it('defineMetadata', () => {
    class Foo {}

    Reflect.defineMetadata('key', 'value', Foo);
    const result = Reflect.getMetadata('key', Foo);

    expect(result).toEqual('value');
  });

  it('hasMetadata', () => {
    class Foo {
      bar() {}
    }

    expect(Reflect.hasMetadata('key', Foo)).toBeFalsy();
    Reflect.defineMetadata('key', 'value', Foo);
    expect(Reflect.hasMetadata('key', Foo)).toBeTruthy();

    expect(Reflect.hasMetadata('key', Foo, 'bar')).toBeFalsy();
    Reflect.defineMetadata('key', 'value', Foo, 'bar');
    expect(Reflect.hasMetadata('key', Foo, 'bar')).toBeTruthy();
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
    expect(Reflect.hasMetadata('key', B.prototype, 'methodA')).toBeTruthy();
    expect(Reflect.hasMetadata('key', B.prototype, 'methodB')).toBeTruthy();

    // 注意，这里的 key 是自身的
    expect(Reflect.hasOwnMetadata('key', B.prototype, 'methodA')).toBeFalsy();
    expect(Reflect.hasOwnMetadata('key', B.prototype, 'methodB')).toBeTruthy();
  });
});
