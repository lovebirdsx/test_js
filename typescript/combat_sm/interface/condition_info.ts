export const enum ECondition {
    SkillFinished = 'SkillFinished',
    TimePassed = 'TimePassed',
}

interface IConditionBase<T extends ECondition> {
    type: T;
}

interface ISkillFinishedCondition extends IConditionBase<ECondition.SkillFinished> {
    skill: string;
}

interface ITimePassedCondition extends IConditionBase<ECondition.TimePassed> {
    duration: number;
}

export type IConditionInfo = ISkillFinishedCondition | ITimePassedCondition;
