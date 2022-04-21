// T为Data类型, M为meta类型,PT为父节点类型
export type TFixResult = number;

export interface IMeta {
    hideName?: boolean,
    newLine?: boolean,
}

export abstract class Scheme<TData = unknown, TMeta extends IMeta = IMeta> {
    abstract createDefault(): TData;

    fix(value: TData): TFixResult {
        return 0;
    }

    check(value: TData, messages: string[]): number {
        return 0;
    }

    meta: TMeta = {} as TMeta;
}

export type SchemeClass<TData = unknown, TMeta extends IMeta = IMeta> = new() => Scheme<TData, TMeta>;

export function getSchemeClass(scheme: Scheme) {
    return scheme.constructor as SchemeClass;
}

export type Obj = Record<string, unknown>;

export enum Filter {
    showTalk,
    normal,
}

export interface IObjMeta extends IMeta {
    filters: Filter[],
}

export type TFields<TData> = { [K in keyof TData]: Scheme<TData[K]> };

export abstract class ObjectScheme<
    TData = unknown,
    TMeta extends IObjMeta = IObjMeta,
    TParent = unknown
> extends Scheme<TData, TMeta> {
    abstract fields: TFields<TData>;
    meta: TMeta = { filters: [Filter.normal] } as TMeta;

    createDefault<TData>(): TData {
        const fieldArray = [];
        for (const key in this.fields) {
            const fieldScheme = this.fields[key];
            fieldArray.push([key, fieldScheme.createDefault()]);
        }
        return Object.fromEntries(fieldArray) as TData;
    }
}

export abstract class ActionScheme<TData = unknown,
    TMeta extends IObjMeta = IObjMeta,
    TParent = unknown
> extends ObjectScheme<TData, TMeta, TParent> {
    abstract name: string;
}

export type ActionSchemeClass = new () => ActionScheme;

export interface IArrayMeta {
    showName?: string,
    newLine?: boolean,
}

export abstract class ArrayScheme<
    TElement = unknown,
    TElementMeta = IArrayMeta,
    TParent = unknown,
    TElementScheme extends Scheme<TElement, TElementMeta> = Scheme<TElement, TElementMeta>,
> extends Scheme<TElement[], TElementMeta> {
    createDefault(): TElement[] {
        return [];
    }
    abstract elementScheme: TElementScheme;
}
