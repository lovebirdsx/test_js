export const enum EVar {
    Boolean = 'Boolean',
    Int = 'Int',
    String = 'String',
    Float = 'Float',
    Entity = 'Entity',
    Quest = 'Quest',
    QuestState = 'QuestState',
    Pos = 'Pos',
}

export const enum EQuestState {
    InActive = 0, // 没有激活
    Ready = 1, // 可以接取
    Progress = 2, // 进行中
    Finish = 3, // 已完成
}

export interface IVectorInfo {
    X?: number;
    Y?: number;
    Z?: number;
}

export const varConfig = {
    [EVar.Boolean]: false,
    [EVar.Int]: 0,
    [EVar.String]: '',
    [EVar.Float]: 0,
    [EVar.Entity]: 1,
    [EVar.Quest]: 1,
    [EVar.QuestState]: EQuestState.InActive,
    [EVar.Pos]: undefined as unknown as IVectorInfo,
};

export function getVarDefaultValue<T extends EVar>(t: T): typeof varConfig[T] {
    return varConfig[t];
}

export type TVarValue = typeof varConfig[keyof typeof varConfig];

// 变量定义
export interface IVarDefine<T extends EVar = EVar> {
    Name: string;
    Type: T;
    Value: typeof varConfig[T];
}

// 变量访问
