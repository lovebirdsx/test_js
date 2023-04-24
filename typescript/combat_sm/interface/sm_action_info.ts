import { getSkillInfo } from '../config/skill_cfg';

export const enum ESmActionInfo {
    输出日志,
    释放技能,
    添加Buff,
    操作变量,
    操作白条,
}

export const enum EOp {
    设定,
    加,
    减,
    乘,
    除,
}

interface ISmActionInfoBase<T extends ESmActionInfo> {
    type: T;
}

interface ILogSmActionInfo extends ISmActionInfoBase<ESmActionInfo.输出日志> {
    message: string;
}

interface ICastSkillSmActionInfo extends ISmActionInfoBase<ESmActionInfo.释放技能> {
    skill: string;
}

interface IAddBuffSmActionInfo extends ISmActionInfoBase<ESmActionInfo.添加Buff> {
    buff: string;
}

interface ISetVarSmActionInfo extends ISmActionInfoBase<ESmActionInfo.操作变量> {
    id: string;
    op: EOp;
    value: number;
}

interface ISetWhiteBarSmActionInfo extends ISmActionInfoBase<ESmActionInfo.操作白条> {
    op: EOp;
    value: number;
}

export type ISmActionInfo = ILogSmActionInfo
    | ICastSkillSmActionInfo
    | IAddBuffSmActionInfo
    | ISetVarSmActionInfo
    | ISetWhiteBarSmActionInfo;

export function aLog(message: string): ISmActionInfo {
    return {
        type: ESmActionInfo.输出日志,
        message,
    };
}

export function checkAction(action: ISmActionInfo) {
    switch (action.type) {
        case ESmActionInfo.释放技能:
            if (!getSkillInfo(action.skill)) {
                throw new Error(`找不到技能${action.skill}`);
            }
            break;
        default:
            break;
    }
}

export function aCastSkill(skill: string): ISmActionInfo {
    return {
        type: ESmActionInfo.释放技能,
        skill,
    };
}

export function aVarOp(id: string, op: EOp, value: number): ISmActionInfo {
    return {
        type: ESmActionInfo.操作变量,
        id,
        op,
        value,
    };
}

export function aWhiteBarOp(op: EOp, value: number): ISmActionInfo {
    return {
        type: ESmActionInfo.操作白条,
        op,
        value,
    };
}
