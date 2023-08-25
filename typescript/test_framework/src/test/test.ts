import { getCallerLocation } from '../common/souce_map';
import {
    ITestSuite, ITestCase, TestFunc, testContext,
} from './test_op';

class Expect<T> {
    readonly testCase = testContext.currentTest;
    readonly suite = testContext.currentSuite;
    constructor(private value: T) {
    }

    private get fileLocation(): string {
        return getCallerLocation(2);
    }

    toBe(expected: T): void {
        if (this.value !== expected) {
            throw new Error(`Expect: ${expected}\nValue : ${this.value}\nFile  : ${this.fileLocation}`);
        }
    }

    toEqual(expected: T) {
        if (JSON.stringify(this.value) !== JSON.stringify(expected)) {
            throw new Error(`Expect: ${JSON.stringify(expected)}\nValue : ${JSON.stringify(this.value)}\nFile  : ${this.fileLocation}`);
        }
    }

    toBeTruthy(): void {
        if (!this.value) {
            throw new Error(`Reason: Value is not true\nFile  : ${this.fileLocation}`);
        }
    }

    toBeUndefined(): void {
        if (this.value !== undefined) {
            throw new Error(`Reason: Value is not undefined\nFile  : ${this.fileLocation}`);
        }
    }

    toThrowError(): void {
        if (typeof this.value !== 'function') {
            throw new Error(`Reason: Value is not a function\nFile  : ${this.fileLocation}`);
        }

        let isThrowError = false;
        try {
            this.value();
        } catch (error) {
            isThrowError = true;
        }

        if (!isThrowError) {
            throw new Error(`Reason: not throw error\nFile  : ${this.fileLocation}`);
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
        fileLocation: getCallerLocation(1),
        timeOut,
    };
    testContext.currentSuite.cases.push(testCase);
}

export function expect<T>(value: T): Expect<T> {
    return new Expect(value);
}
