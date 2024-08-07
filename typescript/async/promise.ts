export interface IPromiseWithStatus<T> {
  readonly Promise: Promise<T>;
  readonly IsFinished: boolean;
}

export class ResolvablePromise<T> implements IPromiseWithStatus<T> {
  private MyResolve!: (value: T) => void;
  private MyReject!: (reason: Error) => void;
  private readonly MyPromise: Promise<T>;
  private IsResolved = false;

  public constructor() {
    this.MyPromise = new Promise((resolve, reject) => {
      this.MyResolve = resolve;
      this.MyReject = reject;
    });
  }

  public get Promise(): Promise<T> {
    return this.MyPromise;
  }

  public get IsFinished(): boolean {
    return this.IsResolved;
  }

  public Resolve(value: T): void {
    if (this.IsResolved) {
      throw new Error('Already resolved');
    }

    this.IsResolved = true;
    this.MyResolve(value);
  }

  public Reject(err: Error): void {
    if (this.IsResolved) {
      throw new Error('Already resolved');
    }

    this.IsResolved = true;
    this.MyReject(err);
  }
}