import { magenta, yellow } from '../common/color';
import { logT } from '../common/log';
import { EOp } from '../interface/sm_action_info';
import { ISmVarInfo } from '../interface/sm_info';

export class VarMananger {
    private readonly vars: Map<string, number> = new Map();

    constructor(private config: ISmVarInfo[], public name: string) {
        this.config.forEach((varInfo) => {
            this.vars.set(varInfo.id, varInfo.value || 0);
        });
    }

    get(id: string) {
        const result = this.vars.get(id);
        if (result === undefined) {
            throw new Error(`变量 ${id} 不存在`);
        }
        return result;
    }

    set(id: string, value: number) {
        if (!this.vars.has(id)) {
            throw new Error(`变量 ${id} 不存在`);
        }
        this.vars.set(id, value);
        logT(`${yellow(this.name)} 设置变量 ${yellow(id)} = ${magenta(value.toString())}`);
    }

    op(id: string, op: EOp, value: number) {
        const oldValue = this.get(id);
        let newValue = 0;
        switch (op) {
            case EOp.加:
                newValue = oldValue + value;
                break;
            case EOp.减:
                newValue = oldValue - value;
                break;
            case EOp.乘:
                newValue = oldValue * value;
                break;
            case EOp.除:
                newValue = oldValue / value;
                break;
            case EOp.设定:
                newValue = value;
                break;
            default:
                throw new Error(`未知的操作符 ${op}`);
        }

        this.set(id, newValue);
    }
}
