import { createContext, runInContext } from 'vm';

// 定义沙盒环境中的接口
const sandboxAPI = {
  moveTo: async (entity: number, pos: { x: number; y: number; z: number }) => new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Moving entity ${entity} to position`, pos);
        resolve(true);
      }, 1000);
    }),
  wait: (time: number) => new Promise<void>((resolve) => { setTimeout(resolve, time); }),
  log: (fmt: string, ...args: unknown[]) => {
    console.log(fmt, ...args);
  },
  waitCondition: async (condition: () => boolean) => {
    while (!condition()) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => { setTimeout(resolve, 100); });
    }
    console.log('Condition satisfied');
  },
};

async function runSandboxCode(code: string) {
  const sandbox = createContext(sandboxAPI);

  try {
    // 使用runInContext执行沙盒代码
    await runInContext(code, sandbox);
    console.log('沙盒代码执行完成');
  } catch (error) {
    console.error('沙盒代码执行错误:', error);
  }
}

// 沙盒中要执行的代码
const code = `
  let conditionOk = false;
  async function simCondition() {
    await wait(2000);
    conditionOk = true;
  }

  async function test() {
    await moveTo(1, {x: 10, y: 20, z: 30});
    await wait(1000);
    await moveTo(1, {x: 20, y: 30, z: 30});
    await wait(1000);
    log('Hello, %s!', 'world');
    simCondition();
    await waitCondition(() => conditionOk);
  }

  function test2() {
    for (let i = 0; i < 1000000000; i++) {
      if (i % 10000000 === 0) {
        log('test2', i);
      }
    }
  }

  test2();
`;

async function main() {
  // 异步执行沙盒代码
  runSandboxCode(code);

  // 执行游戏逻辑
  for (let i = 0; i < 5; i++) {
    console.log(`Game loop ${i}`);
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => { setTimeout(resolve, 1000); });
  }
}

main().catch(console.error);
