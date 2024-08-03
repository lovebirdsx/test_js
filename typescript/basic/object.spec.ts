describe('Object', () => {
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

  function isEmtptyObject2(obj: object) {
    if (typeof obj !== 'object') {
      return false;
    }

    return Object.keys(obj).length === 0;
  }

  // 测试一个对象是否为空对象
  it('empty object', () => {
    expect(isEmptyObject({})).toBeTruthy();
    expect(isEmptyObject({ a: 1 })).toBeFalsy();

    class Foo {
      a = 1;
    }

    expect(isEmptyObject(new Foo())).toBeFalsy();

    class Bar {
      name() {
        return 'bar';
      }
    }

    expect(isEmptyObject(new Bar())).toBeTruthy();
  });

  // 测试两种检测空对象的方法的性能，第二种方法由于使用了 Object.keys，性能更差
  it('compare speed', () => {
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
      isEmtptyObject2(obj);
      isEmtptyObject2(obj2);
    }
    console.timeEnd('isEmtptyObject2');
  });
});
