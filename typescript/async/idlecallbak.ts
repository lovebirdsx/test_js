import { CircularQueue } from './circularQueue';
import { IDisposable } from './lifeCycle';

export interface IIdleDeadline {
    DidTimeout: boolean;
    TimeRemaining: () => number;
}

export type TIdleCallback = (deadline: IIdleDeadline) => void;

export interface IIdleCallbackService {
    Call: (callback: TIdleCallback, timeout?: number) => number;
    Cancel: (handle: number) => void;
}

interface IIdleItem {
    Id: number;
    Callback: TIdleCallback;
    IsTimeout?: boolean;
    IsCanceled?: boolean;
    Handle?: NodeJS.Timeout;
}

export class IdleCallbackService implements IDisposable, IIdleCallbackService {
    public static readonly Interval = 1000 / 20;

    private LastTickTime = Date.now();
    private Id = 0;
    private IsAlwaysBusy = false;
    private readonly Queue = new CircularQueue<IIdleItem>(100);
    private readonly ItemById = new Map<number, IIdleItem>();
    private TickHandle?: NodeJS.Timeout;

    public constructor() {
        this.TickHandle = setInterval(() => {
            this.TickCallback();
        }, 0);
    }

    /**
     * 设定是否总是忙碌，如果总是忙碌，则不会执行没有带超时的回调
     * 如果回调设定了超时时间，会在超时时执行回调
     * 该接口用于调试，不要在正式代码中使用
     */
    public SetBusy(value: boolean): void {
        this.IsAlwaysBusy = value;
    }

    public Dispose(): void {
        if (this.TickHandle) {
            clearInterval(this.TickHandle);
            this.TickHandle = undefined;
        }

        while (!this.Queue.IsEmpty()) {
            const item = this.Queue.DeQueue()!;
            if (item.Handle) {
                clearTimeout(item.Handle);
            }
        }
    }

    private TickCallback(): void {
        if (this.IsAlwaysBusy) {
            return;
        }

        const desiredTickEndTime = this.LastTickTime + IdleCallbackService.Interval;
        while (Date.now() < desiredTickEndTime) {
            const item = this.Queue.DeQueue();
            if (!item) {
                break;
            }

            if (item.IsCanceled || item.IsTimeout) {
                continue;
            }

            this.Remove(item.Id);

            item.Callback({
                DidTimeout: false,
                TimeRemaining: () => {
                    const timeRemaining = desiredTickEndTime - Date.now();
                    return timeRemaining > 0 ? timeRemaining : 0;
                },
            });
        }

        this.LastTickTime = Date.now();
    }

    private Add(callback: TIdleCallback, timeout?: number): IIdleItem {
        const item: IIdleItem = { Id: this.Id++, Callback: callback };
        this.Queue.EnQueue(item);
        this.ItemById.set(item.Id, item);
        return item;
    }

    private Remove(id: number): void {
        const item = this.ItemById.get(id);
        if (!item) {
            return;
        }

        item.IsCanceled = true;
        this.ItemById.delete(id);

        if (item.Handle) {
            clearTimeout(item.Handle);
        }
    }

    public Call(callback: TIdleCallback, timeout?: number): number {
        const item = this.Add(callback, timeout);

        if (timeout && timeout > 0) {
            item.Handle = setTimeout(() => {
                if (item.IsTimeout || item.IsCanceled) {
                    return;
                }

                item.IsTimeout = true;
                item.Handle = undefined;
                callback({ DidTimeout: true, TimeRemaining: () => 0 });
            }, timeout);
        }

        return item.Id;
    }

    public Cancel(handle: number): void {
        this.Remove(handle);
    }
}

let idleCallbackService: IIdleCallbackService = new IdleCallbackService();
export function getIdleCallbackService(): IIdleCallbackService {
    return idleCallbackService;
}

export function setIdleCallbackService(service: IIdleCallbackService): void {
  if (idleCallbackService instanceof IdleCallbackService) {
    idleCallbackService.Dispose();
  }

  idleCallbackService = service;
}
