// T为Data类型, M为meta类型,PT为父节点类型
export type TFixResult = number;

export enum RenderType {
    int = 'int',
    float = 'float',
    boolean = 'boolean',
    string = 'string',
    object = 'object',
    array = 'array',
    dynamic = 'dynamic',
}

export interface IMeta {
    hideName?: boolean,
    newLine?: boolean,
}

export interface IScheme<TData = unknown, TMeta extends IMeta = IMeta, TParent = unknown> {
    renderType: RenderType;
    createDefault: (parent: TParent) => TData;
    fix(value: TData, container: TParent): TFixResult;
    check(value: TData, container: TParent, messages: string[]): number;
    meta: TMeta;
}

export type Obj = Record<string, unknown>;

export enum Filter {
    showTalk,
    normal,
}

export interface IObjMeta extends IMeta {
    filters: Filter[],
}

export interface IObjectScheme<
    TData = unknown,
    TMeta = IObjMeta,
    TParent = unknown
> extends IScheme<TData, TMeta, TParent> {
    fields: { [K in keyof TData]: IScheme<TData[K]> };
}

export function createScheme<
    TData = unknown,
    TMeta = unknown,
    TParent = unknown
>(
    renderType: RenderType,
    createDefault: (parent: TParent) => TData,
    meta: TMeta,
    scheme: Partial<IScheme<TData, TMeta, TParent>> = {},
): IScheme<TData, TMeta, TParent> {
    const newScheme: IScheme<TData, TMeta, TParent> = {
        renderType,
        createDefault,
        fix: scheme.fix || (() => 0),
        check: scheme.check || (() => 0),
        meta,
    };
    return newScheme;
}

export type TFields<TData> = { [K in keyof TData]: IScheme<TData[K]> };

function createDefaultObject<TData>(fields: TFields<TData>): TData {
    const fieldArray = [];
    for (const key in fields) {
        const fieldScheme = fields[key];
        fieldArray.push([key, fieldScheme.createDefault(undefined)]);
    }
    return Object.fromEntries(fieldArray) as TData;
}

export function createObjectScheme<
    TData = unknown,
    TMeta extends IObjMeta = IObjMeta,
    TParent = unknown
>(
    fields: TFields<TData>,
    schema: Partial<IObjectScheme<TData, TMeta, TParent>> = {},
): IObjectScheme<TData, TMeta, TParent> {
    return {
        renderType: RenderType.object,
        createDefault: () => createDefaultObject(fields),
        fields,
        fix: () => 0,
        check: () => 0,
        meta: schema.meta || {
            filters: [Filter.normal],
        } as TMeta,
    };
}

export interface IArrayMeta {
    showName?: string,
    newLine?: boolean,
}

export interface IArrayScheme<
    TElement = unknown,
    TElementMeta = IArrayMeta,
    TParent = unknown,
    TElementScheme extends IScheme<TElement, TElementMeta, TElement[]> = IScheme<TElement, TElementMeta, TElement[]>,
> extends IScheme<TElement[], TElementMeta, TParent> {
    elementScheme: TElementScheme;
}

export function createArrayScheme<
    TElement = unknown,
    TElementMeta = unknown,
    TParent = unknown,
    TElementScheme extends IScheme<TElement, TElementMeta, TElement[]> = IScheme<TElement, TElementMeta, TElement[]>,
>(
    elementScheme: TElementScheme,
    schema: Partial<IArrayScheme<TElement, TElementMeta, TParent, TElementScheme>> = {},
): IArrayScheme<TElement, TElementMeta, TParent, TElementScheme> {
    return {
        renderType: RenderType.array,
        createDefault: () => [],
        fix: () => 0,
        check: () => 0,
        meta: schema.meta || {} as TElementMeta,
        elementScheme,
    };
}
