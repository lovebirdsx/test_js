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
});
