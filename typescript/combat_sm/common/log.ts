import { GameLoop } from '../operation/game_loop';

export function logT(str: string) {
    console.log(`${GameLoop.instance.time.toFixed(1).padStart(4)} ${str}`);
}
