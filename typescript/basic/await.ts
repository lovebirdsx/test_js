function run(generatorFunction: () => Generator) {
  const iterator = generatorFunction(); // 初始化Generator

  // `next`函数用于推进Generator到下一个yield表达式
  function next(iteratorResult: IteratorResult<any, any> = { value: undefined, done: false }): any {
    // 如果Generator函数运行完毕，则返回完成的Promise
    if (iteratorResult.done) return Promise.resolve(iteratorResult.value);

    const { value } = iteratorResult; // 这里的value是一个Promise

    // 使用Promise.resolve确保value是一个Promise对象
    return Promise.resolve(value).then(result => 
      // 递归调用next，并将解决的结果传给下一个yield
      next(iterator.next(result))
    ).catch(err => 
      // 如果Promise被拒绝，则将错误传递给Generator
      Promise.reject(iterator.throw(err))
    );
  }

  // 开始执行Generator函数
  return next();
}

// 模拟async/await的使用
function* generatorFunction(): any {
  // 模拟await操作
  console.log('start'); // 42，模拟异步操作的结果
  const result = yield new Promise<number>(resolve => setTimeout(() => resolve(42), 1000));
  console.log('result', result); // 42，模拟异步操作的结果
}

run(generatorFunction);
