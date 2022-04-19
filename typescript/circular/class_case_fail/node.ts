import { AbstractNode } from './abstract_node';

export class Node extends AbstractNode {
    name = 'Node';

    foo(): void {
        console.log(this.name, 'foo');
    }
}
