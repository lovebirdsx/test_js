import { Emitter } from '../event';

describe('Event', () => {
    it('should fire event - empty', () => {
        const emitter = new Emitter<string>();
        let callCount = 0;
        emitter.event(() => callCount++);
        emitter.fire('test');
        expect(callCount).toEqual(1);
        emitter.dispose();
    });

    it('should fire event - with data', () => {
        const emitter = new Emitter<string>();
        let data = '';
        emitter.event((e) => data = e);
        emitter.fire('test');
        expect(data).toEqual('test');
        emitter.dispose();
    });
});
