export enum DataType {
    int = 'int',
    float = 'float',
    boolean = 'boolean',
    string = 'string',
    log = 'log',
    showMessage = 'showMessage',
    doCaculation = 'doCaculation',
    any = 'any',
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
    type: DataType,
    value: unknown,
}
