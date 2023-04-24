export const enum ESkillTarget {
    自己 = '自己',
    敌方 = '敌方',
}

export const enum ESkillAction {
    加Buff = '加Buff',
    减Buff = '减Buff',
    播放动画 = '播放动画',
    造成伤害 = '造成伤害',
    回复生命 = '回复生命',
}

export interface ISkillActionInfoBase<T extends ESkillAction> {
    type: T;
}

export interface IAddBuffActionInfo extends ISkillActionInfoBase<ESkillAction.加Buff> {
    buffIds: string[];
}

export interface IRemoveBuffActionInfo extends ISkillActionInfoBase<ESkillAction.减Buff> {
    buffIds: string[];
}

export interface IPlayAnimationActionInfo extends ISkillActionInfoBase<ESkillAction.播放动画> {
    animationId: string;
    duration: number;
}

export interface IDamageActionInfo extends ISkillActionInfoBase<ESkillAction.造成伤害> {
    damageRate: number;
}

export interface IRecoverHpActionInfo extends ISkillActionInfoBase<ESkillAction.回复生命> {
    hpRate: number;
}

export type ISkillActionInfo = IAddBuffActionInfo
    | IRemoveBuffActionInfo
    | IPlayAnimationActionInfo
    | IRecoverHpActionInfo
    | IDamageActionInfo;

export interface ISkillInfo {
    id: string;
    target: ESkillTarget;
    force?: boolean;
    actions: ISkillActionInfo[];
}
