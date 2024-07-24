import * as assert from 'assert';

interface Event1<T> {
    (listener: (e: T) => any): void;
}

class Emitter1<T> {
    private listeners: ((e: T) => void)[] = [];
    private _event?: Event1<T>;

    get event(): Event1<T> {
        this._event ??= (listener: (e: T) => void) => {
            this.listeners.push(listener);
        };
        return this._event;
    }

    fire(data: T): void {
        for (const listener of this.listeners) {
            listener(data);
        }
    }

    removeListener(listener: (e: T) => void): void {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }
}

/**
 * 手动移除监听者的方案，但是编写有心智负担
 */
suite('Event2', () => {
    test('should fire event', () => {
        const emitter = new Emitter1<string>();
        let callCount = 0;
        const listener = () => callCount++;
        emitter.event(listener);
        emitter.fire('test');
        assert.strictEqual(callCount, 1);
        emitter.removeListener(listener);
        emitter.fire('test');
        assert.strictEqual(callCount, 1);
    });
});
