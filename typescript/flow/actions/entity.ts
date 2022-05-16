import { Action, IMoveToPos } from '../action';
import { createSignal, ISignal } from '../common';

export class MoveToPosAction extends Action<IMoveToPos> {
    moveSignal: ISignal<undefined> | undefined;

    public get isScheduable(): boolean {
        return true;
    }

    public async executeSync(t: IMoveToPos): Promise<void> {
        this.moveSignal = createSignal();
        this.entity.moveTo(t.pos, () => this.moveSignal?.Emit(undefined));
        await this.moveSignal.Promise;
        this.moveSignal = undefined;
    }

    public stop(): void {
        if (!this.moveSignal) {
            return;
        }

        this.entity.stopMove();
        this.moveSignal.Emit(undefined);
    }
}

export class ShowTalkAction extends Action<undefined> {
    public async executeSync(t: undefined): Promise<void> {
        const signal = createSignal();
        this.entity.showTalk(() => signal.Emit(undefined));
        await signal.Promise;
    }

    public get isScheduable(): boolean {
        return true;
    }

    public get isStopable(): boolean {
        return false;
    }
}
