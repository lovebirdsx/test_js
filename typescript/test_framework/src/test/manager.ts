/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import * as fs from 'fs';
import * as path from 'path';
import { log } from 'console';
import { ITestSuite, TestOp, testContext } from './test_op';

async function scanFiles(directory: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, { recursive: true }, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            const testFiles = (files as string[]).filter((f) => f.endsWith('.test.js'));
            resolve(testFiles);
        });
    });
}

export interface ITestConfig {
    filter?: string;
}

export class TestManager {
    private static myInstance: TestManager;

    static get instance() {
        if (!TestManager.myInstance) {
            TestManager.myInstance = new TestManager();
        }
        return TestManager.myInstance;
    }

    private isTestImported = false;

    private constructor() {
    }

    private async importTests() {
        if (this.isTestImported) {
            return;
        }

        const dir = path.join(__dirname, '..', '..', 'test');
        const files = await scanFiles(dir);
        for (const f of files) {
            const relativePath = path.relative(__dirname, path.join(dir, f));
            try {
                import(relativePath.replace('.js', ''));
            } catch (e) {
                console.error(`import test file ${relativePath} failed: ${e}`);
            }
        }
        this.isTestImported = true;
    }

    private allpyFilter(suite: ITestSuite, filter: string) {
        TestOp.selectByFilter(suite, filter);
    }

    private applyConfig(suite: ITestSuite, config?: ITestConfig) {
        if (config?.filter) {
            this.allpyFilter(suite, `root ${config.filter}`);
        }
    }

    async runTests(config?: ITestConfig) {
        log('config = ', config);
        await this.importTests();

        const { rootSuite } = testContext;
        this.applyConfig(rootSuite, config);
        await TestOp.runSuite(rootSuite);
    }

    outputTestResult() {
        const { rootSuite } = testContext;
        log('');
        TestOp.output(rootSuite);
        log('');
    }
}
