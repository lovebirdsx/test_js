import { Disposable, DisposableStore, IDisposable, toDisposable } from './lifecycle';

export interface Event<T> {
    (listener: (e: T) => any, thisArgs?: any, disposables?: IDisposable[] | DisposableStore): IDisposable;
}

class Stacktrace {
    static create() {
        return new Stacktrace(new Error().stack!);
    }

    private constructor(readonly value: string) { }

    print() {
        console.warn(this.value.split('\n').slice(2).join('\n'));
    }
}

let id = 0;
class UniqueContainer<T> {
    stack?: Stacktrace;
    public id = id++;
    constructor(public readonly value: T) { }
}

type ListenerContainer<T> = UniqueContainer<(e: T) => void>;
type ListenerOrListeners<T> = ListenerContainer<T> | (ListenerContainer<T> | undefined)[];

export class Emitter<T> {
    private _disposed?: true;
    private _event?: Event<T>;

    protected _listeners?: ListenerOrListeners<T>;
    protected _size = 0;

    dispose() {
        if (this._disposed) {
            return;
        }

        this._disposed = true;
        if (this._listeners) {
            this._listeners = undefined;
            this._size = 0;
        }
    }

    get event(): Event<T> {
        this._event ??= (listener: (e: T) => any, thisArgs?: any, disposables?: DisposableStore | IDisposable[]) => {

            if (this._disposed) {
                return Disposable.None;
            }

            if (thisArgs) {
                listener = listener.bind(thisArgs);
            }

            const container = new UniqueContainer(listener);

            if (!this._listeners) {
                this._listeners = container;
            } else if (this._listeners instanceof UniqueContainer) {
                this._listeners = [this._listeners, container];
            } else {
                this._listeners.push(container);
            }

            this._size++;

            const result = toDisposable(() => { this._removeListener(container); });
            if (disposables instanceof DisposableStore) {
                disposables.add(result);
            } else if (Array.isArray(disposables)) {
                disposables.push(result);
            }

            return result;
        };

        return this._event;
    }

    private _removeListener(listener: ListenerContainer<T>) {
        if (!this._listeners) {
            return;
        }

        if (this._size === 1) {
            this._listeners = undefined;
            this._size = 0;
            return;
        }

        const listeners = this._listeners as (ListenerContainer<T> | undefined)[];
        const index = listeners.indexOf(listener);
        if (index === -1) {
            throw new Error('Attempted to remove listener which is not registered');
        }

        listeners.splice(index, 1);
    }

    private _fire(listener: undefined | UniqueContainer<(value: T) => void>, value: T) {
        if (!listener) {
            return;
        }
        
        listener.value(value);
    }

    fire(event: T): void {
        if (!this._listeners) {
            return;
        }

        if (this._listeners instanceof UniqueContainer) {
            this._fire(this._listeners, event);
            return;
        }

        for (const listener of this._listeners) {
            this._fire(listener, event);
        }
    }
}
