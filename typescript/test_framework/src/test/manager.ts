/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import * as fs from 'fs';
import * as path from 'path';
import { TestOp, testContext } from './test_op';

async function scanFiles(directory: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, { recursive: true }, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            const testFiles = (files as string[]).filter((f) => f.endsWith('.test.ts'));
            resolve(testFiles);
        });
    });
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

        const files = await scanFiles('.');
        for (const f of files) {
            const relativePath = path.relative(__dirname, f);
            try {
                import(relativePath.replace('.ts', ''));
            } catch (e) {
                console.error(`import test file ${relativePath} failed: ${e}`);
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
