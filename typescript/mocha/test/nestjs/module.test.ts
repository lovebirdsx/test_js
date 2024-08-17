import { expect } from 'chai';
import 'reflect-metadata';

describe('nestjs module', () => {
  it('nestjs module', () => {
    interface ModuleMetadata {
      imports?: any[];
      controllers?: any[];
      providers?: any[];
      exports?: any[];
    }

    function Module(metadata: ModuleMetadata): ClassDecorator {
      return (target: Function) => {
        const keys = Object.keys(metadata);
        for (const key of keys) {
          Reflect.defineMetadata(key, metadata[key as keyof ModuleMetadata], target);
        }
      };
    }

    @Module({ imports: ['hello'] })
    class Test {}

    const result = Reflect.getMetadata('imports', Test);
    expect(result).to.deep.equal(['hello']);

    const result2 = Reflect.getMetadata('controllers', Test);
    expect(result2).equal(undefined);
  });
});
