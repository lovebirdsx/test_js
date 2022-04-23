import { IAction } from '../type/action';
import { createScheme, Filter, Scheme } from './define';
import { schemeRegistry } from './scheme_registry';

export class DynamicActionScheme extends Scheme<IAction> {
    public filter: Filter = Filter.normal;

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
        return DynamicActionScheme.createDefault(this.filter);
    }
}

export function createDynamicActionScheme(params: Partial<DynamicActionScheme>): DynamicActionScheme {
    return createScheme(params, DynamicActionScheme);
}

export const normalActionScheme = createDynamicActionScheme({
    filter: Filter.normal,
});
