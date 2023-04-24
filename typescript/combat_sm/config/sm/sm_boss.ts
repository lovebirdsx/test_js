/* eslint-disable object-curly-newline */
import {
 cHp, ECompare, cHasEnemy, cDead, cWhiteBar, cVar,
} from '../../interface/condition_info';
import { whiteBarConfig } from '../../interface/role_info';

import { EOp, aCastSkill, aVarOp, aWhiteBarOp } from '../../interface/sm_action_info';
import { ESmEvent, ISmRunnerInfo } from '../../interface/sm_info';

export const bossSmRunnerInfo: ISmRunnerInfo = {
    id: '猩猩',
    root: '主状态',
    vars: [
        { id: '阶段', value: 1 },
        { id: '技能1次数', value: 0 },
        { id: '技能2次数', value: 0 },
    ],
    triggers: [
        { when: ESmEvent.受到攻击, oneshot: true, condition: cHp(ECompare.小于等于, 0.5), actions: [aVarOp('阶段', EOp.设定, 2)] },
    ],
    sms: [
        {
            id: '主状态',
            states: [
                { id: '休眠', transitions: [{ condition: cHasEnemy(), target: '出生' }] },
                { id: '出生', innerSm: '出生', transitions: [{ target: '一阶段' }] },
                { id: '一阶段', innerSm: '一阶段', transitions: [{ condition: cVar('阶段', ECompare.等于, 2), target: '转阶段', force: true }] },
                { id: '转阶段', innerSm: '转阶段', transitions: [{ target: '二阶段' }] },
                { id: '二阶段', innerSm: '二阶段', transitions: [{ condition: cDead(), target: '死亡' }] },
                { id: '死亡' },
            ],
        },
        {
            id: '出生',
            states: [
                { id: '上柱', enterActions: [aCastSkill('猩猩.上柱')], transitions: [{ target: '跳下' }] },
                { id: '跳下', enterActions: [aCastSkill('猩猩.跳下')], transitions: [{ target: '出生结束' }] },
                { id: '出生结束' },
            ],
        },
        {
            id: '一阶段',
            states: [
                {
                    id: '一阶段普通',
                    transitions: [
                        { condition: cWhiteBar(ECompare.小于等于, 0), target: '一阶段瘫痪', force: true },
                        { condition: cVar('技能1次数', ECompare.大于等于, 2), target: '一阶段表演', force: true },
                    ],
                    innerSm: '攻击1',
                },
                {
                    id: '一阶段瘫痪',
                    enterActions: [aCastSkill('猩猩.一阶段瘫痪')],
                    exitActions: [aWhiteBarOp(EOp.设定, whiteBarConfig.max)],
                    transitions: [{ target: '一阶段普通' }] },
                {
                    id: '一阶段表演',
                    enterActions: [aVarOp('技能1次数', EOp.设定, 0)],
                    transitions: [
                        { condition: cWhiteBar(ECompare.小于等于, 0), target: '一阶段瘫痪', force: true },
                        { target: '一阶段普通' },
                    ],
                    innerSm: '表演',
                },
            ],
        },
        {
            id: '二阶段',
            states: [
                {
                    id: '二阶段普通',
                    transitions: [
                        { condition: cWhiteBar(ECompare.小于等于, 0), target: '二阶段瘫痪', force: true },
                        { condition: cVar('技能2次数', ECompare.大于等于, 2), target: '二阶段表演', force: true },
                    ],
                    innerSm: '攻击2',
                },
                {
                    id: '二阶段瘫痪',
                    enterActions: [aCastSkill('猩猩.二阶段瘫痪')],
                    exitActions: [aWhiteBarOp(EOp.设定, whiteBarConfig.max)],
                    transitions: [{ target: '二阶段普通' }],
                },
                {
                    id: '二阶段表演',
                    enterActions: [aVarOp('技能2次数', EOp.设定, 0)],
                    transitions: [
                        { condition: cWhiteBar(ECompare.小于等于, 0), target: '二阶段瘫痪', force: true },
                        { target: '二阶段普通' },
                    ],
                    innerSm: '表演',
                },
            ],
        },
        {
            id: '转阶段',
            states: [
                { id: '定位', enterActions: [aWhiteBarOp(EOp.设定, whiteBarConfig.max), aCastSkill('猩猩.转阶段定位')], transitions: [{ target: '上柱' }] },
                { id: '上柱', enterActions: [aCastSkill('猩猩.转阶段上柱')], transitions: [{ target: '下柱' }] },
                { id: '下柱', enterActions: [aCastSkill('猩猩.转阶段下柱')], transitions: [{ target: '咆哮' }] },
                { id: '咆哮', enterActions: [aCastSkill('猩猩.转阶段咆哮')], transitions: [{ target: '结束' }] },
                { id: '结束', enterActions: [aCastSkill('猩猩.转阶段结束')] },
            ],
        },
        {
            id: '攻击1',
            states: [
                { id: '索敌', enterActions: [aCastSkill('猩猩.索敌1')], transitions: [{ target: '攻击' }] },
                { id: '攻击', enterActions: [aCastSkill('猩猩.技能1'), aVarOp('技能1次数', EOp.加, 1)], transitions: [{ target: '索敌' }] },
            ],
        },
        {
            id: '攻击2',
            states: [
                { id: '索敌', enterActions: [aCastSkill('猩猩.索敌2')], transitions: [{ target: '攻击' }] },
                { id: '攻击', enterActions: [aCastSkill('猩猩.技能2'), aVarOp('技能2次数', EOp.加, 1)], transitions: [{ target: '索敌' }] },
            ],
        },
        {
            id: '表演',
            states: [
                { id: '表演1', enterActions: [aCastSkill('猩猩.表演1')], transitions: [{ target: '表演2' }] },
                { id: '表演2', enterActions: [aCastSkill('猩猩.表演2')], transitions: [{ target: '表演3' }] },
                { id: '表演3', enterActions: [aCastSkill('猩猩.表演3')] },
            ],
        },
    ],
};
