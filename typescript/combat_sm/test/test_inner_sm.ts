import { ISmRunnerInfo } from '../interface/sm_info';
import { testSm } from './common';

const smRunnerInfo: ISmRunnerInfo = {
    id: 'innerSm',
    root: 'root',
    sms: [
        {
            id: 'root',
            states: [
                { id: '开始', transitions: [{ target: '运行' }] },
                { id: '运行', transitions: [{ target: '结束' }], innerSm: 'inner' },
                { id: '结束' },
            ],
        },
        {
            id: 'inner',
            states: [
                { id: '开始', transitions: [{ target: '运行' }] },
                { id: '运行', transitions: [{ target: '结束' }] },
                { id: '结束' },
            ],
        },
    ],
};

export async function testInnerSmPending() {
    await testSm(smRunnerInfo);
}
