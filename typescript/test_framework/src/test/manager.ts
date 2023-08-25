/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import * as fs from 'fs';
import * as path from 'path';
import { testContext } from './context';
import { TestOp } from './test_op';

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

function getTestRootDir() {
    return path.join(__dirname, '..', '..');
}

export class TestManager {
    private static myInstance: TestManager;

    static get instance() {
        if (!TestManager.myInstance) {
            TestManager.myInstance = new TestManager(getTestRootDir());
        }
        return TestManager.myInstance;
    }

    private isTestImported = false;

    private constructor(public dir: string) {
    }

    private async importTests() {
        if (this.isTestImported) {
            return;
        }

        const files = await scanFiles(this.dir);
        for (const f of files) {
            const fullPath = `${this.dir}/${f}`;
            try {
                require(fullPath);
            } catch (e) {
                console.error(`import test file ${fullPath} failed: ${e}`);
            }
        }
        this.isTestImported = true;
    }

    async runTests() {
        await this.importTests();
        const { rootSuite } = testContext;
        await TestOp.runSuite(rootSuite);
        await TestOp.output(rootSuite);
    }
}
