export type TestFunc = (() => Promise<void>) | (() => void);

// 测试用例的默认超时时间
const DEFAULT_TIMEOUT = 3000;

// 测试用例
export interface ITestCase {
    type: 'case';
    name: string;
    run: TestFunc;
    result: boolean;
    isSelect: boolean;
    runTime: number;
    timeOut?: number;
    error?: unknown;
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
            console.log(`${prefix}${node.name} ${node.result ? 'OK' : 'FAIL'} ${node.runTime}ms`);
            if (!node.result) {
                console.log(node.error);
            }
            return;
        }
        console.log(`${prefix}${node.name}`);
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
        } catch (e) {
            testCase.result = false;
            testCase.error = e;
        }
    }

    static async runCase(suite: ITestSuite, testCase: ITestCase): Promise<void> {
        return new Promise((resolve) => {
            const timer = setTimeout(() => {
                testCase.result = false;
                testCase.error = new Error(`Test case ${testCase.name} timeout`);
                resolve();
            }, testCase.timeOut ?? DEFAULT_TIMEOUT);

            this.runCaseAsync(suite, testCase).then(() => {
                clearTimeout(timer);
                resolve();
            });
        });
    }
}
