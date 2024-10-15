// 测试迭代器

class CustomCollection<T> {
  private collection: T[] = [];

  add(item: T) {
    this.collection.push(item);
  }

  get(index: number) {
    return this.collection[index];
  }

  get length() {
    return this.collection.length;
  }

  [Symbol.iterator]() {
    let index = 0;
    const { length } = this.collection;
    return {
      next: () => {
        if (index < length) {
          return {
            value: this.collection[index++],
            done: false,
          };
        }
          return {
            value: undefined,
            done: true,
          };
      },
    };
  }
}

describe('Iterator', () => {
  it('simple', () => {
    const collection = new CustomCollection<number>();
    collection.add(1);
    collection.add(2);
    const result = [];
    for (const item of collection) {
      result.push(item);
    }

    expect(result).toEqual([1, 2]);
  });
});
