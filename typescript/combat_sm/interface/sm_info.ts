import { ISmActionInfo } from './sm_action_info';
import {
    IConditionInfo,
} from './condition_info';

export interface ITransitionInfo {
    condition?: IConditionInfo;
    target?: string;
    force?: boolean;
}

export interface IStateInfo {
    id: string;
    enterActions?: ISmActionInfo[];
    exitActions?: ISmActionInfo[];
    transitions?: ITransitionInfo[];
    innerSm?: string;
}

export interface ISmInfo {
    id: string;
    states: IStateInfo[];
}

export const enum ESmEvent {
    受到攻击,
}

export interface ISmTriggerInfo {
    when: ESmEvent;
    condition?: IConditionInfo;
    actions: ISmActionInfo[];
    oneshot?: boolean;
}

export interface ISmVarInfo {
    id: string;
    value?: number;
}

export interface ISmRunnerInfo {
    id: string;
    vars?: ISmVarInfo[];
    triggers?: ISmTriggerInfo[];
    sms: ISmInfo[];
    root: string;
}
