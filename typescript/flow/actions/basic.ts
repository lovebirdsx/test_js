import { Action, ILog, IWait } from '../action';
import { ICancleableDelay, createCancleableDelay } from '../common';

export class LogAction extends Action<ILog> {
    public execute(t: ILog): void {
        console.log(t.content);
    }
}

export class WaitAction extends Action<IWait> {
    delay: ICancleableDelay | undefined = undefined;

    public async executeSync(t: IWait): Promise<void> {
        this.delay = createCancleableDelay(t.time);
        return this.delay.Promise;
    }

    public stop(): void {
        if (this.delay) {
            this.delay.Cancel();
            this.delay = undefined;
        }
    }

    public get isScheduable(): boolean {
        return true;
    }
}
