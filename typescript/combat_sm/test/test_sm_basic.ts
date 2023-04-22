import { cWait } from '../common/util';
import { ISmRunnerInfo } from '../interface/state_info';
import { testSm } from './common';

const smRunnerInfo: ISmRunnerInfo = {
    root: 'root',
    sms: [
        {
            id: 'root',
            states: [
                { id: '开始', transitions: [{ condition: cWait(1), target: '运行' }] },
                { id: '运行', transitions: [{ condition: cWait(1), target: '结束' }] },
                { id: '结束', transitions: [{ condition: cWait(1) }] },
            ],
        },
    ],
};

export async function testSmBasic() {
    return testSm(smRunnerInfo);
}
