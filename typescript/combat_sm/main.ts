import yargs from 'yargs';
import { log } from 'console';
import { testSmBasic } from './test/test_sm_basic';
import { testInnerSmNoPending, testInnerSmPending } from './test/test_inner_sm';
import { cyan } from './common/color';
import { startTimeSerivce, stopTimeService } from './common/time';

const tests: { enable: boolean, func: () => Promise<void> }[] = [
    { enable: false, func: testSmBasic },
    { enable: true, func: testInnerSmPending },
    { enable: true, func: testInnerSmNoPending },
];

async function runTests() {
    for (const test of tests) {
        if (test.enable) {
            log(`${cyan(test.func.name)} ------------------------`);
            // eslint-disable-next-line no-await-in-loop
            await test.func();
        }
    }
}

async function main() {
    const argv = yargs(process.argv.slice(2)).options({
        test: {
            type: 'boolean',
            default: false,
            describe: 'run test',
            alias: 't',
        },
    }).help().alias('help', 'h')
    .parseSync();

    if (argv.help) {
        return;
    }

    startTimeSerivce();
    if (argv.test) {
        await runTests();
    }
    stopTimeService();
}

main();
