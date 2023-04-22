import { ERoleState } from '../interface/buff_info';

export interface IBuff {
    id: string;
}

export interface IBuffManager {
    addBuff(buffId: string): void;
    removeBuff(buffId: string): void;
}

export interface ISkill {

}

export interface ISkillMananger {
    cast(skill: ISkill): void;
}

export interface IStateManager {
    add(state: ERoleState): void;
    remove(state: ERoleState): void;
    has(state: ERoleState): boolean;
}

export interface IRole {
    id: string;
    maxHp: number;
    buffManager: IBuffManager;
    skillManager: ISkillMananger;
    stateManager: IStateManager;
    takeDamage(damage: number): void;
    isDead(): boolean;
}
