import { IAction } from '../type/action';
import {
 Filter, IMeta, Scheme,
} from './define';
import { schemeRegistry } from './schemeRegistry';

export interface IActionMeta extends IMeta {
    filter: Filter,
}

export abstract class ActionScheme extends Scheme<IAction, IActionMeta> {
    abstract meta: IActionMeta;

    static createAction<TAction>(actionName: string, action: TAction): IAction {
        return {
            name: actionName,
            value: action,
        };
    }

    static createDefault(filter: Filter): IAction {
        const actionNames = schemeRegistry.getActionNamesByFilter(filter);
        if (actionNames.length <= 0) {
            throw new Error(`No actions register for ${filter}`);
        }

        const defaultActionName = actionNames[0];
        const objScheme = schemeRegistry.getActionScheme(defaultActionName);
        return {
            name: defaultActionName,
            value: objScheme.createDefault(undefined),
        };
    }

    createDefault(parent: unknown): IAction {
        return ActionScheme.createDefault(this.meta.filter);
    }
}

export class NormalActionScheme extends ActionScheme {
    meta: IActionMeta = { filter: Filter.normal };
}
