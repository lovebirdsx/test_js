import { expect } from 'chai';
import { sum } from '../src/utils';

describe('sum function', () => {
  it('should return the sum of two numbers', () => {
    expect(sum(2, 3)).to.equal(5);
    expect(sum(-2, 3)).to.equal(1);
    expect(sum(0, 0)).to.equal(0);
  });
});
