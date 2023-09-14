import { expect } from 'chai';

interface Event<T> {
    (listener: (e: T) => void): void;
}

class Emitter<T> {
    private listeners: ((e: T) => void)[] = [];
    private _event?: Event<T>;

    get event(): Event<T> {
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
describe('Event1', () => {
    it('should fire event', () => {
        const emitter = new Emitter<string>();
        let callCount = 0;
        emitter.event(() => callCount++);
        emitter.fire('test');
        expect(callCount).to.equal(1);
    });

    it('should fire event with data', () => {
        const emitter = new Emitter<string>();
        let data = '';
        emitter.event((e) => data = e);
        emitter.fire('test');
        expect(data).to.equal('test');
    });
});
