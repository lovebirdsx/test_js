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
    回复生命,
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
    actions: ISkillActionInfo[];
}

const skillInfos: ISkillInfo[] = [
    {
        id: '对自己造成伤害',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.造成伤害, damageRate: 2 },
            { type: ESkillAction.播放动画, animationId: '伤害自己动画', duration: 1 },
        ],
    },
    {
        id: '对敌方造成伤害',
        target: ESkillTarget.敌方,
        actions: [
            { type: ESkillAction.造成伤害, damageRate: 2 },
            { type: ESkillAction.播放动画, animationId: '伤害敌方动画', duration: 1 },
        ],
    },
    {
        id: '普攻',
        target: ESkillTarget.敌方,
        actions: [
            { type: ESkillAction.造成伤害, damageRate: 1 },
            { type: ESkillAction.播放动画, animationId: '普攻动画', duration: 1 },
        ],
    },
    {
        id: '回复20%生命',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.回复生命, hpRate: 0.2 },
            { type: ESkillAction.播放动画, animationId: '回复生命动画', duration: 1 },
        ],
    },
    {
        id: '回复50%生命',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.回复生命, hpRate: 0.5 },
            { type: ESkillAction.播放动画, animationId: '回复生命动画', duration: 1 },
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
