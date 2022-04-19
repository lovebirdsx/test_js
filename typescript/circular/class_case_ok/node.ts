import { AbstractNode } from './internal';

export class Node extends AbstractNode {
    name = 'Node';

    foo(): void {
        console.log(this.name, 'foo');
    }
}
