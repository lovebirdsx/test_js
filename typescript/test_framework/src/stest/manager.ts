// 测试用例
export interface ITestCase {
    type: 'case';
    name: string;
    run(): Promise<void>;
    enter?: () => Promise<void>;
    leave?: () => Promise<void>;
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
    enter?: () => Promise<void>;
    leave?: () => Promise<void>;
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

    static async runSuite(suite: ITestSuite): Promise<void> {
        if (!suite.isSelect) {
            return;
        }
        if (suite.enter) {
            await suite.enter();
        }
        for (const c of suite.cases) {
            await TestOp.run(c);
        }
        if (suite.leave) {
            await suite.leave();
        }
    }

    static async runCase(testCase: ITestCase): Promise<void> {
        if (!testCase.isSelect) {
            return;
        }
        if (testCase.enter) {
            await testCase.enter();
        }
        try {
            await testCase.run();
            testCase.result = true;
        } catch (e) {
            testCase.result = false;
            testCase.error = e;
        }
        if (testCase.leave) {
            await testCase.leave();
        }
    }
}
