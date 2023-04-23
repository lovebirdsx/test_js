import { listToMap } from '../common/util';

export const enum ESkillTarget {
    自己,
    敌方,
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
    damageRate: number;
}

export type ISkillActionInfo = IAddBuffActionInfo | IRemoveBuffActionInfo | IPlayAnimationActionInfo | IDamageActionInfo;

export interface ISkillInfo {
    id: string;
    target: ESkillTarget;
    actions: ISkillActionInfo[];
}

const skillInfos: ISkillInfo[] = [
     {
        id: '对自己造成伤害',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.播放动画, animationId: 'animation1', duration: 1 },
            { type: ESkillAction.造成伤害, damageRate: 2 },
        ],
    },
    {
        id: '对敌方造成伤害',
        target: ESkillTarget.敌方,
        actions: [
            { type: ESkillAction.播放动画, animationId: 'animation1', duration: 1 },
            { type: ESkillAction.造成伤害, damageRate: 2 },
        ],
    },
    {
        id: '普攻',
        target: ESkillTarget.敌方,
        actions: [
            { type: ESkillAction.播放动画, animationId: 'animation1', duration: 1 },
            { type: ESkillAction.造成伤害, damageRate: 1 },
        ],
    },
];

const skillMap = listToMap(skillInfos);

export function getSkillInfo(id: string): ISkillInfo {
    const result = skillMap.get(id);
    if (!result) {
        throw new Error(`Skill not found: ${id}`);
    }
    return result;
}
