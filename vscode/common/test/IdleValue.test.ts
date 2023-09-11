import { expect } from 'chai';
import { IdleValue, wait } from '../async';

describe('IdleValue', () => {
    it('should execute the executor function lazily', () => {
        let didRun = false;
        const idleValue = new IdleValue(() => {
            didRun = true;
            return 42;
        });

        expect(didRun).to.equal(false);
        expect(idleValue.isInitialized).to.equal(false);
        expect(idleValue.value).to.equal(42);
        expect(didRun).to.equal(true);
    });

    it('should dispose the handle when the value is initialized', () => {
        const idleValue = new IdleValue(() => 42);

        expect(idleValue.isInitialized).to.equal(false);
        expect(idleValue.value).to.equal(42);
        expect(idleValue.isInitialized).to.equal(true);
    });

    it('should throw an error if the executor function throws an error', () => {
        const error = new Error('executor error');
        const idleValue = new IdleValue(() => {
            throw error;
        });

        expect(() => idleValue.value).to.throw(error);
    });

    it('should return the same value on subsequent calls', () => {
        let count = 0;
        const idleValue = new IdleValue(() => {
            count++;
            return count;
        });

        expect(idleValue.value).to.equal(1);
        expect(idleValue.value).to.equal(1);
        expect(idleValue.value).to.equal(1);
        expect(idleValue.isInitialized).to.equal(true);
    });

    it('should execute while idle', async () => {
        // 在空闲的时候会自动执行
        let didRun = false;
        const idleValue = new IdleValue(() => {
            didRun = true;
            return 42;
        });

        expect(didRun).to.equal(false);
        expect(idleValue.isInitialized).to.equal(false);
        await wait(0);
        expect(didRun).to.equal(true);
        expect(idleValue.isInitialized).to.equal(true);
    });
});
