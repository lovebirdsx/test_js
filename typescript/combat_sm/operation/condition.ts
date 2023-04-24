import {
    IConditionInfo, ECondition, ECompare,
} from '../interface/condition_info';
import { IRole } from './interface';

function compare(value: number, compare: ECompare, target: number) {
    switch (compare) {
        case ECompare.大于: return value > target;
        case ECompare.等于: return Math.abs(value - target) < 0.0001;
        case ECompare.小于: return value < target;
        case ECompare.大于等于: return value >= target;
        case ECompare.小于等于: return value <= target;
        default: throw new Error(`unknown compare: ${compare}`);
    }
}

export function isConditionOk(c: IConditionInfo, role: IRole) {
    switch (c.type) {
        case ECondition.技能结束:
            return role.skillManager.isFinished(c.skill);

        case ECondition.找不到敌人:
            return role.world.findTarget(role) === undefined;

        case ECondition.找到敌人:
            return role.world.findTarget(role) !== undefined;

        case ECondition.比较血量: {
            const rate = role.hp / role.maxHp;
            return compare(rate, c.compare, c.hpRate);
        }

        case ECondition.比较变量: {
            if (!role.smRunner.varManager) {
                throw new Error('excute action SetVar failed: no varManager');
            }
            const value = role.smRunner.varManager.get(c.varId);
            return compare(value, c.compare, c.value);
        }

        case ECondition.比较白条: {
            return compare(role.whiteBar, c.compare, c.value);
        }

        case ECondition.死亡:
            return !role || role.isDead();

        default:
            throw new Error(`Unknown condition type: ${c}`);
    }
}
