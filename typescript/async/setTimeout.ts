/**
 * 测试异步函数中的 setTimeout
 * 对于连续的 setTimeout，要等待所有的 setTimeout 执行完毕后才会执行下一个异步函数
 */
async function testLongTimeRunning() {
  async function wait(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  function busyWait(time: number): void {
    const start = Date.now();
    while (Date.now() - start < time) {}
  }

  const RUN_COUNT = 3;
  for (let i = 0; i < RUN_COUNT; i++) {
    setTimeout(() => {
      const id = i;
      console.log(`[${id}] busyWait start`);
      busyWait(100);
      console.log(`[${id}] busyWait end`);
    }, 0);
  }

  for (let i = 0; i < RUN_COUNT; i++) {
    console.log(`[${i}] wait start`);
    await wait(0);
    console.log(`[${i}] wait end`);
  }
}

testLongTimeRunning();
