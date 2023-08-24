import { ITestSuite } from './test_op';

export class TestContext {
    private suiteStack: ITestSuite[] = [];

    public readonly rootSuite: ITestSuite = {
        type: 'suite',
        name: 'root',
        cases: [],
        isSelect: true,
        run: async () => {},
    };

    constructor() {
        this.suiteStack.push(this.rootSuite);
    }

    get currentSuite(): ITestSuite {
        return this.suiteStack[this.suiteStack.length - 1];
    }

    pushSuite(suite: ITestSuite) {
        if (this.suiteStack.length === 0) {
            throw new Error('suite stack is empty');
        }

        const parentSuite = this.suiteStack[this.suiteStack.length - 1];
        parentSuite.cases.push(suite);
        this.suiteStack.push(suite);
    }

    popSuite() {
        if (this.suiteStack.length === 0) {
            throw new Error('suite stack is empty');
        }

        this.suiteStack.pop();
    }
}

export const testContext = new TestContext();
