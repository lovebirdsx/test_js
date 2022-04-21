export type TFixResult = number;

export abstract class Scheme<TData = unknown> {
    abstract createDefault(): TData;

    hideName?: boolean;

    newLine?: boolean;

    fix(value: TData): TFixResult {
        return 0;
    }

    check(value: TData, messages: string[]): number {
        return 0;
    }
}

export type SchemeClass<TData = unknown> = new() => Scheme<TData>;

export function getSchemeClass(scheme: Scheme) {
    return scheme.constructor as SchemeClass;
}

export type Obj = Record<string, unknown>;

export enum Filter {
    showTalk,
    normal,
}

export type TFields<TData> = { [K in keyof TData]: Scheme<TData[K]> };

export abstract class ObjectScheme<TData=unknown> extends Scheme<TData> {
    abstract fields: TFields<TData>;

    filters: Filter[] = [Filter.normal];

    createDefault<TData>(): TData {
        const fieldArray = [];
        for (const key in this.fields) {
            const fieldScheme = this.fields[key];
            fieldArray.push([key, fieldScheme.createDefault()]);
        }
        return Object.fromEntries(fieldArray) as TData;
    }
}

export abstract class ActionScheme<TData = unknown> extends ObjectScheme<TData> {
    abstract name: string;
}

export type ActionSchemeClass = new () => ActionScheme;

export abstract class ArrayScheme<
    TElement = unknown,
    TElementScheme extends Scheme<TElement> = Scheme<TElement>,
> extends Scheme<TElement[]> {
    createDefault(): TElement[] {
        return [];
    }
    abstract elementScheme: TElementScheme;
}
