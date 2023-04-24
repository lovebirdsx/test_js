export const enum ERoleState {
    无敌 = '无敌',
    定身 = '定身',
    禁锢 = '禁锢',
    免疫伤害 = '免疫伤害',
    免疫治疗 = '免疫治疗',
    免疫控制 = '免疫控制',
    免疫眩晕 = '免疫眩晕',
    免疫沉默 = '免疫沉默',
    瘫痪 = '瘫痪',
}

export interface IBuffInfo {
    id: string;
    duration: number;
    states: ERoleState[];
}
