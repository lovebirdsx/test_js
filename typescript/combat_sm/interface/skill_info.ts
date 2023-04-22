export const enum ESkillTarget {
    自己,
    敌方单体,
    敌方全体,
}

export const enum ESkillAction {
    加Buff,
    减Buff,
    播放动画,
    造成伤害,
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
    damage: number;
}

export type ISkillActionInfo = IAddBuffActionInfo | IRemoveBuffActionInfo | IPlayAnimationActionInfo | IDamageActionInfo;

export interface ISkillInfo {
    id: string;
    target: ESkillTarget;
    actions: ISkillActionInfo[];
}
