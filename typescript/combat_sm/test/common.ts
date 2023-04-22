import { ISmRunnerInfo } from '../interface/state_info';
import { EUpdateResult, SmRunner } from '../operation/sm';

export async function testSm(smRunnerInfo: ISmRunnerInfo) {
    return new Promise<void>((resolve) => {
        const runner = new SmRunner(smRunnerInfo);
        const handler = setInterval(() => {
            const result = runner.update();
            if (result === EUpdateResult.Finished) {
                clearInterval(handler);
                resolve();
            }
        }, 1);
    });
}
