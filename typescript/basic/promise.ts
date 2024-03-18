/**
 * 简单实现一个 Promise
 */

type Resolve<T> = (value?: T | PromiseLike<T>) => void;
type Reject = (reason?: any) => void;
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void;
type OnFulfilled<T, TResult> = (value: T) => TResult | PromiseLike<TResult>;
type OnRejected<TResult> = (reason: any) => TResult | PromiseLike<TResult>;

enum PromiseState {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected"
}

class SimplePromise<T> {
  private state: PromiseState = PromiseState.PENDING;
  private value: T | PromiseLike<T> | undefined = undefined;
  private reason: any = null;
  private onFulfilledCallbacks: Function[] = [];
  private onRejectedCallbacks: Function[] = [];

  constructor(executor: Executor<T>) {
    const resolve: Resolve<T> = (value) => {
      if (this.state === PromiseState.PENDING) {
        this.state = PromiseState.FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject: Reject = (reason) => {
      if (this.state === PromiseState.PENDING) {
        this.state = PromiseState.REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: OnFulfilled<T, TResult1>,
    onRejected?: OnRejected<TResult2>
  ): SimplePromise<TResult1 | TResult2> {
    return new SimplePromise<TResult1 | TResult2>((resolve, reject) => {
      if (this.state === PromiseState.FULFILLED && onFulfilled) {
        try {
          const result = onFulfilled(this.value as T);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else if (this.state === PromiseState.REJECTED && onRejected) {
        try {
          const result = onRejected(this.reason);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else if (this.state === PromiseState.PENDING) {
        if (onFulfilled) {
          this.onFulfilledCallbacks.push(() => {
            try {
              const result = onFulfilled(this.value as T);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        }
        if (onRejected) {
          this.onRejectedCallbacks.push(() => {
            try {
              const result = onRejected(this.reason);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        }
      }
    });
  }

  catch<TResult = never>(onRejected?: OnRejected<TResult>): SimplePromise<T | TResult> {
    return this.then(undefined, onRejected);
  }
}

async function wait(time: number) {
  return new SimplePromise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function main() {  
  console.log("等待1");
  await wait(1000);
  console.log("等待2");
  await wait(1000);
  console.log("等待3");
  await wait(1000);
  console.log("等待结束");
}

main();
