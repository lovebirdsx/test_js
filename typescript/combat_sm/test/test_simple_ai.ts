import { GameLoop } from '../operation/game_loop';
import { createRole } from '../operation/role';
import { World } from '../operation/world';

export async function testSimpleAI() {
    const world = new World();
    const player = createRole('玩家-简单AI', world);
    const monster = createRole('小怪', world);
    await GameLoop.instance.waitCondition(() => monster.isDead() || player.isDead());
    await GameLoop.instance.wait(1);
}
