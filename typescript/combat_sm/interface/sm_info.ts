import { ESmActionInfo, ISmActionInfo } from './sm_action_info';
import {
    ECompare,
 IConditionInfo, cHasEnemy, cHp, cNoEnemy, cSkillFinished,
} from './condition_info';

export interface ITransitionInfo {
    condition?: IConditionInfo;
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
                },
                {
                    id: '战斗',
                    transitions: [{ condition: cNoEnemy(), target: '待机' }],
                    innerSm: { id: '战斗', pending: true },
                },
            ],
        },
        {
            id: '战斗',
            states: [
                {
                    id: '索敌',
                    transitions: [{ condition: cHasEnemy(), target: '攻击' }],
                },
                {
                    id: '攻击',
                    enterActions: [{ type: ESmActionInfo.CastSkill, skill: '普攻' }],
                    transitions: [
                        { condition: cNoEnemy(), target: '结束' },
                        { target: '索敌' },
                    ],
                },
                {
                    id: '结束',
                    transitions: [],
                },
            ],
        },
    ],
};

const normalSmRunnerInfo: ISmRunnerInfo = {
    id: '普通AI',
    root: '普通AI',
    sms: [
        {
            id: '普通AI',
            states: [
                {
                    id: '待机',
                    transitions: [
                        { condition: cHp(ECompare.小于等于, 0.3), target: '回血' },
                        { condition: cHasEnemy(), target: '战斗' },
                    ],
                },
                {
                    id: '战斗',
                    enterActions: [{ type: ESmActionInfo.CastSkill, skill: '普攻' }],
                    transitions: [
                        { target: '待机' },
                    ],
                },
                {
                    id: '回血',
                    enterActions: [{ type: ESmActionInfo.CastSkill, skill: '回复50%生命' }],
                    transitions: [{ target: '待机' }],
                },
            ],
        },
    ],
};

export const smRunnerInfos: ISmRunnerInfo[] = [
    simpleSmRunnerInfo,
    normalSmRunnerInfo,
];

export function getSmRunnerInfo(id: string): ISmRunnerInfo {
    for (const smRunnerInfo of smRunnerInfos) {
        if (smRunnerInfo.id === id) {
            return smRunnerInfo;
        }
    }

    throw new Error(`找不到id为${id}的状态机`);
}
