import { describe, it, expect } from '../src/test/test';

describe('test framework', () => {
    it('catch throw error', () => {
        const errorFunc = () => {
            throw new Error('error');
        };
        expect(errorFunc).toThrowError();
    });

    it('error for toBe', () => {
        expect(1).toBe(1);
    });

    it('error for toEqual', () => {
        expect({ foo: 'bar' }).toEqual({ foo: 'bar' });
    });

    it('error for toBeTruthy', () => {
        expect(1).toBeTruthy();
    });

    it('error for toBeUndefined', () => {
        expect(undefined).toBeUndefined();
    });

    it('error for toThrowError', () => {
        expect(() => { throw new Error(); }).toThrowError();
    });

    it('error for timeout', async () => {
        expect(1).toBe(1);
    }, 1000);
});
