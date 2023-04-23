import { blue, red, yellow } from '../common/color';
import { logT } from '../common/log';
import { ERoleState } from '../interface/buff_info';
import { IRoleInfo, getRoleInfo } from '../interface/role_info';
import { getSkillInfo } from '../interface/skill_info';
import { getSmRunnerInfo } from '../interface/sm_info';
import { BuffManager } from './buff';
import { GameLoop } from './game_loop';
import {
 IBuffManager, IRole, ISkill, ISkillMananger, ISmRunner, IStateManager, IWorld,
} from './interface';
import { Skill, SkillManager } from './skill';
import { SmRunner } from './sm';

class StateManager implements IStateManager {
    private states: Set<ERoleState> = new Set();

    constructor(public role: IRole) {}

    add(state: ERoleState): void {
        this.states.add(state);
    }
    remove(state: ERoleState): void {
        this.states.delete(state);
    }
    has(state: ERoleState): boolean {
        return this.states.has(state);
    }
}

export class Role implements IRole {
    private mHp: number;

    readonly maxHp: number;
    readonly buffManager: IBuffManager = new BuffManager(this);
    readonly skillManager: ISkillMananger = new SkillManager(this);
    readonly stateManager: IStateManager = new StateManager(this);
    readonly smRunner: ISmRunner;

    constructor(public config: IRoleInfo, public world: IWorld) {
        this.mHp = config.maxHp;
        this.maxHp = config.maxHp;
        const smRunnerInfo = getSmRunnerInfo(config.sm);
        this.smRunner = new SmRunner(smRunnerInfo);
        this.smRunner.role = this;

        GameLoop.instance.addObj(this);
        world.addRole(this);
    }

    get name() {
        return this.config.id;
    }

    get attack() {
        return this.config.attack;
    }

    get id() {
        return this.config.id;
    }

    get hp() {
        return this.mHp;
    }

    get camp() {
        return this.config.camp;
    }

    takeDamage(who: IRole, damage: number) {
        this.mHp -= damage;
        if (this.mHp < 0) {
            this.mHp = 0;
        }

        logT(`${yellow(this.id)} hp -= ${red(damage.toString())} by ${yellow(who.id)}`);

        if (this.isDead()) {
            logT(`${yellow(this.id)} is ${red('dead')}`);
            this.world.removeRole(this);
        }
    }

    isDead() {
        return this.mHp <= 0;
    }

    castSkill(skillId: string): ISkill {
        const skillInfo = getSkillInfo(skillId);
        const skill = new Skill(skillInfo, this);
        this.skillManager.cast(skill);
        return skill;
    }

    update() {
        if (!this.isDead()) {
            this.buffManager.update();
            this.skillManager.update();
            this.smRunner.update();
        }

        return this.isDead();
    }
}

export function createRole(roleId: string, world: IWorld, pauseAi?: boolean) {
    const roleInfo = getRoleInfo(roleId);
    const role = new Role(roleInfo, world);
    role.smRunner.paused = pauseAi || false;
    return role;
}
