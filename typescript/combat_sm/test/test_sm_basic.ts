import { ISmRunnerInfo } from '../interface/sm_info';
import { GameLoop } from '../operation/game_loop';
import { testSm } from './common';

const basicSmRunnerInfo: ISmRunnerInfo = {
    id: 'basic',
    root: 'root',
    sms: [
        {
            id: 'root',
            states: [
                { id: '开始', transitions: [{ target: '运行' }] },
                { id: '运行', transitions: [{ target: '结束' }] },
                { id: '结束' },
            ],
        },
    ],
};

const loopSmRunnerInfo: ISmRunnerInfo = {
    id: 'loop',
    root: 'root',
    sms: [
        {
            id: 'root',
            states: [
                { id: '开', transitions: [{ target: '关' }] },
                { id: '关', transitions: [{ target: '开' }] },
            ],
        },
    ],
};

export async function testSmBasic() {
    await testSm(basicSmRunnerInfo);
}

export async function testSmLoop() {
    const endTime = GameLoop.instance.time + 0.1;
    await testSm(loopSmRunnerInfo, () => GameLoop.instance.time >= endTime);
}
