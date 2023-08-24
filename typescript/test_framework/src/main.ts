import * as path from 'path';
import { Editor } from './editor/editor';
import { Game } from './game/game';
import { TestManager } from './stest/manager';

function main() {
    const game = new Game();
    const editor = new Editor();

    game.start();
    editor.start();
}

async function test() {
    const rootDir = path.join(__dirname, '..');
    const test = new TestManager(rootDir);
    await test.runTests();
}

test();
