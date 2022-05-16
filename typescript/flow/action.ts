import { Entity } from './entity/entity';

export enum EAction {
    Log,
    Wait,
    MoveToPos,
    ShowTalk,
}

export interface IActionInfo {
    type: EAction;
    async?: boolean;
    params: unknown;
}

export class Action<T = unknown> {
    readonly entity: Entity;
    constructor(entity: Entity) {
        this.entity = entity;
    }

    public async executeSync(t: T): Promise<void> {
        throw new Error(`${this.constructor.name} ExecuteSync is not implemented`);
    }

    public execute(t: T) {
        throw new Error(`${this.constructor.name} Execute is not implemented`);
    }

    public stop() {
        throw new Error(`${this.constructor.name} stop is not implemented`);
    }

    public get isStopable() {
        return true;
    }

    public get isScheduable() {
        return false;
    }

    public reset() {}
}

export interface ILog {
    content: string;
}

export interface IWait {
    time: number;
}

export interface IVector {
    x: number;
    y: number;
}

export interface IMoveToPos {
    pos: IVector;
}
