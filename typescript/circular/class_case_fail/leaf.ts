import { AbstractNode } from './abstract_node';

export class Leaf extends AbstractNode {
    name = 'Leaf';

    foo() {
        console.log(this.name, 'foo');
    }
}
