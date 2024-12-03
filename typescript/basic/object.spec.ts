/* eslint-disable no-prototype-builtins */

describe('Object', () => {
  describe('hasOwnProperty', () => {
    it('basic', () => {
      const obj = { a: 1, bar(): string { return 'bar'; } };
      expect(obj.hasOwnProperty('a')).toBeTruthy();
      expect(obj.hasOwnProperty('b')).toBeFalsy();

      expect(obj.hasOwnProperty('bar')).toBeTruthy();
    });

    it('prototype', () => {
      class Foo {
        a = 1;

        bar() {
          return 'bar';
        }
      }

      const foo = new Foo();
      expect(foo.hasOwnProperty('a')).toBeTruthy();
      expect(foo.hasOwnProperty('b')).toBeFalsy();

      expect(foo.hasOwnProperty('bar')).toBeFalsy();
    });

    it('in', () => {
      const obj = { a: 1, bar(): string { return 'bar'; } };
      expect('a' in obj).toBeTruthy();
      expect('b' in obj).toBeFalsy();

      expect('bar' in obj).toBeTruthy();
    });

    it('prototype', () => {
      class Foo {
        a = 1;

        bar() {
          return 'bar';
        }
      }

      const foo = new Foo();
      expect('a' in foo).toBeTruthy();
      expect('b' in foo).toBeFalsy();

      expect('bar' in foo).toBeTruthy();
    });
  });

  describe('isEmptyObject', () => {
    const { hasOwnProperty } = Object.prototype;

    function isEmptyObject(obj: object) {
      if (typeof obj !== 'object') {
        return false;
      }

      for (const key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          return false;
        }
      }

      return true;
    }

    function isEmptyObject2(obj: object) {
      if (typeof obj !== 'object') {
        return false;
      }

      return Object.keys(obj).length === 0;
    }

    // 测试一个对象是否为空对象
    it('empty object', () => {
      expect(isEmptyObject({})).toBeTruthy();
      expect(isEmptyObject2({})).toBeTruthy();
      expect(isEmptyObject({ a: 1 })).toBeFalsy();
      expect(isEmptyObject2({ a: 1 })).toBeFalsy();

      class Foo {
        a = 1;
      }

      expect(isEmptyObject(new Foo())).toBeFalsy();
      expect(isEmptyObject2(new Foo())).toBeFalsy();

      class Bar {
        name() {
          return 'bar';
        }
      }

      expect(isEmptyObject(new Bar())).toBeTruthy();
      expect(isEmptyObject2(new Bar())).toBeTruthy();
    });

    // 测试两种检测空对象的方法的性能，第二种方法由于使用了 Object.keys，性能更差
    xit('compare speed', () => {
      const obj = {};
      const obj2 = { a: 1 };

      console.time('isEmptyObject');
      for (let i = 0; i < 100000; i++) {
        isEmptyObject(obj);
        isEmptyObject(obj2);
      }
      console.timeEnd('isEmptyObject');

      console.time('isEmtptyObject2');
      for (let i = 0; i < 100000; i++) {
        isEmptyObject2(obj);
        isEmptyObject2(obj2);
      }
      console.timeEnd('isEmtptyObject2');
    });
  });
});
