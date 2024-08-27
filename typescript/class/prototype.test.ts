describe('prototype', () => {
  it('class', () => {
    class Cat {
      meow() {
        return 'meow';
      }
    }

    const cat = new Cat();
    expect(cat.meow()).toEqual('meow');
    expect(cat.meow).toEqual(Cat.prototype.meow);
  });

  it('static field', () => {
    class Cat {
      static category = 'animal';
    }

    const properties = Object.getOwnPropertyDescriptors(Cat);
    expect(properties.category.value).toEqual('animal');
  });

  it('instance field', () => {
    class Cat {
      name = 'Tom';

      age?: number;

      leg?: number;

      constructor() {
        this.leg = 4;
      }

      meow() {
        return 'meow';
      }
    }

    const cat = new Cat();
    const properties = Object.getOwnPropertyDescriptors(cat);

    const keys = Object.keys(properties);
    expect(keys).toEqual(['name', 'age', 'leg']);
    expect(Object.getOwnPropertyNames(cat)).toEqual(['name', 'age', 'leg']);

    expect(properties.name.value).toEqual('Tom');
    expect(properties.age).toBeDefined();
    expect(properties.age?.value).toBeUndefined();
    expect(properties.leg).toBeDefined();

    expect(properties.meow).toBeUndefined();
  });
});
