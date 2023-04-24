import { GameLoop } from '../operation/game_loop';
import { createRole } from '../operation/role';
import { World } from '../operation/world';

export async function testBossAI() {
    const world = new World();
    const player = createRole('玩家', world);
    const monster = createRole('猩猩', world);
    await GameLoop.instance.waitCondition(() => monster.isDead() || player.isDead());
    await GameLoop.instance.wait(1);
}
