/* eslint-disable no-use-before-define */
import { ERoleState } from '../interface/buff_info';
import { ECamp } from '../interface/role_info';
import { ESkillTarget } from '../interface/skill_info';
import { EOp } from '../interface/sm_action_info';
import { EventDispatcher } from './event_dispatcher';
import { VarMananger } from './var';

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
    targetType: ESkillTarget;
    owner: IRole;
    id: string;
    finished: boolean;
    force: boolean;
    cast(): void;
    update(): boolean;
    waitFinished(): Promise<void>;
}

export interface ISkillMananger {
    isFinished(skill: string): boolean;
    cast(skill: ISkill): void;
    isCasting: boolean;
    update(): void;
}

export interface IStateManager {
    add(state: ERoleState): void;
    remove(state: ERoleState): void;
    has(state: ERoleState): boolean;
}

export const enum EUpdateResult {
    Running,
    Finished,
}

export interface ISm {
    id: string;
    str: string;
    update(): EUpdateResult;
}

export interface ISmRunner {
    role?: IRole;
    paused: boolean;
    spawn(smId: string, parent?: ISm): ISm;
    update(): boolean;
    varManager?: VarMananger;
}

const roleEventDefine = {
    Damaged: () => {},
    Dead: () => {},
    RecoverHp: () => {},
};

export class RoleEventDispatcher extends EventDispatcher<typeof roleEventDefine> {}

export interface IRole extends IGameObj {
    id: string;
    maxHp: number;
    hp: number;
    attack: number;
    whiteBar: number;
    camp: ECamp;
    world: IWorld;
    buffManager: IBuffManager;
    skillManager: ISkillMananger;
    stateManager: IStateManager;
    smRunner: ISmRunner;
    takeDamage(who: IRole, damage: number): void;
    recoverHp(hp: number): void;
    opWhiteBar(op: EOp, value: number): number;
    isDead(): boolean;
    castSkill(skillId: string): ISkill;
    event: RoleEventDispatcher;
}

export interface IWorld {
    addRole(role: IRole): void;
    removeRole(role: IRole): void;
    findTarget(role: IRole): IRole | undefined;
}
