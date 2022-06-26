export type TQuestState = 'inactive' | 'idle' | 'accpet' | 'delivery' | 'finish';
export type TActionType = 'log';

export interface ICondition {

}

export interface IAction {
    type: TActionType;
    params: Record<string, unknown> | undefined;
}

export interface IActions {
    actions: IAction[];
}

export interface IQuestNode {
    enterActions: IActions;
    finishCondition: ICondition;
    finishActions: IActions;
}

export interface IQuest {
    id: number;
    unlockConditon: ICondition;
    unlockActions: IActions;
    nodes: IQuestNode[];
}

export abstract class Quest {

}
