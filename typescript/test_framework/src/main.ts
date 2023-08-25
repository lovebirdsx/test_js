import { Editor } from './editor/editor';
import { Game } from './game/game';

function main() {
    const game = new Game();
    const editor = new Editor();

    game.start();
    editor.start();
}

main();
