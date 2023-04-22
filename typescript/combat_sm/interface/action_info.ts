export const enum EActionInfo {
    Log = 'Log',
    CastSkill = 'CastSkill',
    AddBuff = 'AddBuff',
}

interface IActionBase<T extends EActionInfo> {
    type: T;
}

interface ILogAction extends IActionBase<EActionInfo.Log> {
    message: string;
}

interface ICastSkillAction extends IActionBase<EActionInfo.CastSkill> {
    skill: string;
}

interface IAddBuffAction extends IActionBase<EActionInfo.AddBuff> {
    buff: string;
}

export type IActionInfo = ILogAction | ICastSkillAction | IAddBuffAction;
