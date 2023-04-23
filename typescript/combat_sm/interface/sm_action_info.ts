export const enum ESmActionInfo {
    Log = 'Log',
    CastSkill = 'CastSkill',
    AddBuff = 'AddBuff',
}

interface ISmActionInfoBase<T extends ESmActionInfo> {
    type: T;
}

interface ILogSmActionInfo extends ISmActionInfoBase<ESmActionInfo.Log> {
    message: string;
}

interface ICastSkillSmActionInfo extends ISmActionInfoBase<ESmActionInfo.CastSkill> {
    skill: string;
}

interface IAddBuffSmActionInfo extends ISmActionInfoBase<ESmActionInfo.AddBuff> {
    buff: string;
}

export type ISmActionInfo = ILogSmActionInfo | ICastSkillSmActionInfo | IAddBuffSmActionInfo;

export function aLog(message: string): ISmActionInfo {
    return {
        type: ESmActionInfo.Log,
        message,
    };
}
