import { expect } from 'chai';
import 'reflect-metadata';

describe('Reflect', () => {
  it('get set', () => {
    const obj = { a: 1 };
    expect(Reflect.get(obj, 'a')).to.equal(1);

    Reflect.set(obj, 'a', 2);
    expect(Reflect.get(obj, 'a')).to.equal(2);
  });

  it('has', () => {
    const obj = { a: 1 };
    expect(Reflect.has(obj, 'a')).to.be.true;
    expect(Reflect.has(obj, 'b')).to.be.false;
  });

  it('delete', () => {
    const obj = { a: 1 };
    expect(Reflect.has(obj, 'a')).to.be.true;
    Reflect.deleteProperty(obj, 'a');
    expect(Reflect.has(obj, 'a')).to.be.false;

    Reflect.set(obj, 'a', 1);
    expect(Reflect.has(obj, 'a')).to.be.true;
    delete obj.a;
    expect(Reflect.has(obj, 'a')).to.be.false;
  });

  it('ownKeys', () => {
    const obj = { a: 1, b: 2 };
    expect(Reflect.ownKeys(obj)).to.deep.equal(['a', 'b']);
  });

  it('construct', () => {
    class Cat {
      constructor(public id: string, public name: string) {}
    }

    const cat = Reflect.construct(Cat, [1, 'Tom']);
    expect(cat.id).to.equal(1);
    expect(cat.name).to.equal('Tom');
  });
});
