export const enum ECondition {
    技能结束,
    等待时间,
    找不到敌人,
    找到敌人,
}

interface IConditionBase<T extends ECondition> {
    type: T;
}

export interface ISkillFinishedCondition extends IConditionBase<ECondition.技能结束> {
    skill: string;
}

export interface ITimePassedCondition extends IConditionBase<ECondition.等待时间> {
    duration: number;
}

export interface IHasNoEnemyCondition extends IConditionBase<ECondition.找不到敌人> {
}

export interface IHasEnemyCondition extends IConditionBase<ECondition.找到敌人> {
}

export type IConditionInfo = ISkillFinishedCondition
    | ITimePassedCondition
    | IHasNoEnemyCondition
    | IHasEnemyCondition;

export function cWait(duration: number): ITimePassedCondition {
    return {
        type: ECondition.等待时间,
        duration,
    };
}

export function cNoEnemy(): IHasNoEnemyCondition {
    return {
        type: ECondition.找不到敌人,
    };
}

export function cHasEnemy(): IHasEnemyCondition {
    return {
        type: ECondition.找到敌人,
    };
}

export function cSkillFinished(skill: string): ISkillFinishedCondition {
    return {
        type: ECondition.技能结束,
        skill,
    };
}
