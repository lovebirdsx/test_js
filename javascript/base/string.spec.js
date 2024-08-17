describe('string', () => {
  it('replace none', () => {
    const original = 'Hello World';
    const replaced = original.replace('XYZ', 'ABC');

    expect(replaced).toBe(original);
  });
});
