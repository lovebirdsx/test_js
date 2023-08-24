// 提供类似jest中的测试接口，实现一个简单的测试框架

import { ITestSuite, ITestCase } from './manager';

class Expect<T> {
    constructor(private value: T) {
    }

    toBe(expected: T): void {
        if (this.value !== expected) {
            throw new Error(`Expect: ${this.value} !== ${expected}`);
        }
    }

    toBeTruthy(): void {
        if (!this.value) {
            throw new Error(`Expect: ${this.value} is not truthy`);
        }
    }
}

export function describe(name: string, func: () => Promise<void>): ITestSuite {
    const suite: ITestSuite = {
        name,
        cases: [],
    };
    return suite;
}

export function it(name: string, func: () => Promise<void>): ITestCase {
    const testCase: ITestCase = {
        name,
        run: func,
        result: false,
    };
    return testCase;
}

export function expect<T>(value: T): Expect<T> {
    return new Expect(value);
}
