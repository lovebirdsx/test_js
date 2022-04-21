import { Scheme, SchemeClass } from '../scheme/define';

type ContextHandler = number;

interface IContextSlot {
    handle: ContextHandler,
    SchemeClass: SchemeClass,
}

export class GlobalContexts {
    contextMap = new Map<SchemeClass, unknown>();
    slots: IContextSlot[] = [];
    slotHandle = 0;

    set<T>(SchemeClass: SchemeClass<T>, t: T): ContextHandler {
        const slot: IContextSlot = {
            handle: this.slotHandle++,
            SchemeClass,
        };
        this.contextMap.set(SchemeClass, t);
        this.slots.push(slot);
        return slot.handle;
    }

    remove(handler: ContextHandler) {
        const slotIndex = this.slots.findIndex((slot) => slot.handle === handler);
        if (slotIndex < 0) {
            throw new Error(`Remove unexist handle ${handler}`);
        }

        const [slot] = this.slots.splice(slotIndex, 1);
        this.contextMap.delete(slot.SchemeClass);
    }

    get<T>(scheme: SchemeClass<T>) {
        return this.contextMap.get(scheme) as T;
    }
}

let globalContext: GlobalContexts;

export function getGlobalContexts() {
    if (!globalContext) {
        globalContext = new GlobalContexts();
    }
    return globalContext;
}

export interface IProps<
    TData = unknown,
    TScheme extends Scheme<TData> = Scheme<TData>
> {
    value: TData;
    scheme: TScheme;
    onModify?: (obj: TData) => void;
    prefix: string;
}

export type JSXElement = string;

export type Render<
    TData = unknown,
    TScheme extends Scheme<TData> = Scheme<TData>
> = (props: IProps<TData, TScheme>) => JSXElement;

export function makeIndent(prefix: string): string {
    let indentCount = prefix.split('--').length - 1;
    if (indentCount <= 0) {
        indentCount = 0;
    }
    return `${'--'.repeat(indentCount + 1)}`;
}
