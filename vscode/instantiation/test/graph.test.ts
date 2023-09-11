import { expect } from 'chai';
import { Graph, Node } from '../graph';

describe('Graph', () => {
    let graph: Graph<number>;

    beforeEach(() => {
        graph = new Graph((data) => data.toString());
    });

    it('should insert nodes and edges', () => {
        const node1 = graph.lookupOrInsertNode(1);
        const node2 = graph.lookupOrInsertNode(2);
        const node3 = graph.lookupOrInsertNode(3);

        expect(node1).to.be.instanceOf(Node);
        expect(node2).to.be.instanceOf(Node);
        expect(node3).to.be.instanceOf(Node);

        graph.insertEdge(1, 2);
        graph.insertEdge(2, 3);

        expect(node1.outgoing.size).to.equal(1);
        expect(node1.outgoing.get('2')).to.equal(node2);
        expect(node2.incoming.size).to.equal(1);
        expect(node2.incoming.get('1')).to.equal(node1);
        expect(node2.outgoing.size).to.equal(1);
        expect(node2.outgoing.get('3')).to.equal(node3);
        expect(node3.incoming.size).to.equal(1);
        expect(node3.incoming.get('2')).to.equal(node2);
    });

    it('should remove nodes and edges', () => {
        graph.lookupOrInsertNode(1);
        graph.lookupOrInsertNode(2);
        graph.lookupOrInsertNode(3);
        graph.insertEdge(1, 2);
        graph.insertEdge(2, 3);

        graph.removeNode(2);

        expect(graph.lookup(2)).to.equal(undefined);
        expect(graph.lookup(1)?.outgoing.size).to.equal(0);
        expect(graph.lookup(3)?.incoming.size).to.equal(0);
    });

    it('should find roots', () => {
        graph.lookupOrInsertNode(1);
        graph.lookupOrInsertNode(2);
        graph.lookupOrInsertNode(3);
        graph.insertEdge(1, 2);
        graph.insertEdge(2, 3);

        const roots = graph.roots();

        expect(roots.length).to.equal(1);
        expect(roots[0].data).to.equal(1);
    });

    it('root', () => {
        graph.insertEdge(1, 2);
        let roots = graph.roots();
        expect(roots.length).to.equal(1);
        expect(roots[0].data).to.equal(1);

        graph.insertEdge(2, 1);
        roots = graph.roots();
        expect(roots.length).to.equal(0);
    });

    it('root complex', () => {
        graph.insertEdge(1, 2);
        graph.insertEdge(1, 3);
        graph.insertEdge(3, 4);

        const roots = graph.roots();
        expect(roots.length).to.equal(1);
    });

    it('should check if it is empty', () => {
        expect(graph.isEmpty()).to.equal(true);
        graph.lookupOrInsertNode(1);
        expect(graph.isEmpty()).to.equal(false);
    });

    it('should convert to string', () => {
        graph.lookupOrInsertNode(1);
        graph.lookupOrInsertNode(2);
        graph.lookupOrInsertNode(3);
        graph.insertEdge(1, 2);
        graph.insertEdge(2, 3);

        // log(graph.toString());
    });

    it('should find a cycle', () => {
        graph.lookupOrInsertNode(1);
        graph.lookupOrInsertNode(2);
        graph.lookupOrInsertNode(3);
        graph.insertEdge(1, 2);
        graph.insertEdge(2, 3);
        graph.insertEdge(3, 1);

        const cycle = graph.findCycleSlow();
        expect(cycle).to.be.deep.equal([1, 2, 3]);
    });

    it('should not find a cycle', () => {
        graph.lookupOrInsertNode(1);
        graph.lookupOrInsertNode(2);
        graph.lookupOrInsertNode(3);
        graph.insertEdge(1, 2);
        graph.insertEdge(2, 3);

        const cycle = graph.findCycleSlow();
        expect(cycle).to.equal(undefined);
    });
});
