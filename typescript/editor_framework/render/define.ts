import { IMeta, IScheme } from '../scheme/define';

export interface IProps<
    TData = unknown,
    TMeta extends IMeta = IMeta,
    TParent = unknown,
    TScheme extends IScheme<TData, TMeta, TParent> = IScheme<
        TData,
        TMeta,
        TParent
    >
> {
    value: TData;
    scheme: TScheme;
    parent: TParent;
    parentScheme?: IScheme<TParent>;
    onModify: (obj: TData) => void;
    prefix?: string;
}

export type JSXElement = string;

export type Render<
    TData = unknown,
    TMeta = unknown,
    TParent = unknown,
    TScheme extends IScheme<TData, TMeta, TParent> = IScheme<
        TData,
        TMeta,
        TParent
    >
> = (props: IProps<TData, TMeta, TParent, TScheme>) => JSXElement;
