import { DoCaculationScheme, LogScheme, ShowMessageScheme } from './basic';
import {
    ActionScheme,
    ActionSchemeClass,
    Filter,
} from './define';
import { ShowTalkScheme } from './showTalk';

class ActionSchemeRegistry {
    private readonly actionSchemeByClass = new Map<ActionSchemeClass, ActionScheme>();
    private readonly actionSchemeByName = new Map<string, ActionScheme>();
    private readonly actionSchemeClassByName = new Map<string, ActionSchemeClass>();
    private readonly actionSchemes = [] as ActionScheme[];
    private readonly actionSchemeClassFilterMap = new Map<Filter, string[]>();

    constructor() {
        this.regActionScheme(LogScheme);
        this.regActionScheme(ShowMessageScheme);
        this.regActionScheme(ShowTalkScheme);
        this.regActionScheme(DoCaculationScheme);
    }

    regActionScheme(actionSchemeClass: ActionSchemeClass) {
        if (this.actionSchemeClassFilterMap.size > 0) {
            throw new Error(
                `Can not reg action scheme for ${actionSchemeClass.name} while parsed`,
            );
        }

        if (this.actionSchemeByClass.has(actionSchemeClass)) {
            throw new Error(
                `Can not reg action scheme for ${actionSchemeClass.name} again`,
            );
        }

        // eslint-disable-next-line new-cap
        const actionScheme = new actionSchemeClass();
        const actionName = actionScheme.name;
        if (this.actionSchemeByName.has(actionName)) {
            throw new Error(
                `Reg duplicate action name ${actionName}[${actionSchemeClass.name}]`,
            );
        }

        this.actionSchemes.push(actionScheme);
        this.actionSchemeByClass.set(actionSchemeClass, actionScheme);
        this.actionSchemeClassByName.set(actionName, actionSchemeClass);
        this.actionSchemeByName.set(actionName, actionScheme);
    }

    private parseAllActionSchemes() {
        this.actionSchemes.forEach((scheme) => {
            scheme.meta.filters.forEach((filter) => {
                let names = this.actionSchemeClassFilterMap.get(filter);
                if (!names) {
                    names = [];
                    this.actionSchemeClassFilterMap.set(filter, names);
                }
                names.push(scheme.name);
            });
        });
    }

    getActionNamesByFilter(filter: Filter): string[] {
        if (this.actionSchemeClassFilterMap.size <= 0) {
            this.parseAllActionSchemes();
        }

        const result = this.actionSchemeClassFilterMap.get(filter);
        if (!result) {
            return [];
        }

        return result;
    }

    getActionScheme(actionName: string): ActionScheme {
        const result = this.actionSchemeByName.get(actionName);
        if (!result) {
            throw new Error(`No action sheme for type [${actionName}]`);
        }

        return result;
    }

    getActionSchemeByClass(actionSchemeClass: ActionSchemeClass): ActionScheme {
        const result = this.actionSchemeByClass.get(actionSchemeClass);
        if (!result) {
            throw new Error(`No action sheme for type [${actionSchemeClass.name}]`);
        }

        return result;
    }

    getActionSchemeClass(actionName: string): ActionSchemeClass {
        const result = this.actionSchemeClassByName.get(actionName);
        if (!result) {
            throw new Error(`No action sheme class for type [${actionName}]`);
        }

        return result;
    }
}

export const schemeRegistry = new ActionSchemeRegistry();
