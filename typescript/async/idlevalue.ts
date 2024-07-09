import { getIdleCallbackService } from "./idlecallbak";
import { IDisposable } from "./lifeCycle";
import { ResolvablePromise } from "./promise";

export type TAsyncExecutor<T> = (step: () => Promise<void>) => Promise<T>;

export class AsyncIdleValue<T> implements IDisposable {
  private StepHandle?: number;

  private MyValue?: T;
  private Error?: Error;
  private MyIsInstant = false;
  private LastTickTime = Date.now();
  private MyTickCount = 0;
  private StepRp?: ResolvablePromise<void>;
  private ExcutePromise: Promise<T>;

  public constructor(private readonly Executor: TAsyncExecutor<T>) {
    this.ExcutePromise = this.Excute();
    this.ExcutePromise.then((value) => {
      this.MyValue = value;
    }).catch((err) => {
      this.Error = err;
    });
  }

  public get Value(): Promise<T> {
    if (this.Error !== undefined) {
      throw this.Error;
    }

    return this.ExcutePromise;
  }

  public get TickCount(): number {
    return this.MyTickCount;
  }

  public get IsInitialized(): boolean {
    return this.MyValue !== undefined || this.Error !== undefined;
  }

  public get IsInstant(): boolean {
    return this.MyIsInstant;
  }

  public set IsInstant(value: boolean) {
    this.MyIsInstant = value;
    this.StepRp?.Resolve();
  }

  private async Excute(): Promise<T> {
    const step = async () => {
      if (this.MyIsInstant) {
        return;
      }

      const now = Date.now();
      if (now - this.LastTickTime < 10) {
        return;
      }

      this.MyTickCount++;
      this.LastTickTime = now;
      this.StepRp = new ResolvablePromise<void>();
      this.StepHandle = getIdleCallbackService().Call(() => {
        this.StepRp!.Resolve();
        this.StepHandle = undefined;
      });

      return this.StepRp.Promise;
    };

    return this.Executor(step);
  }

  public Dispose(): void {
    if (this.StepHandle !== undefined) {
      getIdleCallbackService().Cancel(this.StepHandle);
    }
  }
}
