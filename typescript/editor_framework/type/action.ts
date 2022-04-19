export enum ValueType {
    int,
    float,
    boolean,
    string,
    log,
    showMessage,
    doCaculation,
    any,
}

export interface ILog {
    content: string;
}

export interface IShowMessage {
    content: string;
}

export type Op = 'sub' | 'add' | 'mut' | 'div';

export interface IDoCaculation {
    a: number;
    b: number;
    op: Op;
}

export interface IAny {
    type: ValueType,
    value: unknown,
}
