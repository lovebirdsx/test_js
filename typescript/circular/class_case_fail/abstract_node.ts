import { Leaf } from './leaf';
import { Node } from './node';

type TNode = 'leaf' | 'node'

export class AbstractNode {
    name = 'AbstractNode';

    foo() {
        console.log(this.name, 'foo');
    }

    static spawn(type: TNode) {
        if (type === 'leaf') {
            return new Leaf();
        }

        return new Node();
    }
}
