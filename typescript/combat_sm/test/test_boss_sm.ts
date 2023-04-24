import { ISmRunnerInfo } from '../interface/sm_info';
import { testSm } from './common';

const smRunnerInfo: ISmRunnerInfo = {
    id: 'boss',
    root: '主状态',
    sms: [
        {
            id: '主状态',
            states: [
                { id: '休眠', transitions: [{ target: '出生' }] },
                { id: '出生', transitions: [{ target: '战斗' }], innerSm: '出生' },
                { id: '战斗', transitions: [{ target: '死亡' }], innerSm: '战斗' },
                { id: '死亡' },
            ],
        },
        {
            id: '出生',
            states: [
                { id: '上柱', transitions: [{ target: '跳下' }] },
                { id: '跳下', transitions: [{ target: '出生结束' }] },
                { id: '出生结束' },
            ],
        },
        {
            id: '战斗',
            states: [
                { id: '默认', transitions: [{ target: '瘫痪' }] },
                { id: '瘫痪', transitions: [{ target: '转阶段' }], innerSm: '瘫痪' },
                { id: '转阶段', innerSm: '转阶段' },
            ],
        },
        {
            id: '瘫痪',
            states: [
                { id: '中转', transitions: [{ target: '一阶段瘫痪' }] },
                { id: '一阶段瘫痪', transitions: [{ target: '瘫痪结束' }] },
                { id: '二阶段瘫痪', transitions: [{ target: '瘫痪结束' }] },
                { id: '瘫痪结束' },
            ],
        },
        {
            id: '转阶段',
            states: [
                { id: '转阶段定位', transitions: [{ target: '转阶段上柱' }] },
                { id: '转阶段上柱', transitions: [{ target: '转阶段下柱' }] },
                { id: '转阶段下柱', transitions: [{ target: '转阶段瘫痪' }] },
                { id: '转阶段瘫痪', transitions: [{ target: '转阶段强制定位' }] },
                { id: '转阶段强制定位', transitions: [{ target: '转阶段强制上柱' }] },
                { id: '转阶段强制上柱', transitions: [{ target: '转阶段拔柱咆哮' }] },
                { id: '转阶段拔柱咆哮', transitions: [{ target: '结束' }] },
                { id: '结束' },
            ],
        },
    ],
};

export async function testBossSm() {
    await testSm(smRunnerInfo);
}
