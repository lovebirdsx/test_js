export class Node<E> {
    static readonly Undefined = new Node<any>(undefined);

    constructor(
        public element: E,
        public next: Node<E> = Node.Undefined,
        public prev: Node<E> = Node.Undefined,
    ) {}
}

export class LinkedList<E> {
    private _first: Node<E> = Node.Undefined;
    private _last: Node<E> = Node.Undefined;
    private _size: number = 0;

    get size(): number {
        return this._size;
    }

    isEmpty(): boolean {
        return this._first === Node.Undefined;
    }

    clear(): void {
        let node = this._first;
        while (node !== Node.Undefined) {
            const { next } = node;
            node.next = Node.Undefined;
            node.prev = Node.Undefined;
            node = next;
        }

        this._first = Node.Undefined;
        this._last = Node.Undefined;
        this._size = 0;
    }

    unshift(element: E): () => void {
        return this._insert(element, false);
    }

    push(element: E): () => void {
        return this._insert(element, true);
    }

    shift(): E | undefined {
        if (this._first === Node.Undefined) {
            return undefined;
        }

        const res = this._first.element;
        this._remove(this._first);
        return res;
    }

    pop(): E | undefined {
        if (this._last === Node.Undefined) {
            return undefined;
        }
        const res = this._last.element;
        this._remove(this._last);
        return res;
    }

    private _insert(element: E, atTheEnd: boolean): () => void {
        const newNode = new Node(element);

        if (this._first === Node.Undefined) {
            this._first = newNode;
            this._last = newNode;
        } else if (atTheEnd) {
            // push
            const oldLast = this._last!;
            this._last = newNode;
            newNode.prev = oldLast;
            oldLast.next = newNode;
        } else {
            // unshift
            const oldFirst = this._first;
            this._first = newNode;
            newNode.next = oldFirst;
            oldFirst.prev = newNode;
        }

        this._size += 1;
        let didRemove = false;
        return () => {
            if (!didRemove) {
                didRemove = true;
                this._remove(newNode);
            }
        };
    }

    private _remove(node: Node<E>): void {
        if (node.prev !== Node.Undefined && node.next !== Node.Undefined) {
            // middle
            const anchor = node.prev;
            anchor.next = node.next;
            node.next.prev = anchor;
        } else if (node.prev === Node.Undefined && node.next === Node.Undefined) {
            // only node
            this._first = Node.Undefined;
            this._last = Node.Undefined;
        } else if (node.next === Node.Undefined) {
            // last
            this._last = this._last!.prev!;
            this._last.next = Node.Undefined;
        } else if (node.prev === Node.Undefined) {
            // first
            this._first = this._first!.next!;
            this._first.prev = Node.Undefined;
        }

        // done
        this._size -= 1;
    }

    * [Symbol.iterator](): IterableIterator<E> {
        let node = this._first;
        while (node !== Node.Undefined) {
            yield node.element;
            node = node.next;
        }
    }
}
