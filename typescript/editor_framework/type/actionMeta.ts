import { IMeta } from '../scheme/define';

export interface ILogMeta extends IMeta {
    foo: string
}

export interface IShowMessageMeta extends IMeta {
    bar: string
}
