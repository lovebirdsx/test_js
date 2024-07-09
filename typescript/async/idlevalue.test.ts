import { IdleCallbackService, setIdleCallbackService } from "./idlecallbak";
import { AsyncIdleValue } from "./idlevalue";

async function delayMs(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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
