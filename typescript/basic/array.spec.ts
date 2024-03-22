describe('Array', () => {
  it('constructor - by options', () => {
    const arr = Array.from({ length: 5 }, (v, i) => i);
    expect(arr).toEqual([0, 1, 2, 3, 4]);
  });

  it('constructor - by mapfun', () => {
    const arr = Array.from([1, 2, 3], (v) => v * 2);
    expect(arr).toEqual([2, 4, 6]);
  });

  it('constructor - by iterator', () => {
    class Fibonacci {
      private count = 0;
      constructor(private maxCount: number) {
      }

      [Symbol.iterator]() {
        let a = 0;
        let b = 1;
        return {
          next: () => {
            if (this.count >= this.maxCount) {
              return { value: undefined, done: true };
            }
            this.count++;
            const rval = { value: b, done: false };
            b += a;
            a = rval.value;
            return rval;
          },
        };
      }
    }

    const fib = new Fibonacci(10);
    const fibArr = Array.from(fib);
    expect(fibArr).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
