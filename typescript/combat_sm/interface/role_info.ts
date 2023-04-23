export const enum ECamp {
    Player,
    Enemy,
}

export interface IRoleInfo {
    id: string;
    maxHp: number;
    camp: ECamp;
    buffs: string[];
}
