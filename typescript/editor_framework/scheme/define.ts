import { ValueType } from '../type/action';

export interface IMeta {
    hideName?: boolean; // 是否显示字段的名字
}

export interface IScheme<T> {
    type: ValueType;
    createDefault: (container: unknown) => T;
    meta?: IMeta;
}

export interface IProps<T> {
    value: T;
    scheme: IScheme<T>;
    onModify: (obj: T) => void;
    prefixElement?: string;
}

export type Render<T> = (props: IProps<T>) => void;
