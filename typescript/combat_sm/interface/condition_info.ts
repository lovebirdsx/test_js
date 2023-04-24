export const enum ECompare {
    大于 = '大于',
    等于 = '等于',
    小于 = '小于',
    大于等于 = '大于等于',
    小于等于 = '小于等于',
}

export const enum ECondition {
    技能结束 = '技能结束',
    找不到敌人 = '找不到敌人',
    找到敌人 = '找到敌人',
    比较血量 = '比较血量',
    比较白条 = '比较白条',
    死亡 = '死亡',
    比较变量 = '比较变量',
}

interface IConditionBase<T extends ECondition> {
    type: T;
}

export interface ISkillFinishedCondition extends IConditionBase<ECondition.技能结束> {
    skill: string;
}

export interface IHasNoEnemyCondition extends IConditionBase<ECondition.找不到敌人> {
}

export interface IHasEnemyCondition extends IConditionBase<ECondition.找到敌人> {
}

export interface ICompareHpCondition extends IConditionBase<ECondition.比较血量> {
    compare: ECompare;
    hpRate: number;
}

export interface ICompareWhiteBarCondition extends IConditionBase<ECondition.比较白条> {
    compare: ECompare;
    value: number;
}

export interface ICompareVarCondition extends IConditionBase<ECondition.比较变量> {
    varId: string;
    compare: ECompare;
    value: number;
}

export interface IDeadCondition extends IConditionBase<ECondition.死亡> {
}

export type IConditionInfo = ISkillFinishedCondition
    | IHasNoEnemyCondition
    | ICompareHpCondition
    | ICompareWhiteBarCondition
    | ICompareVarCondition
    | IDeadCondition
    | IHasEnemyCondition;

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

export function cHp(compare: ECompare, hpRate: number): ICompareHpCondition {
    return {
        type: ECondition.比较血量,
        compare,
        hpRate,
    };
}

export function cWhiteBar(compare: ECompare, value: number): ICompareWhiteBarCondition {
    return {
        type: ECondition.比较白条,
        compare,
        value,
    };
}

export function cVar(varId: string, compare: ECompare, value: number): ICompareVarCondition {
    return {
        type: ECondition.比较变量,
        varId,
        compare,
        value,
    };
}

export function cDead(): IDeadCondition {
    return {
        type: ECondition.死亡,
    };
}
