import { IActionInfo } from './action_info';
import { IConditionInfo } from './condition_info';

export interface ITransitionInfo {
    condition: IConditionInfo;
    target?: string;
}

export interface IStateInfo {
    id: string;
    enterActions?: IActionInfo[];
    exitActions?: IActionInfo[];
    transitions: ITransitionInfo[];
    innerSm?: {
        id: string;
        pending: boolean;
    }
}

export interface ISmInfo {
    id: string;
    states: IStateInfo[];
}

export interface ISmRunnerInfo {
    sms: ISmInfo[];
    root: string;
}
