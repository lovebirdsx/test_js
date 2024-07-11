import { getIdleCallbackService } from "./idlecallbak";
import { IDisposable } from "./lifeCycle";
import { IPromiseWithStatus, ResolvablePromise } from "./promise";

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

export class GeneratorIdleValue<T> implements IDisposable {
  private MyValue?: T;
  private Error?: Error;
  private Handle?: number;
  private MyIsInitialized = false;
  private MyStepCount = 0;
  private readonly ReadyRp = new ResolvablePromise<void>();
  private readonly Generator = this.GeneratorFun();

  public constructor(private readonly GeneratorFun: () => Generator<undefined, T>) {
    this.Handle = getIdleCallbackService().Call(
      () => {
        this.Next(true);
      }
    )
  }

  private Next(isContinue: boolean): void {
    try {
      const result = this.Generator.next();
      this.MyStepCount++;
      if (result.done) {
        this.MyValue = result.value;
        this.MyIsInitialized = true;
        this.ReadyRp.Resolve();
      }
    } catch (err) {
      this.MyIsInitialized = true;
      this.Error = err as Error;
      this.ReadyRp.Reject(err as Error);
    }

    if (this.MyIsInitialized) {
      getIdleCallbackService().Cancel(this.Handle!);
      this.Handle = undefined;
    } else {
      if (isContinue) {
        this.Handle = getIdleCallbackService().Call(() => {
          this.Next(isContinue);
        });
      }
    }
  }

  public get StepCount(): number {
    return this.MyStepCount;
  }

  public get IsInitialized(): boolean {
    return this.MyIsInitialized;
  }

  public get Value(): T {
    if (this.Handle !== undefined) {
      getIdleCallbackService().Cancel(this.Handle);
      this.Handle = undefined;
    }

    while (!this.MyIsInitialized) {
      this.Next(false);
    }

    if (this.Error !== undefined) {
      throw this.Error;
    }

    return this.MyValue!;
  }

  public get Ready(): IPromiseWithStatus<void> {
    return this.ReadyRp;
  }

  public Dispose(): void {
    if (this.Handle !== undefined) {
      getIdleCallbackService().Cancel(this.Handle);
      this.Handle = undefined;
    }
  }
}
