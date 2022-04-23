import { logScheme, showMessageScheme, doCaculationScheme } from './basic';
import { ActionScheme, Filter } from './define';
import { showTalkScheme } from './show_talk';

class ActionSchemeRegistry {
    private readonly actionSchemeByName = new Map<string, ActionScheme>();
    private readonly actionSchemes = [] as ActionScheme[];
    private readonly actionSchemeClassFilterMap = new Map<Filter, string[]>();

    constructor() {
        this.regActionScheme(logScheme);
        this.regActionScheme(showMessageScheme);
        this.regActionScheme(showTalkScheme);
        this.regActionScheme(doCaculationScheme);
    }

    regActionScheme(actionScheme: ActionScheme) {
        if (this.actionSchemeClassFilterMap.size > 0) {
            throw new Error(
                `Can not reg action scheme for ${actionScheme.name} while parsed`,
            );
        }

        const actionName = actionScheme.name;
        if (this.actionSchemeByName.has(actionName)) {
            throw new Error(
                `Reg duplicate action name ${actionName}[${actionScheme.name}]`,
            );
        }

        this.actionSchemes.push(actionScheme);
        this.actionSchemeByName.set(actionName, actionScheme);
    }

    private parseAllActionSchemes() {
        this.actionSchemes.forEach((scheme) => {
            scheme.filters.forEach((filter) => {
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
}

export const schemeRegistry = new ActionSchemeRegistry();
