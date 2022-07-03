export interface Listener<T> {
    (event: T): void;
}

export interface Disposable {
    dispose(): void;
}

export class TypedEvent<T> {
    private listeners: Listener<T>[] = [];
    private listenersOncer: Listener<T>[] = [];

    on = (listener: Listener<T>): Disposable => {
        this.listeners.push(listener);

        return {
            dispose: () => this.off(listener),
        };
    };

    once = (listener: Listener<T>): void => {
        this.listenersOncer.push(listener);
    };

    off = (listener: Listener<T>) => {
        const callbackIndex = this.listeners.indexOf(listener);
        if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
    };

    emit = (event: T) => {
        this.listeners.forEach((listener) => listener(event));

        this.listenersOncer.forEach((listener) => listener(event));

        this.listenersOncer = [];
    };

    pipe = (te: TypedEvent<T>): Disposable => this.on((e) => te.emit(e));
}

const eventFoo = new TypedEvent<{message: string}>();
const handle1 = eventFoo.on((ev) => {
    console.log(ev.message);
});
eventFoo.emit({ message: 'hello event1' });
handle1.dispose();
eventFoo.emit({ message: 'hello event2' });

const eventBar = new TypedEvent<{id: number, name: string}>();
const handle2 = eventBar.on((ev) => {
    console.log(ev.id, ev.name);
});
eventBar.emit({ id: 1, name: 'lovebird' });
eventBar.emit({ id: 2, name: 'lovebird' });
