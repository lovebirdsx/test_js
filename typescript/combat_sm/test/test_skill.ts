import { createRole } from '../operation/role';
import { World } from '../operation/world';

export async function testSkill() {
    const world = new World();
    const player = createRole('玩家', world, true);
    const skill = player.castSkill('对自己造成伤害');

    await skill.waitFinished();
}
