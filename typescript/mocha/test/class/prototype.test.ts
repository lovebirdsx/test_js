import { expect } from 'chai';

describe('prototype', () => {
  it('class', () => {
    class Cat {
      meow() {
        return 'meow';
      }
    }

    const cat = new Cat();
    expect(cat.meow()).to.equal('meow');
    expect(cat.meow).to.equal(Cat.prototype.meow);
  });
});
