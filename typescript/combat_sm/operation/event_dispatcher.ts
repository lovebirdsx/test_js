// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TEventHandle = (...args: any[]) => void;

export type TEventHandleParams<T> = T extends (...args: infer U) => void ? U : never;

export class EventDispatcher<
    TEventDefine extends Record<string, TEventHandle>,
    TEventType extends keyof TEventDefine = keyof TEventDefine,
> {
    private readonly HandlesMap: Map<TEventType, Set<TEventHandle>> = new Map();

    reg<T extends TEventType>(type: T, handle: TEventDefine[T]): void {
        let handles = this.HandlesMap.get(type);
        if (!handles) {
            handles = new Set<TEventDefine[T]>();
            this.HandlesMap.set(type, handles);
        }
        handles.add(handle);
    }

    unReg<T extends TEventType>(type: T, handle: TEventDefine[T]): void {
        const handlers = this.HandlesMap.get(type);
        if (!handlers || !handlers.has(handle)) {
            return;
        }
        handlers.delete(handle);
    }

    setReg<T extends TEventType>(
        type: T,
        handle: TEventDefine[T],
        isRegsited: boolean,
    ): void {
        if (isRegsited) {
            this.reg(type, handle);
        } else {
            this.unReg(type, handle);
        }
    }

    hasReg<T extends TEventType>(type: T, handle: TEventDefine[T]): boolean {
        const handlers = this.HandlesMap.get(type);
        if (!handlers) {
            return false;
        }
        return handlers?.has(handle);
    }

    dispatch<T extends TEventType>(
        type: T,
        ...params: TEventHandleParams<TEventDefine[T]>
    ): void {
        const handles = this.HandlesMap.get(type);
        if (handles) {
            handles.forEach((handle) => {
                handle(...params);
            });
        }
    }
}
