import { testContext } from './context';
import { ITestSuite, ITestCase, TestFunc } from './test_op';

class Expect<T> {
    constructor(private value: T) {
    }

    toBe(expected: T): void {
        if (this.value !== expected) {
            throw new Error(`Expect: ${this.value} !== ${expected}`);
        }
    }

    toEqual(expected: T) {
        return JSON.stringify(this.value) === JSON.stringify(expected);
    }

    toBeTruthy(): void {
        if (!this.value) {
            throw new Error(`Expect: ${this.value} is not truthy`);
        }
    }

    toBeUndefined(): void {
        if (this.value !== undefined) {
            throw new Error(`Expect: ${this.value} is not undefined`);
        }
    }
}

export function beforeEach(func: TestFunc) {
    const suite = testContext.currentSuite;
    suite.beforeEach = func;
}

export function afterEach(func: TestFunc) {
    const suite = testContext.currentSuite;
    suite.afterEach = func;
}

export function beforeAll(func: TestFunc) {
    const suite = testContext.currentSuite;
    suite.beforeAll = func;
}

export function afterAll(func: TestFunc) {
    const suite = testContext.currentSuite;
    suite.afterAll = func;
}

export function describe(name: string, func: () => void) {
    const suite: ITestSuite = {
        type: 'suite',
        name,
        cases: [],
        isSelect: true,
        run: func,
    };

    testContext.pushSuite(suite);
    func();
    testContext.popSuite();
}

export function it(name: string, func: TestFunc, timeOut?: number) {
    const testCase: ITestCase = {
        type: 'case',
        name,
        run: func,
        runTime: 0,
        result: false,
        isSelect: true,
    };
    testContext.currentSuite.cases.push(testCase);
}

export function expect<T>(value: T): Expect<T> {
    return new Expect(value);
}
