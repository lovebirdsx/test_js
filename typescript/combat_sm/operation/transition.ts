import { ITransitionInfo } from '../interface/sm_info';
import { isConditionOk } from './condition';
import { IRole } from './interface';

export class Transition {
    constructor(private config: ITransitionInfo) {
    }

    get target() {
        return this.config.target;
    }

    get isForce() {
        return this.config.force ?? false;
    }

    isOk(role?: IRole) {
        if (!this.config.condition || !role) {
            return true;
        }
        return isConditionOk(this.config.condition, role);
    }
}
