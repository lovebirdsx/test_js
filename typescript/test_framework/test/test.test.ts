import { describe, it, expect } from '../src/test/test';

describe('test framework', () => {
    it('catch throw error', () => {
        const errorFunc = () => {
            throw new Error('error');
        };
        expect(errorFunc).toThrowError();
    });

    it('toBe', () => {
        expect(1).toBe(1);
    });

    it('toEqual', () => {
        expect({ foo: 'bar' }).toEqual({ foo: 'bar' });
    });

    it('toBeTruthy', () => {
        expect(1).toBeTruthy();
    });

    it('toBeUndefined', () => {
        expect(undefined).toBeUndefined();
    });

    it('toThrowError', () => {
        expect(() => { throw new Error(); }).toThrowError();
    });

    it('timeout', async () => {
        expect(1).toBe(1);
    }, 1000);
});
