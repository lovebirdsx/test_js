import { IdleCallbackService, setIdleCallbackService } from "./idlecallbak";
import { AsyncIdleValue, GeneratorIdleValue } from "./idlevalue";

async function delayMs(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waintUntil(condition: () => boolean, timeout: number = 1000) {
  const start = Date.now();
  while (!condition() && Date.now() - start < timeout) {
    await delayMs(0);
  }
}

describe('AsyncIdleValue', () => {
  let idleCallbackService: IdleCallbackService;
  beforeEach(() => {
    idleCallbackService = new IdleCallbackService();
    setIdleCallbackService(idleCallbackService);
  });

  afterEach(() => {
    idleCallbackService.Dispose();
  });

  it('get idle value', async () => {
    const idleValue = new AsyncIdleValue(async (step) => {
      const result: number[] = [];
      for (let i = 0; i < 4; i++) {
        await step();
        await delayMs(10);
        result.push(i);
      }
      return result;
    });

    const value = await idleValue.Value;
    expect(idleValue.IsInitialized).toBe(true);
    expect(value).toEqual([0, 1, 2, 3]);
  });

  it('get idle value - instant', async () => {
    const idleValue = new AsyncIdleValue(async (step) => {
      const result: number[] = [];
      for (let i = 0; i < 4; i++) {
        await step();
        await delayMs(10);
        result.push(i);
      }
      return result;
    });

    expect(idleValue.TickCount).toBe(0);
    idleValue.IsInstant = true;
    const value = await idleValue.Value;
    expect(value).toEqual([0, 1, 2, 3]);
    expect(idleValue.TickCount).toBe(0);
  });
});

describe('generator idle value', () => {
  let idleCallbackService: IdleCallbackService;
  beforeEach(() => {
    idleCallbackService = new IdleCallbackService();
    setIdleCallbackService(idleCallbackService);
  });

  afterEach(() => {
    idleCallbackService.Dispose();
  });

  it('normal', async () => {
    const value = new GeneratorIdleValue<number>(function* () {
      yield;
      yield;
      yield;
      return 4;
    });

    let isFinished = false;
    value.Ready.Promise.then(() => {
      isFinished = true;
    });

    expect(value.IsInitialized).toBe(false);
    expect(isFinished).toBe(false);

    expect(value.Value).toEqual(4);

    expect(value.IsInitialized).toBe(true);

    await value.Ready.Promise;
    expect(isFinished).toBe(true);
  });

  it('half idle, half instant', async () => {
    const value = new GeneratorIdleValue<number>(function* () {
      yield;
      yield;

      const now = Date.now();
      while (Date.now() - now < 100) {
        yield;
      }

      yield;
      return 4;
    });

    let isFinished = false;
    value.Ready.Promise.then(() => {
      isFinished = true;
    });

    expect(value.IsInitialized).toBe(false);
    expect(isFinished).toBe(false);
    await waintUntil(() => value.StepCount >= 2);
    expect(isFinished).toBe(false);
    expect(value.IsInitialized).toBe(false);

    expect(value.Value).toEqual(4);

    expect(value.IsInitialized).toBe(true);

    await value.Ready.Promise;
    expect(isFinished).toBe(true);
  });

  it('has error', async () => {
    const value = new GeneratorIdleValue<number>(function* () {
      yield;
      yield;
      throw new Error('error');
      return 1;
    });

    let isFinished = false;
    let hasError = false;
    value.Ready.Promise.then(() => {
      isFinished = true;
    }).catch(() => {});

    expect(value.IsInitialized).toBe(false);
    expect(isFinished).toBe(false);

    try {
      const result = value.Value;
    } catch (error) {
      expect((error as Error).message).toBe('error');
    }

    expect(value.IsInitialized).toBe(true);

    try {
      await value.Ready.Promise;
      hasError = false;
    } catch (error) {      
      expect((error as Error).message).toBe('error');
      hasError = true;
    }

    expect(isFinished).toBe(false);
    expect(hasError).toBe(true);
  });
})
