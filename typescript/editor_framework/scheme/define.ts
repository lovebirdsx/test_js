// T为Data类型, M为meta类型,PT为父节点类型
export interface IScheme<T = unknown, M = unknown, PT = unknown> {
    createDefault: (parent: PT) => T;
    meta: M;
}

export interface IProps<T = unknown, M = unknown, PT = unknown> {
    value: T;
    scheme: IScheme<T, M, PT>;
    parent: PT,
    parentScheme?: IScheme<PT>,
    onModify: (obj: T) => void;
    prefixElement?: string;
}

type JSXElement = void;

export type Render<T=unknown, M=unknown, PT=unknown> = (props: IProps<T, M, PT>) => JSXElement;
