import { listToMap } from '../common/util';

/* eslint-disable object-curly-newline */
export const enum ECamp {
    Player,
    Enemy,
}

export interface IRoleInfo {
    id: string;
    attack: number;
    maxHp: number;
    camp: ECamp;
    sm: string;
    buffs: string[];
}

const roleInfos: IRoleInfo[] = [
    { id: '玩家', maxHp: 100, attack: 20, camp: ECamp.Player, sm: '简单AI', buffs: [] },
    { id: '玩家-简单AI', maxHp: 100, attack: 20, camp: ECamp.Player, sm: '简单AI', buffs: [] },
    { id: '小怪', maxHp: 80, attack: 10, camp: ECamp.Enemy, sm: '普通AI', buffs: [] },
    { id: 'Boss', maxHp: 100, attack: 10, camp: ECamp.Enemy, sm: '简单AI', buffs: [] },
];

const roleInfoMap = listToMap(roleInfos as unknown as IRoleInfo[]);

export function getRoleInfo(id: string): IRoleInfo {
    const roleInfo = roleInfoMap.get(id);
    if (!roleInfo) {
        throw new Error(`roleInfo not found: ${id}`);
    }
    return roleInfo;
}
