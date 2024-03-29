import { expect } from 'chai';
import 'reflect-metadata';

describe('decorator', () => {
  it('decorator', () => {
    function readonly(target: any, key: string, descriptor: PropertyDescriptor) {
      descriptor.writable = false;
    }

    class Cat {
      @readonly
      meow() {
        return 'meow';
      }

      miao() {
        return 'miao';
      }
      
      woof() {
        return 'woof';
      }
    }

    const cat = new Cat();
    expect(() => cat.meow = () => 'woof').to.throw(TypeError);
    expect(() => cat.miao = () => 'woof').to.not.throw(TypeError);
  });

  it('class decorator', () => {
    function superHero(isSuperHero: boolean) {
      return function (target: any) {
        target.isSuperHero = isSuperHero;
        if (isSuperHero) {
          target.power = 'flight';
        }
      }
    }

    @superHero(true)
    class MySuperHero {}

    expect((MySuperHero as any).isSuperHero).to.be.true;
    expect((MySuperHero as any).power).to.equal('flight');

    @superHero(false)
    class MyRegularHero {}

    expect((MyRegularHero as any).isSuperHero).to.be.false;
    expect((MyRegularHero as any).power).to.be.undefined;
  });

  it('parameter decorator', () => {
    function Param(type: string) {
      return function (target: any, key: string, index: number) {
        const parameters: string[] = Reflect.getOwnMetadata('parameters', target, key) || [];
        parameters[index] = type;
        Reflect.defineMetadata('parameters', parameters, target, key);
      }
    }

    class Foo {
      foo(@Param('string') bar: string, @Param('number') car: number) {}
    }

    function apply(foo: Foo, ...args: any[]) {
      // 注意由于是拿实例方法，所以要用原型链(Foo.prototype)上的方法，而不是类(Foo)上的方法
      const parameters: string[] = Reflect.getOwnMetadata('parameters', Foo.prototype, 'foo');
      if (args.length !== parameters.length) {
        throw new Error('Incorrect number of parameters');
      }

      for (let i = 0; i < args.length; i++) {
        if (typeof args[i] !== parameters[i]) {
          throw new Error(`Incorrect type of parameter #${i}, expected ${parameters[i]} but got ${typeof args[i]}`);
        }
      }

      foo.foo.apply(foo, args);
    }

    apply(new Foo(), 'hello', 123);
  });
});
