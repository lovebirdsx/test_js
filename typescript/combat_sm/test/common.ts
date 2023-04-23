import { ISmRunnerInfo } from '../interface/state_info';
import { GameLoop } from '../operation/game_loop';
import { SmRunner } from '../operation/sm';

export async function testSm(smRunnerInfo: ISmRunnerInfo) {
    await new Promise<void>((resolve) => {
        const runner = new SmRunner(smRunnerInfo);
        GameLoop.instance.addObj(runner);
        GameLoop.instance.reg('objRemoved', (obj) => {
            if (obj === runner) {
                resolve();
            }
        })
    });
}
