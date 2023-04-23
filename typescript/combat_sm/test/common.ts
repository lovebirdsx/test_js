import { ISmRunnerInfo } from '../interface/sm_info';
import { GameLoop } from '../operation/game_loop';
import { SmRunner } from '../operation/sm';

export async function testSm(smRunnerInfo: ISmRunnerInfo, condition?: () => boolean) {
    await new Promise<void>((resolve) => {
        const runner = new SmRunner(smRunnerInfo);
        GameLoop.instance.addObj(runner);
        if (condition) {
            GameLoop.instance.waitCondition(condition).then(() => {
                resolve();
            });
        } else {
            GameLoop.instance.reg('objRemoved', (obj) => {
                if (obj === runner) {
                    resolve();
                }
            });
        }
    });
}
