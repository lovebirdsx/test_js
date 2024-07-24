import { onUnexpectedError } from './errors';
import { once as onceFun } from './functional';
import { Disposable, DisposableStore, IDisposable, toDisposable } from './lifecycle';
import { StopWatch } from './stopwatch';

// -----------------------------------------------------------------------------------------------------------------------
// Uncomment the next line to print warnings whenever an emitter with listeners is disposed. That is a sign of code smell.
// -----------------------------------------------------------------------------------------------------------------------
const _enableDisposeWithListenerWarning = false;

// _enableDisposeWithListenerWarning = Boolean("TRUE"); // causes a linter warning so that it cannot be pushed

// -----------------------------------------------------------------------------------------------------------------------
// Uncomment the next line to print warnings whenever a snapshotted event is used repeatedly without cleanup.
// See https://github.com/microsoft/vscode/issues/142851
// -----------------------------------------------------------------------------------------------------------------------
const _enableSnapshotPotentialLeakWarning = false;
// _enableSnapshotPotentialLeakWarning = Boolean("TRUE"); // causes a linter warning so that it cannot be pushed


export interface Event<T> {
    (listener: (e: T) => any, thisArgs?: any, disposables?: IDisposable[] | DisposableStore): IDisposable;
}

export namespace Event {
    export const None: Event<any> = () => Disposable.None;

    function _addLeakageTraceLogic(options: EmitterOptions) {
		if (_enableSnapshotPotentialLeakWarning) {
			const { onDidAddListener: origListenerDidAdd } = options;
			const stack = Stacktrace.create();
			let count = 0;
			options.onDidAddListener = () => {
				if (++count === 2) {
					console.warn('snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here');
					stack.print();
				}
				origListenerDidAdd?.();
			};
		}
	}

    /**
	 * Given an event, returns another event which only fires once.
	 *
	 * @param event The event source for the new event.
	 */
	export function once<T>(event: Event<T>): Event<T> {
		return (listener, thisArgs = null, disposables?) => {
			// we need this, in case the event fires during the listener call
			let didFire = false;
			let result: IDisposable | undefined = undefined;
			result = event(e => {
				if (didFire) {
					return;
				} else if (result) {
					result.dispose();
				} else {
					didFire = true;
				}

				return listener.call(thisArgs, e);
			}, null, disposables);

			if (didFire) {
				result.dispose();
			}

			return result;
		};
	}

    /**
	 * Creates a promise out of an event, using the {@link Event.once} helper.
	 */
	export function toPromise<T>(event: Event<T>): Promise<T> {
		return new Promise(resolve => once(event)(resolve));
	}

    function snapshot<T>(event: Event<T>, disposable: DisposableStore | undefined): Event<T> {
		let listener: IDisposable | undefined;

		const options: EmitterOptions | undefined = {
			onWillAddFirstListener() {
				listener = event(emitter.fire, emitter);
			},
			onDidRemoveLastListener() {
				listener?.dispose();
			}
		};

		if (!disposable) {
			_addLeakageTraceLogic(options);
		}

		const emitter = new Emitter<T>(options);

		disposable?.add(emitter);

		return emitter.event;
	}

    /**
	 * Wraps an event in another event that fires only when some condition is met.
	 *
	 * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
	 * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
	 * returned event causes this utility to leak a listener on the original event.
	 *
	 * @param event The event source for the new event.
	 * @param filter The filter function that defines the condition. The event will fire for the object if this function
	 * returns true.
	 * @param disposable A disposable store to add the new EventEmitter to.
	 */
	export function filter<T, U>(event: Event<T | U>, filter: (e: T | U) => e is T, disposable?: DisposableStore): Event<T>;
	export function filter<T>(event: Event<T>, filter: (e: T) => boolean, disposable?: DisposableStore): Event<T>;
	export function filter<T, R>(event: Event<T | R>, filter: (e: T | R) => e is R, disposable?: DisposableStore): Event<R>;
	export function filter<T>(event: Event<T>, filter: (e: T) => boolean, disposable?: DisposableStore): Event<T> {
		return snapshot((listener, thisArgs = null, disposables?) => event(e => filter(e) && listener.call(thisArgs, e), null, disposables), disposable);
	}

    /**
	 * Buffers an event until it has a listener attached.
	 *
	 * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
	 * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
	 * returned event causes this utility to leak a listener on the original event.
	 *
	 * @param event The event source for the new event.
	 * @param flushAfterTimeout Determines whether to flush the buffer after a timeout immediately or after a
	 * `setTimeout` when the first event listener is added.
	 * @param _buffer Internal: A source event array used for tests.
	 *
	 * @example
	 * ```
	 * // Start accumulating events, when the first listener is attached, flush
	 * // the event after a timeout such that multiple listeners attached before
	 * // the timeout would receive the event
	 * this.onInstallExtension = Event.buffer(service.onInstallExtension, true);
	 * ```
	 */
	export function buffer<T>(event: Event<T>, flushAfterTimeout = false, _buffer: T[] = []): Event<T> {
		let buffer: T[] | null = _buffer.slice();

		let listener: IDisposable | null = event(e => {
			if (buffer) {
				buffer.push(e);
			} else {
				emitter.fire(e);
			}
		});

		const flush = () => {
			buffer?.forEach(e => emitter.fire(e));
			buffer = null;
		};

		const emitter = new Emitter<T>({
			onWillAddFirstListener() {
				if (!listener) {
					listener = event(e => emitter.fire(e));
				}
			},

			onDidAddFirstListener() {
				if (buffer) {
					if (flushAfterTimeout) {
						setTimeout(flush);
					} else {
						flush();
					}
				}
			},

			onDidRemoveLastListener() {
				if (listener) {
					listener.dispose();
				}
				listener = null;
			}
		});

		return emitter.event;
	}
}

export class EventProfiling {

	static readonly all = new Set<EventProfiling>();

	private static _idPool = 0;

	readonly name: string;
	public listenerCount: number = 0;
	public invocationCount = 0;
	public elapsedOverall = 0;
	public durations: number[] = [];

	private _stopWatch?: StopWatch;

	constructor(name: string) {
		this.name = `${name}_${EventProfiling._idPool++}`;
		EventProfiling.all.add(this);
	}

	start(listenerCount: number): void {
		this._stopWatch = new StopWatch();
		this.listenerCount = listenerCount;
	}

	stop(): void {
		if (this._stopWatch) {
			const elapsed = this._stopWatch.elapsed();
			this.durations.push(elapsed);
			this.elapsedOverall += elapsed;
			this.invocationCount += 1;
			this._stopWatch = undefined;
		}
	}
}

let _globalLeakWarningThreshold = -1;
export function setGlobalLeakWarningThreshold(n: number): IDisposable {
	const oldValue = _globalLeakWarningThreshold;
	_globalLeakWarningThreshold = n;
	return {
		dispose() {
			_globalLeakWarningThreshold = oldValue;
		}
	};
}


class LeakageMonitor {

	private _stacks: Map<string, number> | undefined;
	private _warnCountdown: number = 0;

	constructor(
		readonly threshold: number,
		readonly name: string = Math.random().toString(18).slice(2, 5),
	) { }

	dispose(): void {
		this._stacks?.clear();
	}

	check(stack: Stacktrace, listenerCount: number): undefined | (() => void) {

		const threshold = this.threshold;
		if (threshold <= 0 || listenerCount < threshold) {
			return undefined;
		}

		if (!this._stacks) {
			this._stacks = new Map();
		}
		const count = (this._stacks.get(stack.value) || 0);
		this._stacks.set(stack.value, count + 1);
		this._warnCountdown -= 1;

		if (this._warnCountdown <= 0) {
			// only warn on first exceed and then every time the limit
			// is exceeded by 50% again
			this._warnCountdown = threshold * 0.5;

			// find most frequent listener and print warning
			let topStack: string | undefined;
			let topCount: number = 0;
			for (const [stack, count] of this._stacks) {
				if (!topStack || topCount < count) {
					topStack = stack;
					topCount = count;
				}
			}

			console.warn(`[${this.name}] potential listener LEAK detected, having ${listenerCount} listeners already. MOST frequent listener (${topCount}):`);
			console.warn(topStack!);
		}

		return () => {
			const count = (this._stacks!.get(stack.value) || 0);
			this._stacks!.set(stack.value, count - 1);
		};
	}
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

export interface EventDeliveryQueue {
	_isEventDeliveryQueue: true;
}

export interface EmitterOptions {
	/**
	 * Optional function that's called *before* the very first listener is added
	 */
	onWillAddFirstListener?: Function;
	/**
	 * Optional function that's called *after* the very first listener is added
	 */
	onDidAddFirstListener?: Function;
	/**
	 * Optional function that's called after a listener is added
	 */
	onDidAddListener?: Function;
	/**
	 * Optional function that's called *after* remove the very last listener
	 */
	onDidRemoveLastListener?: Function;
	/**
	 * Optional function that's called *before* a listener is removed
	 */
	onWillRemoveListener?: Function;
	/**
	 * Optional function that's called when a listener throws an error. Defaults to
	 * {@link onUnexpectedError}
	 */
	onListenerError?: (e: any) => void;
	/**
	 * Number of listeners that are allowed before assuming a leak. Default to
	 * a globally configured value
	 *
	 * @see setGlobalLeakWarningThreshold
	 */
	leakWarningThreshold?: number;
	/**
	 * Pass in a delivery queue, which is useful for ensuring
	 * in order event delivery across multiple emitters.
	 */
	deliveryQueue?: EventDeliveryQueue;

	/** ONLY enable this during development */
	_profName?: string;
}

export interface EventDeliveryQueue {
	_isEventDeliveryQueue: true;
}

export const createEventDeliveryQueue = (): EventDeliveryQueue => new EventDeliveryQueuePrivate();

class EventDeliveryQueuePrivate implements EventDeliveryQueue {
	declare _isEventDeliveryQueue: true;

	/**
	 * Index in current's listener list.
	 */
	public i = -1;

	/**
	 * The last index in the listener's list to deliver.
	 */
	public end = 0;

	/**
	 * Emitter currently being dispatched on. Emitter._listeners is always an array.
	 */
	public current?: Emitter<any>;
	/**
	 * Currently emitting value. Defined whenever `current` is.
	 */
	public value?: unknown;

	public enqueue<T>(emitter: Emitter<T>, value: T, end: number) {
		this.i = 0;
		this.end = end;
		this.current = emitter;
		this.value = value;
	}

	public reset() {
		this.i = this.end; // force any current emission loop to stop, mainly for during dispose
		this.current = undefined;
		this.value = undefined;
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

const compactionThreshold = 2;

const forEachListener = <T>(listeners: ListenerOrListeners<T>, fn: (c: ListenerContainer<T>) => void) => {
	if (listeners instanceof UniqueContainer) {
		fn(listeners);
	} else {
		for (let i = 0; i < listeners.length; i++) {
			const l = listeners[i];
			if (l) {
				fn(l);
			}
		}
	}
};

/**
 * The Emitter can be used to expose an Event to the public
 * to fire it from the insides.
 * Sample:
    class Document {

        private readonly _onDidChange = new Emitter<(value:string)=>any>();

        public onDidChange = this._onDidChange.event;

        // getter-style
        // get onDidChange(): Event<(value:string)=>any> {
        // 	return this._onDidChange.event;
        // }

        private _doIt() {
            //...
            this._onDidChange.fire(value);
        }
    }
 */
export class Emitter<T> {

    private readonly _options?: EmitterOptions;
    private readonly _leakageMon?: LeakageMonitor;
    private readonly _perfMon?: EventProfiling;
    private _disposed?: true;
    private _event?: Event<T>;

    /**
     * A listener, or list of listeners. A single listener is the most common
     * for event emitters (#185789), so we optimize that special case to avoid
     * wrapping it in an array (just like Node.js itself.)
     *
     * A list of listeners never 'downgrades' back to a plain function if
     * listeners are removed, for two reasons:
     *
     *  1. That's complicated (especially with the deliveryQueue)
     *  2. A listener with >1 listener is likely to have >1 listener again at
     *     some point, and swapping between arrays and functions may[citation needed]
     *     introduce unnecessary work and garbage.
     *
     * The array listeners can be 'sparse', to avoid reallocating the array
     * whenever any listener is added or removed. If more than `1 / compactionThreshold`
     * of the array is empty, only then is it resized.
     */
    protected _listeners?: ListenerOrListeners<T>;

    /**
     * Always to be defined if _listeners is an array. It's no longer a true
     * queue, but holds the dispatching 'state'. If `fire()` is called on an
     * emitter, any work left in the _deliveryQueue is finished first.
     */
    private _deliveryQueue?: EventDeliveryQueuePrivate;
    protected _size = 0;

    constructor(options?: EmitterOptions) {
        this._options = options;
        this._leakageMon = _globalLeakWarningThreshold > 0 || this._options?.leakWarningThreshold ? new LeakageMonitor(this._options?.leakWarningThreshold ?? _globalLeakWarningThreshold) : undefined;
        this._perfMon = this._options?._profName ? new EventProfiling(this._options._profName) : undefined;
        this._deliveryQueue = this._options?.deliveryQueue as EventDeliveryQueuePrivate | undefined;
    }

    dispose() {
        if (!this._disposed) {
            this._disposed = true;

            // It is bad to have listeners at the time of disposing an emitter, it is worst to have listeners keep the emitter
            // alive via the reference that's embedded in their disposables. Therefore we loop over all remaining listeners and
            // unset their subscriptions/disposables. Looping and blaming remaining listeners is done on next tick because the
            // the following programming pattern is very popular:
            //
            // const someModel = this._disposables.add(new ModelObject()); // (1) create and register model
            // this._disposables.add(someModel.onDidChange(() => { ... }); // (2) subscribe and register model-event listener
            // ...later...
            // this._disposables.dispose(); disposes (1) then (2): don't warn after (1) but after the "overall dispose" is done

            if (this._deliveryQueue?.current === this) {
                this._deliveryQueue.reset();
            }
            if (this._listeners) {
                if (_enableDisposeWithListenerWarning) {
                    const listeners = this._listeners;
                    queueMicrotask(() => {
                        forEachListener(listeners, l => l.stack?.print());
                    });
                }

                this._listeners = undefined;
                this._size = 0;
            }
            this._options?.onDidRemoveLastListener?.();
            this._leakageMon?.dispose();
        }
    }

    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */
    get event(): Event<T> {
        this._event ??= (callback: (e: T) => any, thisArgs?: any, disposables?: IDisposable[] | DisposableStore) => {
            if (this._leakageMon && this._size > this._leakageMon.threshold * 3) {
                console.warn(`[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far`);
                return Disposable.None;
            }

            if (this._disposed) {
                // todo: should we warn if a listener is added to a disposed emitter? This happens often
                return Disposable.None;
            }

            if (thisArgs) {
                callback = callback.bind(thisArgs);
            }

            const contained = new UniqueContainer(callback);

            let removeMonitor: Function | undefined;
            let stack: Stacktrace | undefined;
            if (this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2)) {
                // check and record this emitter for potential leakage
                contained.stack = Stacktrace.create();
                removeMonitor = this._leakageMon.check(contained.stack, this._size + 1);
            }

            if (_enableDisposeWithListenerWarning) {
                contained.stack = stack ?? Stacktrace.create();
            }

            if (!this._listeners) {
                this._options?.onWillAddFirstListener?.(this);
                this._listeners = contained;
                this._options?.onDidAddFirstListener?.(this);
            } else if (this._listeners instanceof UniqueContainer) {
                this._deliveryQueue ??= new EventDeliveryQueuePrivate();
                this._listeners = [this._listeners, contained];
            } else {
                this._listeners.push(contained);
            }

            this._size++;

            const result = toDisposable(() => { removeMonitor?.(); this._removeListener(contained); });
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
        this._options?.onWillRemoveListener?.(this);

        if (!this._listeners) {
            return; // expected if a listener gets disposed
        }

        if (this._size === 1) {
            this._listeners = undefined;
            this._options?.onDidRemoveLastListener?.(this);
            this._size = 0;
            return;
        }

        // size > 1 which requires that listeners be a list:
        const listeners = this._listeners as (ListenerContainer<T> | undefined)[];

        const index = listeners.indexOf(listener);
        if (index === -1) {
            console.log('disposed?', this._disposed);
            console.log('size?', this._size);
            console.log('arr?', JSON.stringify(this._listeners));
            throw new Error('Attempted to dispose unknown listener');
        }

        this._size--;
        listeners[index] = undefined;

        const adjustDeliveryQueue = this._deliveryQueue!.current === this;
        if (this._size * compactionThreshold <= listeners.length) {
            let n = 0;
            for (let i = 0; i < listeners.length; i++) {
                if (listeners[i]) {
                    listeners[n++] = listeners[i];
                } else if (adjustDeliveryQueue) {
                    this._deliveryQueue!.end--;
                    if (n < this._deliveryQueue!.i) {
                        this._deliveryQueue!.i--;
                    }
                }
            }
            listeners.length = n;
        }
    }

    private _deliver(listener: undefined | UniqueContainer<(value: T) => void>, value: T) {
        if (!listener) {
            return;
        }

        const errorHandler = this._options?.onListenerError || onUnexpectedError;
        if (!errorHandler) {
            listener.value(value);
            return;
        }

        try {
            listener.value(value);
        } catch (e) {
            errorHandler(e);
        }
    }

    /** Delivers items in the queue. Assumes the queue is ready to go. */
    private _deliverQueue(dq: EventDeliveryQueuePrivate) {
        const listeners = dq.current!._listeners! as (ListenerContainer<T> | undefined)[];
        while (dq.i < dq.end) {
            // important: dq.i is incremented before calling deliver() because it might reenter deliverQueue()
            this._deliver(listeners[dq.i++], dq.value as T);
        }
        dq.reset();
    }

    /**
     * To be kept private to fire an event to
     * subscribers
     */
    fire(event: T): void {
        if (this._deliveryQueue?.current) {
            this._deliverQueue(this._deliveryQueue);
            this._perfMon?.stop(); // last fire() will have starting perfmon, stop it before starting the next dispatch
        }

        this._perfMon?.start(this._size);

        if (!this._listeners) {
            // no-op
        } else if (this._listeners instanceof UniqueContainer) {
            this._deliver(this._listeners, event);
        } else {
            const dq = this._deliveryQueue!;
            dq.enqueue(this, event, this._listeners.length);
            this._deliverQueue(dq);
        }

        this._perfMon?.stop();
    }

    hasListeners(): boolean {
        return this._size > 0;
    }
}

/**
 * An event emitter that multiplexes many events into a single event.
 *
 * @example Listen to the `onData` event of all `Thing`s, dynamically adding and removing `Thing`s
 * to the multiplexer as needed.
 *
 * ```typescript
 * const anythingDataMultiplexer = new EventMultiplexer<{ data: string }>();
 *
 * const thingListeners = DisposableMap<Thing, IDisposable>();
 *
 * thingService.onDidAddThing(thing => {
 *   thingListeners.set(thing, anythingDataMultiplexer.add(thing.onData);
 * });
 * thingService.onDidRemoveThing(thing => {
 *   thingListeners.deleteAndDispose(thing);
 * });
 *
 * anythingDataMultiplexer.event(e => {
 *   console.log('Something fired data ' + e.data)
 * });
 * ```
 */
export class EventMultiplexer<T> implements IDisposable {

    private readonly emitter: Emitter<T>;
    private hasListeners = false;
    private events: { event: Event<T>; listener: IDisposable | null }[] = [];

    constructor() {
        this.emitter = new Emitter<T>({
            onWillAddFirstListener: () => this.onFirstListenerAdd(),
            onDidRemoveLastListener: () => this.onLastListenerRemove()
        });
    }

    get event(): Event<T> {
        return this.emitter.event;
    }

    add(event: Event<T>): IDisposable {
        const e = { event: event, listener: null };
        this.events.push(e);

        if (this.hasListeners) {
            this.hook(e);
        }

        const dispose = () => {
            if (this.hasListeners) {
                this.unhook(e);
            }

            const idx = this.events.indexOf(e);
            this.events.splice(idx, 1);
        };

        return toDisposable(onceFun(dispose));
    }

    private onFirstListenerAdd(): void {
        this.hasListeners = true;
        this.events.forEach(e => this.hook(e));
    }

    private onLastListenerRemove(): void {
        this.hasListeners = false;
        this.events.forEach(e => this.unhook(e));
    }

    private hook(e: { event: Event<T>; listener: IDisposable | null }): void {
        e.listener = e.event(r => this.emitter.fire(r));
    }

    private unhook(e: { event: Event<T>; listener: IDisposable | null }): void {
        if (e.listener) {
            e.listener.dispose();
        }
        e.listener = null;
    }

    dispose(): void {
        this.emitter.dispose();
    }
}

/**
 * A Relay is an event forwarder which functions as a replugabble event pipe.
 * Once created, you can connect an input event to it and it will simply forward
 * events from that input event through its own `event` property. The `input`
 * can be changed at any point in time.
 */
export class Relay<T> implements IDisposable {

	private listening = false;
	private inputEvent: Event<T> = Event.None;
	private inputEventListener: IDisposable = Disposable.None;

	private readonly emitter = new Emitter<T>({
		onDidAddFirstListener: () => {
			this.listening = true;
			this.inputEventListener = this.inputEvent(this.emitter.fire, this.emitter);
		},
		onDidRemoveLastListener: () => {
			this.listening = false;
			this.inputEventListener.dispose();
		}
	});

	readonly event: Event<T> = this.emitter.event;

	set input(event: Event<T>) {
		this.inputEvent = event;

		if (this.listening) {
			this.inputEventListener.dispose();
			this.inputEventListener = event(this.emitter.fire, this.emitter);
		}
	}

	dispose() {
		this.inputEventListener.dispose();
		this.emitter.dispose();
	}
}
