import {
    IConditionInfo, ECondition, ITimePassedCondition, ISkillFinishedCondition, IHasNoEnemyCondition, IHasEnemyCondition,
} from '../interface/condition_info';
import { GameLoop } from './game_loop';
import { IRole } from './interface';

export interface ICondition {
    isOk(role?: IRole): boolean;
}

class WaitCondition implements ICondition {
    startTime: number;
    constructor(private readonly config: ITimePassedCondition) {
        this.startTime = GameLoop.instance.time;
    }

    isOk(role?: IRole) {
        return GameLoop.instance.time - this.startTime >= this.config.duration;
    }
}

class SkillFinishedCondition implements ICondition {
    constructor(private readonly config: ISkillFinishedCondition) {
    }

    isOk(role?: IRole) {
        if (!role) {
            return true;
        }
        return role.skillManager.isFinished(this.config.skill);
    }
}

class HasNoEnemyCondition implements ICondition {
    constructor(private readonly config: IHasNoEnemyCondition) {
    }

    isOk(role?: IRole) {
        if (!role) {
            return true;
        }
        return role.world.findTarget(role) === undefined;
    }
}

class HasEnemyCondition implements ICondition {
    constructor(private readonly config: IHasEnemyCondition) {
    }

    isOk(role?: IRole) {
        if (!role) {
            return true;
        }
        return role.world.findTarget(role) !== undefined;
    }
}

export function createCondition(condition: IConditionInfo): ICondition {
    switch (condition.type) {
        case ECondition.等待时间:
            return new WaitCondition(condition);
        case ECondition.技能结束:
            return new SkillFinishedCondition(condition);
        case ECondition.找不到敌人:
            return new HasNoEnemyCondition(condition);
        case ECondition.找到敌人:
            return new HasEnemyCondition(condition);
        default:
            throw new Error(`unknown condition: ${condition}`);
    }
}
