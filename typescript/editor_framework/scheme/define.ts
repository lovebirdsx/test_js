export type TFixResult = number;

export class Scheme<TData = unknown> {
    createDefault(): TData {
        return undefined as unknown as TData;
    }

    name = 'unknown';

    hideName?: boolean;

    newLine?: boolean;
}

export type SchemeClass<TData = unknown> = new() => Scheme<TData>;

export function getSchemeClass(scheme: Scheme) {
    return scheme.constructor as SchemeClass;
}

export function createScheme<T, TScheme extends Scheme<T> = Scheme<T>>(
    params: Partial<TScheme>,
    SchemeClass: SchemeClass<T> = Scheme,
): TScheme {
    const scheme = new SchemeClass();
    Object.assign(scheme, params);
    return scheme as TScheme;
}

export class EnumScheme<T extends string> extends Scheme<T> {
    createDefault(): T {
        return this.Values[0];
    }

    Names: string[] = ['undefined'];
    Values: T[] = ['undefined' as T];
}

export function createEnumScheme<T extends string>(params: Partial<EnumScheme<T>>): EnumScheme<T> {
    return createScheme<T, EnumScheme<T>>(params);
}

export enum Filter {
    showTalk,
    normal,
}

export type TFields<TData> = { [K in keyof TData]: Scheme<TData[K]> };

export type Obj = Record<string, unknown>;

export class ObjectScheme<T=unknown> extends Scheme<T> {
    fields: TFields<T> = {} as TFields<T>;
    createDefault<T>(): T {
        const fieldArray = [];
        for (const key in this.fields) {
            const fieldScheme = this.fields[key];
            fieldArray.push([key, fieldScheme.createDefault()]);
        }
        return Object.fromEntries(fieldArray) as T;
    }
}

export function createObjectScheme<T>(params: Partial<ObjectScheme<T>>): ObjectScheme<T> {
    return createScheme(params, ObjectScheme);
}

export class ActionScheme<T = unknown> extends ObjectScheme<T> {
    filters: Filter[] = [Filter.normal];
}

export function createActionScheme<T>(params: Partial<ActionScheme<T>>): ActionScheme<T> {
    return createScheme(params, ActionScheme);
}

export type ActionSchemeClass = new () => ActionScheme;

export class ArrayScheme<
    TElement = unknown,
    TElementScheme extends Scheme<TElement> = Scheme<TElement>,
> extends Scheme<TElement[]> {
    createDefault(): TElement[] {
        return [];
    }
    elementScheme: TElementScheme = undefined as unknown as TElementScheme;
}

export function createArrayScheme<TElement>(params: Partial<ArrayScheme<TElement>>): ArrayScheme<TElement> {
    return createScheme(params, ArrayScheme);
}
