import { listToMap } from '../common/util';

export const enum ERoleState {
    无敌,
    定身,
    禁锢,
    免疫伤害,
    免疫治疗,
    免疫控制,
    免疫眩晕,
    免疫沉默,
}

export interface IBuffInfo {
    id: string;
    maxDuration: number;
    states: ERoleState[];
}

const buffConfigs: IBuffInfo[] = [
    { id: '无敌', maxDuration: 1000, states: [ERoleState.无敌] },
];

const buffMap = listToMap(buffConfigs);
export function getBuffInfo(buffId: string): IBuffInfo {
    const result = buffMap.get(buffId);
    if (!result) {
        throw new Error(`buff ${buffId} not found`);
    }

    return result;
}
