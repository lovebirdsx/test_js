import { cHasEnemy, cNoEnemy } from '../../interface/condition_info';
import { aCastSkill } from '../../interface/sm_action_info';
import { ISmRunnerInfo } from '../../interface/sm_info';

export const simpleSmRunnerInfo: ISmRunnerInfo = {
    id: '简单AI',
    root: '简单AI',
    sms: [
        {
            id: '简单AI',
            states: [
                { id: '待机', transitions: [{ condition: cHasEnemy(), target: '战斗' }] },
                { id: '战斗', transitions: [{ condition: cNoEnemy(), target: '待机' }], innerSm: '战斗' },
            ],
        },
        {
            id: '战斗',
            states: [
                { id: '索敌', transitions: [{ condition: cHasEnemy(), target: '攻击' }] },
                {
                    id: '攻击',
                    enterActions: [aCastSkill('普攻')],
                    transitions: [
                        { condition: cNoEnemy(), target: '结束' },
                        { target: '索敌' },
                    ],
                },
                { id: '结束' },
            ],
        },
    ],
};
