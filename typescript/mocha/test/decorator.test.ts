import { expect } from 'chai';
import 'reflect-metadata';

describe('Reflect', () => {
  it('should set and get metadata', () => {
    const key = 'myKey';
    const value = 'myValue';
    const target = {};
  
    Reflect.defineMetadata(key, value, target);
    const result = Reflect.getMetadata(key, target);
  
    expect(result).to.equal(value);
  });
  
  // 演示nestjs中类似Module的装饰器
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
          Reflect.defineMetadata(key, metadata[key], target);
        }
      };
    }
  
    @Module({imports: ['hello']})
    class Test {}
  
    const result = Reflect.getMetadata('imports', Test);
    expect(result).to.deep.equal(['hello']);
  
    const result2 = Reflect.getMetadata('controllers', Test);
    expect(result2).to.be.undefined;
  });
});
