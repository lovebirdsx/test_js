import { cHp, ECompare, cHasEnemy } from '../../interface/condition_info';
import { aCastSkill } from '../../interface/sm_action_info';
import { ISmRunnerInfo } from '../../interface/sm_info';

export const normalSmRunnerInfo: ISmRunnerInfo = {
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
                    enterActions: [aCastSkill('普攻')],
                    transitions: [
                        { target: '待机' },
                    ],
                },
                {
                    id: '回血',
                    enterActions: [aCastSkill('回复50%生命')],
                    transitions: [{ target: '待机' }],
                },
            ],
        },
    ],
};
