import { listToMap } from '../common/util';
import { ISkillInfo, ESkillTarget, ESkillAction } from '../interface/skill_info';

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
    {
        id: '猩猩.上柱',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.上柱', duration: 1 },
        ],
    },
    {
        id: '猩猩.跳下',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.跳下', duration: 1 },
        ],
    },
    {
        id: '猩猩.一阶段瘫痪',
        target: ESkillTarget.自己,
        force: true,
        actions: [
            { type: ESkillAction.播放动画, animationId: '一阶段瘫痪', duration: 3 },
        ],
    },
    {
        id: '猩猩.二阶段瘫痪',
        target: ESkillTarget.自己,
        force: true,
        actions: [
            { type: ESkillAction.播放动画, animationId: '二阶段瘫痪', duration: 3 },
        ],
    },
    {
        id: '猩猩.表演1',
        target: ESkillTarget.自己,
        force: true,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.表演1', duration: 1 },
        ],
    },
    {
        id: '猩猩.表演2',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.表演2', duration: 1 },
        ],
    },
    {
        id: '猩猩.表演3',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.表演3', duration: 1 },
        ],
    },
    {
        id: '猩猩.索敌1',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.索敌1', duration: 1 },
        ],
    },
    {
        id: '猩猩.索敌2',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.索敌2', duration: 1 },
        ],
    },
    {
        id: '猩猩.技能1',
        target: ESkillTarget.敌方,
        actions: [
            { type: ESkillAction.造成伤害, damageRate: 1 },
            { type: ESkillAction.播放动画, animationId: '猩猩.技能1', duration: 1 },
        ],
    },
    {
        id: '猩猩.技能2',
        target: ESkillTarget.敌方,
        actions: [
            { type: ESkillAction.造成伤害, damageRate: 1.5 },
            { type: ESkillAction.播放动画, animationId: '猩猩.技能2', duration: 1 },
        ],
    },
    {
        id: '猩猩.转阶段定位',
        target: ESkillTarget.自己,
        force: true,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.转阶段定位', duration: 1.5 },
        ],
    },
    {
        id: '猩猩.转阶段上柱',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.转阶段上柱', duration: 1.5 },
        ],
    },
    {
        id: '猩猩.转阶段下柱',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.转阶段下柱', duration: 1.5 },
        ],
    },
    {
        id: '猩猩.转阶段咆哮',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.转阶段咆哮', duration: 1.5 },
        ],
    },
    {
        id: '猩猩.转阶段结束',
        target: ESkillTarget.自己,
        actions: [
            { type: ESkillAction.播放动画, animationId: '猩猩.转阶段结束', duration: 1.5 },
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
