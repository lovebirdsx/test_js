import { it } from '@jest/globals';

function sum(a: number, b: number) {
    return a + b;
}

it('sum numbers', () => {
    expect(sum(1, 2)).toBe(3);
});
