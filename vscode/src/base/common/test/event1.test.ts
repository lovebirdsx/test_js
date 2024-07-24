import * as assert from 'assert';

interface Event1<T> {
    (listener: (e: T) => void): void;
}

class Emitter<T> {
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
}

/**
 * 上面的事件处理方案，缺乏移除监听者的功能
 * 会导致内存泄漏
 */
suite('Event1', () => {
    test('should fire event', () => {
        const emitter = new Emitter<string>();
        let callCount = 0;
        emitter.event(() => callCount++);
        emitter.fire('test');
        assert.strictEqual(callCount, 1);
    });

    test('should fire event with data', () => {
        const emitter = new Emitter<string>();
        let data = '';
        emitter.event((e) => data = e);
        emitter.fire('test');
        assert.strictEqual(data, 'test');
    });
});
