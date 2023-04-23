/* eslint-disable no-await-in-loop */
import yargs from 'yargs';
import { testSmBasic, testSmLoop } from './test/test_sm_basic';
import { testInnerSmNoPending, testInnerSmPending } from './test/test_inner_sm';
import { cyan, green, red } from './common/color';
import { logT } from './common/log';
import { testBossSm } from './test/test_boss_sm';
import { GameLoop } from './operation/game_loop';
import { testSkill } from './test/test_skill';
import { testTakeDamage } from './test/test_take_damage';
import { testSimpleAI } from './test/test_simple_ai';

const tests: { enable: boolean, func: () => Promise<void> }[] = [
    { enable: false, func: testSmBasic },
    { enable: false, func: testSmLoop },
    { enable: false, func: testInnerSmPending },
    { enable: false, func: testInnerSmNoPending },
    { enable: false, func: testBossSm },
    { enable: false, func: testSkill },
    { enable: false, func: testTakeDamage },
    { enable: true, func: testSimpleAI },
];

async function runTests() {
    for (const test of tests) {
        if (test.enable) {
            logT(`${cyan(test.func.name).padEnd(80, '-')}`);
            try {
                await test.func();
            } catch (e) {
                logT(`${red(`${e}`)}`);
            }
        }
    }

    GameLoop.instance.stop();
}

async function runGame() {
    const gameloop = GameLoop.instance;
    gameloop.start();
    while (gameloop.isRunning) {
        const promise = new Promise<void>((resolve) => {
            gameloop.update();
            resolve();
        });
        // eslint-disable-next-line no-await-in-loop
        await promise;
    }
    logT(green('game loop stopped'));
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

    runGame();

    if (argv.test) {
        runTests();
    }
}

main();
