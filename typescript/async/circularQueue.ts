export class CircularQueue<T> {
  private Items: T[];
  private Capacity: number;
  private Front: number;
  private Rear: number;
  private Count: number;

  public constructor(capacity: number) {
      this.Capacity = capacity;
      this.Items = new Array(capacity);
      this.Front = 0;
      this.Rear = -1;
      this.Count = 0;
  }

  private ExtendCapacity(): void {
      const newCapacity = this.Capacity * 2;
      const newItems = new Array(newCapacity);
      for (let i = 0; i < this.Count; i++) {
          newItems[i] = this.Items[(this.Front + i) % this.Capacity];
      }
      this.Items = newItems;
      this.Front = 0;
      this.Rear = this.Count - 1;
      this.Capacity = newCapacity;
  }

  public EnQueue(item: T): void {
      if (this.IsFull()) {
          this.ExtendCapacity();
      }
      this.Rear = (this.Rear + 1) % this.Capacity;
      this.Items[this.Rear] = item;
      this.Count++;
  }

  public DeQueue(): T | undefined {
      if (this.IsEmpty()) {
          return undefined;
      }
      const item = this.Items[this.Front];
      this.Front = (this.Front + 1) % this.Capacity;
      this.Count--;
      return item;
  }

  public Peek(): T | undefined {
      if (this.IsEmpty()) {
          return undefined;
      }
      return this.Items[this.Front];
  }

  public IsEmpty(): boolean {
      return this.Count === 0;
  }

  public IsFull(): boolean {
      return this.Count === this.Capacity;
  }

  public Size(): number {
      return this.Count;
  }
}
