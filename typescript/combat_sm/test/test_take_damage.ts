/* eslint-disable no-await-in-loop */
import { GameLoop } from '../operation/game_loop';
import { createRole } from '../operation/role';
import { World } from '../operation/world';

export async function testTakeDamage() {
    const world = new World();
    const player = createRole('玩家', world, true);
    const monster = createRole('小怪', world, true);

    while (!monster.isDead()) {
        const skill = player.castSkill('对敌方造成伤害');
        await skill.waitFinished();
        await GameLoop.instance.wait(1);
    }
}
