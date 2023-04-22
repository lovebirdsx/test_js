import yargs from 'yargs';
import { log } from 'console';
import { testSmBasic } from './test/test_sm_basic';
import { testInnerSmNoPending, testInnerSmPending } from './test/test_inner_sm';
import { cyan } from './common/color';
import { startTimeSerivce, stopTimeService } from './common/time';
import { logT } from './common/log';
import { testBossSm } from './test/test_boss_sm';

const tests: { enable: boolean, func: () => Promise<void> }[] = [
    { enable: false, func: testSmBasic },
    { enable: false, func: testInnerSmPending },
    { enable: false, func: testInnerSmNoPending },
    { enable: true, func: testBossSm },
];

async function runTests() {
    for (const test of tests) {
        if (test.enable) {
            logT(`${cyan(test.func.name).padEnd(80, '-')}`);
            // eslint-disable-next-line no-await-in-loop
            await test.func();
            log();
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
    logT('main finished');
}

main();
