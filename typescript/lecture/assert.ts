/**
 * ts中返回类型断言
 */

import { Equal, Expect, ExpectNot } from './utils';

// #region 1. as const

function isString(value: any): value is string {
  return typeof value === 'string';
}

const value: any = 'hello';
type Case1_1 = ExpectNot<Equal<typeof value, string>>;
if (isString(value)) {
  type Case1_2 = Expect<Equal<typeof value, string>>;
}

// #endregion

// #region 2. assert Type

function assertType<T>(value: any, type?: string): asserts value is T {
  if (typeof value !== 'string') {
    throw new Error(type ? `Expected ${type} but got ${typeof value}` : 'Type assertion failed');
  }
}

const value2: any = 'hello';
type Case2_1 = ExpectNot<Equal<typeof value2, string>>;

assertType<string>(value2, 'string');
type Case2_2 = Expect<Equal<typeof value2, string>>;

// #endregion

// #region 3. assert Condition

function assertCondition<T extends boolean>(condition: T, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message || 'Condition failed');
  }
}

const value3: any = 'hello';
type Case3_1 = ExpectNot<Equal<typeof value3, string>>;

assertCondition(isString(value3));
type Case3_2 = Expect<Equal<typeof value3, string>>;

// #endregion

// #region 4. assert is defined

function assertIsDefined<T>(value: T | null | undefined, message?: string): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(message || 'Value is not defined');
  }
}

const a = null;
type Case4_1 = Expect<Equal<typeof a, null>>;

assertIsDefined(a);
type Case4_2 = ExpectNot<Equal<typeof a, null>>;

// #endregion
