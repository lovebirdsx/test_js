import { expect } from 'chai';
import { LinkedList } from '../linkedList';

describe('LinkedList', () => {
    let list: LinkedList<number>;

    beforeEach(() => {
        list = new LinkedList<number>();
    });

    it('should initialize with size 0', () => {
        expect(list.size).to.equal(0);
    });

    it('should be empty when initialized', () => {
        expect(list.isEmpty()).to.equal(true);
    });

    it('should add elements to the front of the list', () => {
        list.unshift(1);
        list.unshift(2);
        list.unshift(3);

        expect(list.size).to.equal(3);
        expect([...list]).to.deep.equal([3, 2, 1]);
    });

    it('should add elements to the end of the list', () => {
        list.push(1);
        list.push(2);
        list.push(3);

        expect(list.size).to.equal(3);
        expect([...list]).to.deep.equal([1, 2, 3]);
    });

    it('should remove elements from the front of the list', () => {
        list.push(1);
        list.push(2);
        list.push(3);

        expect(list.shift()).to.equal(1);
        expect(list.shift()).to.equal(2);
        expect(list.shift()).to.equal(3);
        expect(list.shift()).to.equal(undefined);
        expect(list.size).to.equal(0);
        expect([...list]).to.deep.equal([]);
    });

    it('should remove elements from the end of the list', () => {
        list.push(1);
        list.push(2);
        list.push(3);

        expect(list.pop()).to.equal(3);
        expect(list.pop()).to.equal(2);
        expect(list.pop()).to.equal(1);
        expect(list.pop()).to.equal(undefined);
        expect(list.size).to.equal(0);
        expect([...list]).to.deep.equal([]);
    });

    it('should clear the list', () => {
        list.push(1);
        list.push(2);
        list.push(3);

        expect(list.size).to.equal(3);
        expect([...list]).to.deep.equal([1, 2, 3]);

        list.clear();

        expect(list.size).to.equal(0);
        expect([...list]).to.deep.equal([]);
    });
});
