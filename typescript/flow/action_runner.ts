/* eslint-disable no-await-in-loop */
import { Action, IActionInfo } from './action';
import { actionRegistry } from './actions/public';
import { Entity } from './entity/entity';

export class ActionRunner {
    readonly name: string;
    readonly actions: IActionInfo[];

    constructor(name: string, actions: IActionInfo[]) {
        this.name = name;
        this.actions = actions;
    }

    isRunning: boolean = false;
    currAction: Action | undefined;

    async Execute(entity: Entity, actionId?: number) {
        if (this.isRunning) {
            throw new Error(`${this.name} can not run actions again`);
        }

        this.isRunning = true;

        const { actions } = this;
        for (let i = actionId || 0; i < actions.length; i++) {
            const info = actions[i];
            const action = actionRegistry.spawnAction(info.type, entity);
            this.currAction = action;
            if (!action.isScheduable || info.async) {
                action.execute(info.params);
            } else {
                await action.executeSync(info.params);
            }

            if (!this.isRunning) {
                break;
            }
        }

        this.isRunning = false;
    }

    public Stop() {
        if (!this.currAction) {
            return;
        }

        if (this.currAction.isStopable) {
            this.currAction.stop();
            this.isRunning = false;
        } else {
            console.warn(`Runner can not be stop because ${this.currAction.constructor.name} can not stopped`);
        }
    }
}
