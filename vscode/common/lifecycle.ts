import { once } from "./functional";
import { Iterable } from "./iterator";

export interface IDisposable {
    dispose(): void;
}

export function dispose<T extends IDisposable>(arg: T | Iterable<T> | undefined): any {
    if (Iterable.is(arg)) {
        const erros: any[] = [];

        for (const item of arg) {
            if (item) {
                try {
                    item.dispose();
                } catch (e) {
                    erros.push(e);
                }
            }
        }

        if (erros.length === 1) {
            throw erros[0];
        } else if (erros.length > 1) {
            throw new AggregateError(erros);
        }

        return Array.isArray(arg) ? [] : undefined;
    }

    if (arg) {
        arg.dispose();
        return arg;
    }
}

export class DisposableStore implements IDisposable {
    static DISABLE_DISPOSED_WARNING = false;

    private readonly _toDispose = new Set<IDisposable>();
    private _isDisposed = false;

    dispose(): void {
        if (this._isDisposed) {
            return;
        }

        this._isDisposed = true;
        this.clear();
    }

    clear(): void {
        if (this._toDispose.size === 0) {
            return;
        }

        try {
            dispose(this._toDispose);
        } finally {
            this._toDispose.clear();
        }
    }

    add<T extends IDisposable>(t: T): T {
        if (!t) {
            return t;
        }

        if ((t as unknown as DisposableStore) === this) {
            throw new Error('Cannot register a disposable on itself!');
        }

        if (this._isDisposed) {
            if (!DisposableStore.DISABLE_DISPOSED_WARNING) {
                console.warn(new Error('Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!').stack);
            }
        } else {
            this._toDispose.add(t);
        }

        return t;
    }
}

export function toDisposable(fn: () => void): IDisposable {
    return { dispose: once(fn) };
}
