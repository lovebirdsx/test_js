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

export interface IAction {
    name: string,
    value: unknown,
}
