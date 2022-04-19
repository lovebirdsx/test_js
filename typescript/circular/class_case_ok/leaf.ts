import { AbstractNode } from './internal';

export class Leaf extends AbstractNode {
    name = 'Leaf';

    foo() {
        console.log(this.name, 'foo');
    }
}
