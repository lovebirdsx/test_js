import { expect } from 'chai';

interface Event<T> {
    (listener: (e: T) => any): void;
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
describe('Event2', () => {
    it('should fire event', () => {
        const emitter = new Emitter<string>();
        let callCount = 0;
        const listener = () => callCount++;
        emitter.event(listener);
        emitter.fire('test');
        expect(callCount).to.equal(1);
        emitter.removeListener(listener);
        emitter.fire('test');
        expect(callCount).to.equal(1);
    });
});
