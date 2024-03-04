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
describe('Event1', () => {
    it('should fire event', () => {
        const emitter = new Emitter<string>();
        let callCount = 0;
        emitter.event(() => callCount++);
        emitter.fire('test');
        expect(callCount).toEqual(1);
    });

    it('should fire event with data', () => {
        const emitter = new Emitter<string>();
        let data = '';
        emitter.event((e) => data = e);
        emitter.fire('test');
        expect(data).toEqual('test');
    });
});
