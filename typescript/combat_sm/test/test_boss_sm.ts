import { cWait } from '../common/util';
import { ISmRunnerInfo } from '../interface/state_info';
import { testSm } from './common';

const smRunnerInfo: ISmRunnerInfo = {
    root: '主状态',
    sms: [
        {
            id: '主状态',
            states: [
                { id: '休眠', transitions: [{ condition: cWait(1), target: '出生' }] },
                { id: '出生', transitions: [{ condition: cWait(2), target: '战斗' }], innerSm: { id: '出生', pending: true } },
                { id: '战斗', transitions: [{ condition: cWait(1), target: '死亡' }], innerSm: { id: '战斗', pending: true } },
                { id: '死亡', transitions: [{ condition: cWait(1) }] },
            ],
        },
        {
            id: '出生',
            states: [
                { id: '上柱', transitions: [{ condition: cWait(1), target: '跳下' }] },
                { id: '跳下', transitions: [{ condition: cWait(1), target: '出生结束' }] },
                { id: '出生结束', transitions: [{ condition: cWait(1) }] },
            ],
        },
        {
            id: '战斗',
            states: [
                { id: '默认', transitions: [{ condition: cWait(1), target: '瘫痪' }] },
                { id: '瘫痪', transitions: [{ condition: cWait(1), target: '转阶段' }], innerSm: { id: '瘫痪', pending: true } },
                { id: '转阶段', transitions: [{ condition: cWait(1) }], innerSm: { id: '转阶段', pending: true } },
            ],
        },
        {
            id: '瘫痪',
            states: [
                { id: '中转', transitions: [{ condition: cWait(1), target: '一阶段瘫痪' }] },
                { id: '一阶段瘫痪', transitions: [{ condition: cWait(1), target: '瘫痪结束' }] },
                { id: '二阶段瘫痪', transitions: [{ condition: cWait(1), target: '瘫痪结束' }] },
                { id: '瘫痪结束', transitions: [{ condition: cWait(1) }] },
            ],
        },
        {
            id: '转阶段',
            states: [
                { id: '转阶段定位', transitions: [{ condition: cWait(1), target: '转阶段上柱' }] },
                { id: '转阶段上柱', transitions: [{ condition: cWait(1), target: '转阶段下柱' }] },
                { id: '转阶段下柱', transitions: [{ condition: cWait(1), target: '转阶段瘫痪' }] },
                { id: '转阶段瘫痪', transitions: [{ condition: cWait(1), target: '转阶段强制定位' }] },
                { id: '转阶段强制定位', transitions: [{ condition: cWait(1), target: '转阶段强制上柱' }] },
                { id: '转阶段强制上柱', transitions: [{ condition: cWait(1), target: '转阶段拔柱咆哮' }] },
                { id: '转阶段拔柱咆哮', transitions: [{ condition: cWait(1), target: '结束' }] },
                { id: '结束', transitions: [{ condition: cWait(1) }] },
            ],
        },
    ],
};

export async function testBossSm() {
    await testSm(smRunnerInfo);
}
