import { ESmActionInfo, ISmActionInfo } from './sm_action_info';
import {
 IConditionInfo, cHasEnemy, cNoEnemy, cSkillFinished,
} from './condition_info';

export interface ITransitionInfo {
    condition: IConditionInfo;
    target?: string;
}

export interface IStateInfo {
    id: string;
    enterActions?: ISmActionInfo[];
    exitActions?: ISmActionInfo[];
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
    id: string;
    sms: ISmInfo[];
    root: string;
}

const simpleSmRunnerInfo: ISmRunnerInfo = {
    id: '简单AI',
    root: '简单AI',
    sms: [
        {
            id: '简单AI',
            states: [
                {
                    id: '待机',
                    transitions: [{ condition: cHasEnemy(), target: '战斗' }],
                    enterActions: [{ type: ESmActionInfo.CastSkill, skill: '普攻' }],
                },
                { id: '战斗', transitions: [{ condition: cSkillFinished('普攻'), target: '待机' }] },
            ],
        },
    ],
};

export const smRunnerInfos: ISmRunnerInfo[] = [
    simpleSmRunnerInfo,
];

export function getSmRunnerInfo(id: string): ISmRunnerInfo {
    for (const smRunnerInfo of smRunnerInfos) {
        if (smRunnerInfo.id === id) {
            return smRunnerInfo;
        }
    }

    throw new Error(`找不到id为${id}的状态机`);
}
