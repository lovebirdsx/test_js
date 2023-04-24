import {
 cyan, green, red, yellow,
} from '../common/color';
import { logT } from '../common/log';
import { getRoleInfo } from '../config/role_cfg';
import { getSkillInfo } from '../config/skill_cfg';
import { getSmRunnerInfo } from '../config/sm_cfg';
import { ERoleState } from '../interface/buff_info';
import {
 IRoleInfo, whiteBarConfig,
} from '../interface/role_info';
import { EOp } from '../interface/sm_action_info';
import { BuffManager } from './buff';
import { GameLoop } from './game_loop';
import {
 IBuffManager, IRole, ISkill, ISkillMananger, ISmRunner, IStateManager, IWorld, RoleEventDispatcher,
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
    private mWhiteBar = whiteBarConfig.max;
    private lastDamageTime = 0;
    private lastRecoverWhiteBarTime = 0;

    readonly maxHp: number;
    readonly buffManager: IBuffManager = new BuffManager(this);
    readonly skillManager: ISkillMananger = new SkillManager(this);
    readonly stateManager: IStateManager = new StateManager(this);
    readonly event: RoleEventDispatcher = new RoleEventDispatcher();
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

    get whiteBar() {
        return this.mWhiteBar;
    }

    set whiteBar(value: number) {
        this.mWhiteBar = value;
        if (this.mWhiteBar < 0) {
            this.mWhiteBar = 0;
        }
        if (this.mWhiteBar > whiteBarConfig.max) {
            this.mWhiteBar = whiteBarConfig.max;
        }
        logT(`${yellow(this.id)} 白条=${cyan(this.mWhiteBar.toString())}`);
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

    opWhiteBar(op: EOp, value: number): number {
        switch (op) {
            case EOp.加:
                this.whiteBar += value;
                break;
            case EOp.减:
                this.whiteBar -= value;
                break;
            case EOp.乘:
                this.whiteBar *= value;
                break;
            case EOp.除:
                this.whiteBar /= value;
                break;
            case EOp.设定:
                this.whiteBar = value;
                break;
            default:
                throw new Error(`unknown op ${op}`);
        }
        return this.whiteBar;
    }

    takeDamage(who: IRole, damage: number) {
        this.lastDamageTime = GameLoop.instance.time;
        this.lastRecoverWhiteBarTime = this.lastDamageTime;
        this.mHp -= damage;
        if (this.mHp < 0) {
            this.mHp = 0;
        }

        logT(`${yellow(this.id)} HP-${red(damage.toString())} [${this.mHp}/${this.maxHp}] by ${yellow(who.id)}`);
        if (this.config.hasWhiteBar) {
            this.whiteBar -= whiteBarConfig.perDamage;
        }
        this.event.dispatch('Damaged');

        if (this.isDead()) {
            logT(`${yellow(this.id)} ${red('死亡')}`);
            this.world.removeRole(this);
            this.event.dispatch('Dead');
        }
    }

    recoverHp(hp: number) {
        this.mHp += hp;
        if (this.mHp > this.maxHp) {
            this.mHp = this.maxHp;
        }

        logT(`${yellow(this.id)} HP+${green(hp.toString())} [${this.mHp}/${this.maxHp}]`);
        this.event.dispatch('RecoverHp');
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

    private updateWhiteBar() {
        const cfg = whiteBarConfig;
        if (GameLoop.instance.time - this.lastDamageTime > cfg.recoverDelay && this.whiteBar < cfg.max) {
            if (GameLoop.instance.time - this.lastRecoverWhiteBarTime > cfg.recoverInterval) {
                const count = cfg.recoverInterval * cfg.recoverSpeed;
                this.lastRecoverWhiteBarTime += cfg.recoverInterval;
                this.whiteBar += count;
                logT(`${yellow(this.id)} WB+${green(count.toString())}[${this.whiteBar}/${cfg.max}]`);
            }
        }
    }

    update() {
        if (!this.isDead()) {
            this.buffManager.update();
            this.skillManager.update();
            this.smRunner.update();
            this.updateWhiteBar();
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
