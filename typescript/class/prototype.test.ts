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
    }

    const cat = new Cat();
    const properties = Object.getOwnPropertyDescriptors(cat);
    const keys = Object.keys(properties);

    expect(keys).toEqual(['name', 'age']);
    expect(properties.name.value).toEqual('Tom');
    expect(properties.age).toBeDefined();
    expect(properties.age?.value).toBeUndefined();
  });
});
