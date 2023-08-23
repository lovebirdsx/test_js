import { getLevelConfig } from '../../config/level';
import { Level } from './level';

export class Game {
    level: Level;

    constructor() {
        this.level = new Level(getLevelConfig(1));
    }

    async start() {
        console.log('game started');
        console.log(this.level.toString());
    }
}
