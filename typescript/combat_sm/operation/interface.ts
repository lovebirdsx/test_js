import { ERoleState } from '../interface/buff_info';
import { ECamp } from '../interface/role_info';
import { ESkillTarget } from '../interface/skill_info';

export interface IGameObj {
    name: string;
    update(): boolean;
}

export interface IBuff {
    id: string;
}

export interface IBuffManager {
    addBuff(buffId: string): void;
    removeBuff(buffId: string): void;
    update(): void;
}

export interface ISkill {
    target: ESkillTarget;
    // eslint-disable-next-line no-use-before-define
    owner: IRole;
    finished: boolean;
    update(): boolean;
}

export interface ISkillMananger {
    cast(skill: ISkill): void;
    isCasting: boolean;
    update(): void;
}

export interface IStateManager {
    add(state: ERoleState): void;
    remove(state: ERoleState): void;
    has(state: ERoleState): boolean;
}

export interface IRole extends IGameObj {
    id: string;
    maxHp: number;
    camp: ECamp;
    // eslint-disable-next-line no-use-before-define
    world: IWorld;
    buffManager: IBuffManager;
    skillManager: ISkillMananger;
    stateManager: IStateManager;
    takeDamage(who: IRole, damage: number): void;
    isDead(): boolean;
}

export interface IWorld {
    addRole(role: IRole): void;
    removeRole(role: IRole): void;
    findTarget(role: IRole): IRole | undefined;
}
