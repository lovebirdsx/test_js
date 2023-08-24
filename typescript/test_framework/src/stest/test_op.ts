// 测试用例
export interface ITestCase {
    type: 'case';
    name: string;
    run(): Promise<void>;
    result: boolean;
    isSelect: boolean;
    timeOut?: number;
    error?: unknown;
}

// 测试套件
export interface ITestSuite {
    type: 'suite';
    name: string;
    isSelect: boolean;
    cases: TTestNode[];
    run: () => void;
    beforeAll?: () => Promise<void>;
    afterAll?: () => Promise<void>;
    beforeEach?: () => Promise<void>;
    afterEach?: () => Promise<void>;
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

    static run(node: TTestNode): Promise<void> {
        if (node.type === 'case') {
            return TestOp.runCase(node);
        }
        return TestOp.runSuite(node);
    }

    static output(node: TTestNode, prefix: string = '') {
        if (node.type === 'case') {
            console.log(`${prefix}${node.name} ${node.result ? 'OK' : 'FAIL'}`);
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
        if (suite.beforeAll) {
            await suite.beforeAll();
        }
        for (const c of suite.cases) {
            if (suite.beforeEach) {
                await suite.beforeEach();
            }
            await TestOp.run(c);
            if (suite.afterEach) {
                await suite.afterEach();
            }
        }
        if (suite.afterAll) {
            await suite.afterAll();
        }
    }

    static async runCase(testCase: ITestCase): Promise<void> {
        try {
            await testCase.run();
            testCase.result = true;
        } catch (e) {
            testCase.result = false;
            testCase.error = e;
        }
    }
}
