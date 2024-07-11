describe('generator', () => {
  it('basic', () => {
    function* generator() {
      yield 1;
      yield 2;
      yield 3;
    }

    const gen = generator();
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);

    const next = gen.next();
    expect(next.value).toBe(3);
    expect(next.done).toBe(false);

    const done = gen.next();
    expect(done.value).toBe(undefined);
    expect(done.done).toBe(true);
  });

  it('return', () => {
    function* generator() {
      yield 1;
      yield 2;
      return 3;
    }

    const gen = generator();
    const next = gen.next();
    expect(next.value).toBe(1);
    expect(next.done).toBe(false);
    const next2 = gen.next();
    expect(next2.value).toBe(2);
    expect(next2.done).toBe(false);
    const next3 = gen.next();
    expect(next3.value).toBe(3);
    expect(next3.done).toBe(true);
    const next4 = gen.next();
    expect(next4.value).toBe(undefined);
    expect(next4.done).toBe(true);
  });

  it('force return', () => {
    function* generator() {
      yield 1;
      yield 2;
      return 3;
    }

    const gen = generator();
    const next = gen.next();
    expect(next.value).toBe(1);
    expect(next.done).toBe(false);
    expect(gen.return(4).value).toBe(4);
    expect(gen.next().done).toBe(true);
    expect(gen.next().value).toBe(undefined);
    expect(gen.next().done).toBe(true);
  });

  it('yield nested 1', () => {
    function* generator1() {
      yield 1;
      yield 2;
      return 3;
    }

    function* generator2() {
      yield 1;
      yield* generator1();
      return 4;
    }

    const gen = generator2();
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    expect(gen.next().value).toBe(4);
    expect(gen.next().value).toBe(undefined);
  });

  it('return of generator', () => {
    function* generator() {
      yield 1;
      yield 2;
    }

    function* generator2() {
      yield generator();
    }

    const gen = generator2();
    const next = gen.next();
    expect(next.value).toBeInstanceOf(Object);
    expect(next.done).toBe(false);
  });
});
