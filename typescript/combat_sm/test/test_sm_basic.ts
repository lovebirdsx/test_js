import { aLog, cWait } from '../common/util';
import { ISmRunnerInfo } from '../interface/state_info';
import { SmRunner, EUpdateResult } from '../operation/sm';

const smRunnerInfo: ISmRunnerInfo = {
    root: 'root',
    sms: [
        {
            id: 'root',
            states: [
                {
                    id: '开始',
                    enterActions: [aLog('状态机开始')],
                    transitions: [{ condition: cWait(1), target: '运行' }],
                },
                {
                    id: '运行',
                    transitions: [{ condition: cWait(1), target: '结束' }],
                },
                {
                    id: '结束',
                    exitActions: [aLog('状态机结束')],
                    transitions: [{ condition: cWait(1) }],
                },
            ],
        },
    ],
};

export async function testSmBasic() {
    return new Promise<void>((resolve) => {
        const runner = new SmRunner(smRunnerInfo);
        const handler = setInterval(() => {
            const result = runner.update();
            if (result === EUpdateResult.Finished) {
                clearInterval(handler);
                resolve();
            }
        }, 1000 / 50);
    });
}
