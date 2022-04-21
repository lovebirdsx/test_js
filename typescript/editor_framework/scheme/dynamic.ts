import { IAction } from '../type/action';
import { Filter, Scheme } from './define';
import { schemeRegistry } from './schemeRegistry';

export abstract class ActionScheme extends Scheme<IAction> {
    abstract filter: Filter;

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
            value: objScheme.createDefault(),
        };
    }

    createDefault(): IAction {
        return ActionScheme.createDefault(this.filter);
    }
}

export class NormalActionScheme extends ActionScheme {
    filter: Filter = Filter.normal;
}
