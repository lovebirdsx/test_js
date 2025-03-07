import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  getKeysByCtor,
  ObjectComponent, objToInterface, prefix,
  suffix,
} from './common';

// #region Test
describe('react decorator', () => {
  it('object to interface', () => {
    class Person {
      name = 'Tom';
      age = 20;
    }

    const p = new Person();
    const obj = objToInterface(p);
    expect(obj).toEqual({ name: 'Tom', age: 20 });
  });

  it('get keys by ctor', () => {
    class Person {
      name = 'Tom';
      age?: number;
    }

    const keys1 = getKeysByCtor(Person);
    expect(keys1).toEqual(['name', 'age']);

    const keys2 = getKeysByCtor(Person);
    expect(keys1).toEqual(keys2);
  });

  it('keys order', () => {
    class Person {
      id = 1;
      @prefix('A')
      name = 'Tom';
      age = 20;
    }

    const p = new Person();
    const obj = objToInterface(p);
    expect(Object.keys(obj)).toEqual(['id', 'name', 'age']);
  });

  it('keys order 2', () => {
    class Simple {
      @prefix('Prefix A')
      @suffix('Suffix A')
      name = 'hahah';
      city = 'beijing';
      age = 18;

      @prefix('Prefix B')
      @suffix('Suffix B')
      b = '2';
    }

    const v = objToInterface(new Simple());
    expect(Object.keys(v)).toEqual(['name', 'city', 'age', 'b']);
  });

  it('simple', () => {
    class Simple {
      @prefix('A')
      @prefix('A')
      a = 1;
      b = '2';
    }

    const v = objToInterface(new Simple());
    const html = renderToString(<ObjectComponent value={v} Ctor={Simple} onModify={() => {}} />);
    console.log(html);
  });
});

// #endregion
