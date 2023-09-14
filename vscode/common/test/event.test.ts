import { expect } from 'chai';
import { Emitter } from '../event';

describe('Event', () => {
    it('should fire event', () => {
        const emitter = new Emitter<string>();
        let callCount = 0;
        emitter.event(() => callCount++);
        emitter.fire('test');
        expect(callCount).to.equal(1);
        emitter.dispose();
    });

    it('should fire event with data', () => {
        const emitter = new Emitter<string>();
        let data = '';
        emitter.event((e) => data = e);
        emitter.fire('test');
        expect(data).to.equal('test');
        emitter.dispose();
    });
});
