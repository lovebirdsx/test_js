import { IDisposable } from './lifecycle';

export interface IdleDeadline {
    didTimeout: boolean;
    timeRemaining(): number;
}

export function runWhenIdle(runner: (idle: IdleDeadline) => void, timeout?: number): IDisposable {
    let disposed = false;
    setTimeout(() => {
        if (disposed) {
            return;
        }

        const end = Date.now() + 15;
        runner(Object.freeze({
            didTimeout: true,
            timeRemaining() {
                return Math.max(0, end - Date.now());
            },
        }));
    }, 0);
    return {
        dispose() {
            if (disposed) {
                return;
            }
            disposed = true;
        },
    };
}

export class IdleValue<T> {
    private readonly _executor: () => void;
    private readonly _handle: IDisposable;

    private _didRun = false;
    private _value?: T;
    private _error?: unknown;

    constructor(executor: () => T) {
        this._executor = () => {
            try {
                this._value = executor();
            } catch (err) {
                this._error = err;
            } finally {
                this._didRun = true;
            }
        };

        this._handle = runWhenIdle(() => this._executor());
    }

    dispose() {
        this._handle.dispose();
    }

    get value(): T {
        if (!this._didRun) {
            this._handle.dispose();
            this._executor();
        }
        if (this._error) {
            throw this._error;
        }
        return this._value!;
    }

    get isInitialized(): boolean {
        return this._didRun;
    }
}

export async function wait(timeout: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}
