describe('Serialize', () => {
  it('table', () => {
    class Base {
      base1 = 1;
      base2 = 2;
    }

    class Child extends Base {
      base2 = 3;
      child2 = '';
    }

    const child = new Child();
    console.log(JSON.stringify(child));
  });
});
