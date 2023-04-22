import yargs from 'yargs';
import { log } from 'console';
import { testSmBasic } from './test/test_sm_basic';
import { testInnerSm } from './test/test_inner_sm';
import { cyan } from './common/color';

const tests: { name: string; enable: boolean, func: () => Promise<void> }[] = [
    { name: 'testSmBasic', enable: false, func: testSmBasic },
    { name: 'testInnerSm', enable: true, func: testInnerSm },
];

async function runTests() {
    for (const test of tests) {
        if (test.enable) {
            log(`${cyan(test.name)} ------------------------`);
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

    if (argv.test) {
        await runTests();
    }
}

main();
