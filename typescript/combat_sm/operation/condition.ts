import {
    IConditionInfo, ECondition, ITimePassedCondition, ISkillFinishedCondition, IHasNoEnemyCondition, IHasEnemyCondition, ICompareHpCondition, ECompare,
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

class CompareHpCondition implements ICondition {
    constructor(private readonly config: ICompareHpCondition) {}

    isOk(role?: IRole | undefined): boolean {
        if (!role) {
            return true;
        }
        const rate = role.hp / role.maxHp;
        switch (this.config.compare) {
            case ECompare.大于: return rate > this.config.hpRate;
            case ECompare.等于: return Math.abs(rate - this.config.hpRate) < 0.0001;
            case ECompare.小于: return rate < this.config.hpRate;
            case ECompare.大于等于: return rate >= this.config.hpRate;
            case ECompare.小于等于: return rate <= this.config.hpRate;
            default: throw new Error(`unknown compare: ${this.config.compare}`);
        }
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
        case ECondition.比较血量:
            return new CompareHpCondition(condition);
        default:
            throw new Error(`Unknown condition type: ${condition}`);
    }
}
