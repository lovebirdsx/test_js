import { expect } from 'chai';

describe('Proxy', () => {
    it('observe prop modification', () => {
        let setCallCount = 0;

        const data = {};
        const handler = {
            set(target: Record<string, any>, prop: string, value: any) {
                setCallCount++;
                target[prop] = value;
                return true;
            },
        };
        const proxy = new Proxy(data, handler);
        proxy.foo = 'bar';
        expect(proxy.foo).to.equal('bar');
        expect(setCallCount).to.equal(1);
    });
});
