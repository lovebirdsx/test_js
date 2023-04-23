import { ECondition, IConditionInfo } from '../interface/condition_info';
import { ITransitionInfo } from '../interface/state_info';
import { GameLoop } from './game_loop';

export interface ICondition {
    isOk(): boolean;
}

class WaitCondition implements ICondition {
    startTime: number;
    constructor(private readonly duration: number) {
        this.startTime = GameLoop.instance.time;
    }

    isOk() {
        return GameLoop.instance.time - this.startTime >= this.duration;
    }
}

class SkillFinishedCondition implements ICondition {
    startTime: number;
    duration: number;
    constructor(private readonly skill: string) {
        this.startTime = GameLoop.instance.time;
        this.duration = 0.5 + Math.random() * 0.5;
    }

    isOk() {
        return GameLoop.instance.time - this.startTime >= this.duration;
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
