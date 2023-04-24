export const whiteBarConfig = {
    max: 100,
    perDamage: 20,
    recoverSpeed: 20,
    recoverInterval: 20,
    recoverDelay: 5,
};

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
    buffs?: string[];
    hasWhiteBar?: boolean;
}
