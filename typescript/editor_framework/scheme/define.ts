import { ValueType } from '../type/action';

export interface IMeta {
    hideName?: boolean; // 是否显示字段的名字
}

export interface IScheme<T, M extends IMeta> {
    type: ValueType;
    createDefault: (container: unknown) => T;
    meta: M;
}

export interface IProps<T, M extends IMeta = IMeta> {
    value: T;
    scheme: IScheme<T, M>;
    onModify: (obj: T) => void;
    prefixElement?: string;
}

export type Render<T, M> = (props: IProps<T, M>) => void;
