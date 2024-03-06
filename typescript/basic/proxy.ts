const commands = ['add', 'sub', 'mul', 'div'] as const;
type Command = typeof commands[number];

async function call(cmd: Command, a: number, b: number) {
  await new Promise<void>((resolve) => { setTimeout(() => resolve(), 1000); });
  switch (cmd) {
    case 'add':
      return a + b;
    case 'sub':
      return a - b;
    case 'mul':
      return a * b;
    case 'div':
      return a / b;
    default:
      throw new Error('Invalid command');
  }
}

function createProxy<T extends object>() {
  return new Proxy({} as T, {
    get(target, prop, receiver) {
      if (typeof prop === 'string') {
        return async (...args: any[]) => call(prop as Command, args[0], args[1]);
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      return Reflect.set(target, prop, value, receiver);
    },
  });
}

const proxy = createProxy<{ add:(a: number, b: number) => Promise<number> }>();
proxy.add(1, 2).then((result) => {
  console.log(result);
});
