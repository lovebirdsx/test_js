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

export abstract class Scheme<TData = unknown, TMeta extends IMeta = IMeta, TParent = unknown> {
    abstract createDefault(parent: TParent): TData;

    fix(value: TData, container: TParent): TFixResult {
        return 0;
    }

    check(value: TData, container: TParent, messages: string[]): number {
        return 0;
    }

    meta: TMeta = {} as TMeta;
}

export type SchemeClass = new() => Scheme;

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
> extends Scheme<TData, TMeta, TParent> {
    abstract fields: TFields<TData>;
    abstract name: string;
    meta: TMeta = { filters: [Filter.normal] } as TMeta;

    createDefault<TData>(): TData {
        const fieldArray = [];
        for (const key in this.fields) {
            const fieldScheme = this.fields[key];
            fieldArray.push([key, fieldScheme.createDefault(undefined)]);
        }
        return Object.fromEntries(fieldArray) as TData;
    }
}

export type ObjectSchemeClass = new () => ObjectScheme;

export interface IArrayMeta {
    showName?: string,
    newLine?: boolean,
}

export abstract class ArrayScheme<
    TElement = unknown,
    TElementMeta = IArrayMeta,
    TParent = unknown,
    TElementScheme extends Scheme<TElement, TElementMeta, TElement[]> = Scheme<TElement, TElementMeta, TElement[]>,
> extends Scheme<TElement[], TElementMeta, TParent> {
    createDefault(parent: TParent): TElement[] {
        return [];
    }
    abstract elementScheme: TElementScheme;
}
