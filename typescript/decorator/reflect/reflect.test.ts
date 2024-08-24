import 'reflect-metadata';

describe('Reflect', () => {
  it('get set', () => {
    const obj = { a: 1 };
    expect(Reflect.get(obj, 'a')).toEqual(1);

    Reflect.set(obj, 'a', 2);
    expect(Reflect.get(obj, 'a')).toEqual(2);
  });

  it('has', () => {
    const obj = { a: 1 };
    expect(Reflect.has(obj, 'a')).toBeTruthy();
    expect(Reflect.has(obj, 'b')).toBeFalsy();
  });

  it('delete', () => {
    const obj = { a: 1 } as { a?: number };
    expect(Reflect.has(obj, 'a')).toBeTruthy();
    Reflect.deleteProperty(obj, 'a');
    expect(Reflect.has(obj, 'a')).toBeFalsy();

    Reflect.set(obj, 'a', 1);
    expect(Reflect.has(obj, 'a')).toBeTruthy();
    delete obj.a;
    expect(Reflect.has(obj, 'a')).toBeFalsy();
  });

  it('ownKeys', () => {
    const obj = { a: 1, b: 2 };
    expect(Reflect.ownKeys(obj)).toEqual(['a', 'b']);
  });

  it('construct', () => {
    class Cat {
      constructor(public id: string, public name: string) {}
    }

    const cat = Reflect.construct(Cat, [1, 'Tom']);
    expect(cat.id).toEqual(1);
    expect(cat.name).toEqual('Tom');
  });
});
