import { ECondition, IConditionInfo } from '../interface/condition_info';
import { ITransitionInfo } from '../interface/state_info';

export interface ICondition {
    isOk(): boolean;
}

class WaitCondition implements ICondition {
    startTime: number;
    constructor(private readonly duration: number) {
        this.startTime = Date.now();
    }

    isOk() {
        return Date.now() - this.startTime >= this.duration * 1000;
    }
}

class SkillFinishedCondition implements ICondition {
    startTime: number;
    duration: number;
    constructor(private readonly skill: string) {
        this.startTime = Date.now();
        this.duration = (0.5 + Math.random() * 0.5) * 1000;
    }

    isOk() {
        return Date.now() - this.startTime >= this.duration;
    }
}

export function createCondition(condition: IConditionInfo): ICondition {
    switch (condition.type) {
        case ECondition.TimePassed:
            return new WaitCondition(condition.duration);
        case ECondition.SkillFinished:
            return new SkillFinishedCondition(condition.skill);
        default:
            throw new Error(`unknown condition: ${condition}`);
    }
}

export class Transition {
    private readonly condition: ICondition;

    constructor(private config: ITransitionInfo) {
        this.condition = createCondition(config.condition);
    }

    get target() {
        return this.config.target;
    }

    isOk() {
        return this.condition.isOk();
    }
}
