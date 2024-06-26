describe('Console', () => {
  it('table', () => {
    console.table([
      { Id: 1, 名字: '张三' },
      { Id: 2, 名字: '李四' },
      { Id: 3, 名字: '王五' },
    ]);
  });

  it('time', () => {
    console.time('timer');
    console.timeEnd('timer');
  });

  it('count', () => {
    console.count('counter');
    console.count('counter');
    console.count('counter');
  });

  it('group', () => {
    console.group('group');
    console.log('Hello, world!');
    console.groupEnd();
  });

  it('assert', () => {
    console.assert(true, 'Hello, world!');
    console.assert(false, 'Hello, world!');
  });

  it('clear', () => {
    console.log('Hello, world!');
    console.clear();
  });
});
