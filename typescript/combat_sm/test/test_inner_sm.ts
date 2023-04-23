import { deepCopy } from '../common/util';
import { cWait } from '../interface/condition_info';
import { ISmRunnerInfo } from '../interface/sm_info';
import { testSm } from './common';

const smRunnerInfo: ISmRunnerInfo = {
    id: 'innerSm',
    root: 'root',
    sms: [
        {
            id: 'root',
            states: [
                { id: '开始', transitions: [{ condition: cWait(1), target: '运行' }] },
                { id: '运行', transitions: [{ condition: cWait(2), target: '结束' }], innerSm: { id: 'inner', pending: false } },
                { id: '结束', transitions: [{ condition: cWait(1) }] },
            ],
        },
        {
            id: 'inner',
            states: [
                { id: '开始', transitions: [{ condition: cWait(1), target: '运行' }] },
                { id: '运行', transitions: [{ condition: cWait(1), target: '结束' }] },
                { id: '结束', transitions: [{ condition: cWait(1) }] },
            ],
        },
    ],
};

function changePending(smRunnerInfo: ISmRunnerInfo, pending: boolean) {
    const result = deepCopy(smRunnerInfo);
    result.sms.forEach((sm) => {
        sm.states.forEach((state) => {
            if (state.innerSm) {
                state.innerSm.pending = pending;
            }
        });
    });
    return result;
}

export async function testInnerSmPending() {
    await testSm(changePending(smRunnerInfo, true));
}

export async function testInnerSmNoPending() {
    await testSm(changePending(smRunnerInfo, false));
}
