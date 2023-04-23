import { logT } from '../common/log';
import { ERoleState } from '../interface/buff_info';
import { IRoleInfo } from '../interface/role_info';
import { BuffManager } from './buff';
import { GameLoop } from './game_loop';
import {
 IBuffManager, IRole, ISkillMananger, IStateManager, IWorld,
} from './interface';
import { SkillManager } from './skill';

class StateManager implements IStateManager {
    private states: Set<ERoleState> = new Set();

    public constructor(public role: IRole) {}

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

    public readonly maxHp: number;
    public readonly buffManager: IBuffManager = new BuffManager(this);
    public readonly skillManager: ISkillMananger = new SkillManager(this);
    public readonly stateManager: IStateManager = new StateManager(this);

    public constructor(public config: IRoleInfo, public world: IWorld) {
        this.mHp = config.maxHp;
        this.maxHp = config.maxHp;

        GameLoop.instance.addObj(this);
    }

    public get name() {
        return this.config.id;
    }

    public get id() {
        return this.config.id;
    }

    public get hp() {
        return this.mHp;
    }

    public get camp() {
        return this.config.camp;
    }

    public takeDamage(who: IRole, damage: number) {
        logT(`${this.id} take damage ${damage} from ${who.id}`);
        this.mHp -= damage;
    }

    public isDead() {
        return this.mHp <= 0;
    }

    public update() {
        this.buffManager.update();
        this.skillManager.update();
        return false;
    }
}
