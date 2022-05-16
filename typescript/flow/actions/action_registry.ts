/* eslint-disable new-cap */
import {
 Action, EAction,
} from '../action';
import { Entity } from '../entity/entity';

type TActionClass<T> = new(entity: Entity) => Action<T>

class ActionRegistry {
    actionMap: Map<EAction, TActionClass<unknown>> = new Map();

    public register(type: EAction, actionClass: TActionClass<unknown>): void {
        if (this.actionMap.has(type)) {
            throw new Error(`Action ${EAction[type]} already registered`);
        }
        this.actionMap.set(type, actionClass);
    }

    public spawnAction(type: EAction, entity: Entity): Action {
        const classObj = this.actionMap.get(type);
        if (!classObj) {
            throw new Error(`No action class for ${EAction[type]}`);
        }

        return new classObj(entity);
    }
}

export const actionRegistry = new ActionRegistry();
