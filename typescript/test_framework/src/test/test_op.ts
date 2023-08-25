import {
 blue, cyan, green, red,
} from '../common/color';

// 测试用例的默认超时时间
const DEFAULT_TIMEOUT = 3000;

export type TestFunc = (() => Promise<void>) | (() => void);

// 测试用例
export interface ITestCase {
    type: 'case';
    name: string;
    run: TestFunc;
    result: boolean;
    isSelect: boolean;
    runTime: number;
    fileLocation: string;
    timeOut?: number;
    error?: Error;
}

// 测试套件
export interface ITestSuite {
    type: 'suite';
    name: string;
    isSelect: boolean;
    cases: TTestNode[];
    run: TestFunc;
    beforeAll?: TestFunc;
    afterAll?: TestFunc;
    beforeEach?: TestFunc;
    afterEach?: TestFunc;
}

type TTestNode = ITestSuite | ITestCase;

export class TestContext {
    private suiteStack: ITestSuite[] = [];
    private currentCase: ITestCase | undefined;

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

    get currentTest(): ITestCase {
        if (!this.currentCase) {
            throw new Error('current test case is undefined');
        }
        return this.currentCase;
    }

    set currentTest(testCase: ITestCase) {
        this.currentCase = testCase;
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
        this.currentCase = undefined;
    }
}

function beatifyError(error: Error, prefix: string): string {
    const lines = error.message?.split('\n') ?? [];
    const newLines = lines.map((l) => `${prefix}${l}`);
    return newLines.join('\n');
}

export const testContext = new TestContext();

export class TestOp {
    static select(node: TTestNode, isSelect: boolean = true) {
        node.isSelect = isSelect;
        if (node.type === 'suite') {
            node.cases.forEach((c) => {
                TestOp.select(c, isSelect);
            });
        }
    }

    static output(node: TTestNode, prefix: string = '') {
        if (node.type === 'case') {
            console.log(`${prefix}[${blue(node.name)}] ${node.result ? green('OK') : red('FAIL')} ${node.runTime}ms ${node.fileLocation}`);
            if (!node.result && node.error) {
                console.log(beatifyError(node.error, `${prefix}  `));
            }
            return;
        }
        console.log(`${prefix}# ${cyan(node.name)}`);
        node.cases.forEach((c) => {
            TestOp.output(c, `${prefix}  `);
        });
    }

    static async runSuite(suite: ITestSuite): Promise<void> {
        if (!suite.isSelect) {
            return;
        }

        await suite.beforeAll?.();
        for (const c of suite.cases) {
            if (c.type === 'suite') {
                await TestOp.runSuite(c);
                continue;
            }

            await this.runCase(suite, c);
        }
        await suite.afterAll?.();
    }

    private static async runCaseAsync(suite: ITestSuite, testCase: ITestCase): Promise<void> {
        if (!testCase.isSelect) {
            return;
        }

        try {
            const startTime = Date.now();
            await suite.beforeEach?.();
            await testCase.run();
            await suite.afterEach?.();
            testCase.result = true;
            testCase.runTime = Date.now() - startTime;
        } catch (e: any) {
            testCase.result = false;
            testCase.error = e;
        }
    }

    static async runCase(suite: ITestSuite, testCase: ITestCase): Promise<void> {
        return new Promise((resolve) => {
            testContext.currentTest = testCase;
            const timeOut = testCase.timeOut ?? DEFAULT_TIMEOUT;
            const timer = setTimeout(() => {
                testCase.result = false;
                testCase.error = new Error(`Reason: timeout for ${timeOut} ms\nFile  : ${testCase.fileLocation}`);
                resolve();
            }, testCase.timeOut ?? DEFAULT_TIMEOUT);

            this.runCaseAsync(suite, testCase).then(() => {
                clearTimeout(timer);
                resolve();
            });
        });
    }
}
