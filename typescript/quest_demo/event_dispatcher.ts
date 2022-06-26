export type TEventHandle = (...args: any[]) => void;

export type TEventHandleParams<T> = T extends (...args: infer U) => void ? U : never;

export class EventDispacher<TEventType extends string, TEventDefine extends Record<TEventType, TEventHandle>> {
    private handlesMap: Map<TEventType, Set<TEventHandle>> = new Map();

    reg<T extends TEventType>(type: T, handle: TEventDefine[T]) {
        let handles = this.handlesMap.get(type);
        if (!handles) {
            handles = new Set<TEventDefine[T]>();
            this.handlesMap.set(type, handles);
        }

        handles.add(handle);
    }

    unReg<T extends TEventType>(type: T, handle: TEventDefine[T]) {
        const handlers = this.handlesMap.get(type);
        if (!handlers || !handlers.has(handle)) {
            console.error(`unReg for type ${type}`);
            return;
        }

        handlers.delete(handle);
    }

    dispatch<T extends TEventType>(type: T, ...params: TEventHandleParams<TEventDefine[T]>) {
        const handles = this.handlesMap.get(type);
        if (handles) {
            handles.forEach((handle) => {
                handle(...params);
            });
        }
    }
}
