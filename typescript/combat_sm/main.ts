import yargs from 'yargs';
import { log } from 'console';
import { testSmBasic } from './test/test_sm_basic';
import { testInnerSmNoPending, testInnerSmPending } from './test/test_inner_sm';
import { cyan } from './common/color';
import { logT } from './common/log';
import { testBossSm } from './test/test_boss_sm';
import { GameLoop } from './operation/game_loop';

const tests: { enable: boolean, func: () => Promise<void> }[] = [
    { enable: true, func: testSmBasic },
    { enable: true, func: testInnerSmPending },
    { enable: true, func: testInnerSmNoPending },
    { enable: true, func: testBossSm },
];

async function runTests() {
    for (const test of tests) {
        if (test.enable) {
            logT(`${cyan(test.func.name).padEnd(80, '-')}`);
            // eslint-disable-next-line no-await-in-loop
            await test.func();
        }
    }
    GameLoop.instance.stop();
}

async function runGame() {
    const game = GameLoop.instance;
    game.start();
    while (game.isRunning) {
        const promise = new Promise<void>((resolve) => {
            game.update();
            resolve();
        });
        await promise;
    }
    logT('game stopped');
}

function main() {
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
        void runTests();
    }

    void runGame();
}

main();
