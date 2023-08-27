import { ITestConfig, TestManager } from './test/manager';

function getTestFilter() {
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] === '-t') {
            return process.argv[i + 1];
        }
    }
    return undefined;
}

async function test() {
    const config: ITestConfig = {
        filter: getTestFilter(),
    };

    await TestManager.instance.runTests(config);
    TestManager.instance.outputTestResult();
}

test();
