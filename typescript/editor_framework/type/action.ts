export enum DataType {
    int = 'int',
    float = 'float',
    boolean = 'boolean',
    string = 'string',
    log = 'log',
    showMessage = 'showMessage',
    doCaculation = 'doCaculation',
    any = 'any',
    talkItem = 'talkItem',
    showTalk = 'showTalk',
    op = 'op',
}

export interface ILog {
    content: string;
}

export interface IShowMessage {
    content: string;
}

export interface ITalkItem {
    who: string;
    content: string;
}

export interface IShowTalk {
    resetCamera: boolean;
    items: ITalkItem[];
}

export type Op = 'sub' | 'add' | 'mut' | 'div';

export interface IDoCaculation {
    a: number;
    b: number;
    op: Op;
}

export interface IDynamic {
    type: DataType,
    value: unknown,
}
