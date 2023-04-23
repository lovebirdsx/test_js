import { log } from 'console';
import { IRoleInfo } from '../interface/role_info';
import { ESkillAction, ESkillTarget, ISkillInfo } from '../interface/skill_info';
import { GameLoop } from '../operation/game_loop';
import { Role } from '../operation/role';
import { Skill } from '../operation/skill';
import { World } from '../operation/world';

const roleInfo: IRoleInfo = {
    id: 'role1',
    maxHp: 100,
    camp: 0,
    buffs: [],
};

const skillInfo: ISkillInfo = {
    id: 'skill1',
    target: ESkillTarget.自己,
    actions: [
        { type: ESkillAction.播放动画, animationId: 'animation1', duration: 1 },
        { type: ESkillAction.造成伤害, damage: 100 },
    ],
};

export async function testSkill() {
    const world = new World();

    const role = new Role(roleInfo, world);
    world.addRole(role);

    const skill = new Skill(skillInfo, role);
    role.skillManager.cast(skill);

    await GameLoop.instance.waitCondition(() => skill.finished);
}
