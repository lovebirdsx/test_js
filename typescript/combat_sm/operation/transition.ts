import { ITransitionInfo } from '../interface/sm_info';
import { ICondition, createCondition } from './condition';
import { IRole } from './interface';

export class Transition {
    private readonly condition?: ICondition;

    constructor(private config: ITransitionInfo) {
        if (config.condition) {
            this.condition = createCondition(config.condition);
        }
    }

    get target() {
        return this.config.target;
    }

    isOk(role?: IRole) {
        if (!this.condition) {
            return true;
        }
        return this.condition.isOk(role);
    }
}
