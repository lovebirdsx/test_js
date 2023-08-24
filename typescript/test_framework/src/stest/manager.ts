/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import * as fs from 'fs';
import { testContext } from './context';
import { TestOp } from './test_op';

async function scanFiles(directory: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, { recursive: true }, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            const testFiles = (files as string[]).filter((f) => f.endsWith('.stest.js'));
            resolve(testFiles);
        });
    });
}

export class TestManager {
    constructor(public dir: string) {
    }

    private async importTests() {
        const files = await scanFiles(this.dir);
        for (const f of files) {
            const fullPath = `${this.dir}/${f}`;
            try {
                require(fullPath);
            } catch (e) {
                console.error(`import test file ${fullPath} failed: ${e}`);
            }
        }
    }

    async runTests() {
        await this.importTests();
        const { rootSuite } = testContext;
        await TestOp.run(rootSuite);
        await TestOp.output(rootSuite);
    }
}
