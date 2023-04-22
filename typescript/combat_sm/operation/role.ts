import { ERoleState } from '../interface/buff_info';
import { IRoleInfo } from '../interface/role_info';
import { BuffManager } from './buff';
import {
 IBuffManager, IRole, ISkillMananger, IStateManager,
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

    public constructor(public config: IRoleInfo) {
        this.mHp = config.maxHp;
        this.maxHp = config.maxHp;
    }

    public get id() {
        return this.config.id;
    }

    public get hp() {
        return this.mHp;
    }

    public takeDamage(damage: number) {
        this.mHp -= damage;
    }

    public isDead() {
        return this.mHp <= 0;
    }
}
