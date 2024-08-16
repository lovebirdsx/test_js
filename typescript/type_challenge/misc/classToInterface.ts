import { Equal, Expect } from '../utils';

type ToInterface<T> = {
  [K in keyof T]: T[K];
};

// #region 普通类型

class Person {
  age: number;
  optional?: string;

  constructor(public name: string, age: number, private id: number) {
    this.age = age;
  }
}

type IFooConvert = ToInterface<Person>;
interface IFoo {
  name: string;
  age: number;
  optional?: string;
}

type cases1 = [
  Expect<Equal<IFoo, IFooConvert>>,
];

// #endregion

// #region 动态类型

class SetVarAction {
  type = 'setVar' as const;
  constructor(public key: string, public value: string) {}
}

class IncrementAction {
  type = 'increment' as const;
  constructor(public key: string) {}
}

type Action = SetVarAction | IncrementAction;

type IAction = ToInterface<Action>;

interface ISetVarAction {
  type: 'setVar';
  key: string;
  value: string;
}

interface IIncrementAction {
  type: 'increment';
  key: string;
}

type cases2 = [
  Expect<Equal<IAction, ISetVarAction | IIncrementAction>>,
];

// #endregion

// #region 嵌套类型

class Inner {
  id: number = 0;
  name: string = '';
}

class Outer {
  name: string = '';
  inner: Inner = new Inner();
}

type IInner = ToInterface<Inner>;
type IOuter = ToInterface<Outer>;

interface IInnerInterface {
  id: number;
  name: string;
}

interface IOuterInterface {
  name: string;
  inner: IInnerInterface;
}

type cases3 = [
  Expect<Equal<IInner, IInnerInterface>>,
  Expect<Equal<IOuter, IOuterInterface>>,
];

// #endregion
