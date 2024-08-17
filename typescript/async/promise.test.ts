import { ResolvablePromise } from "./promise";

async function delayMs(time: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

class CallRecorder {
  private callCount = 0;
  call() {
    this.callCount++;
  }

  getCallCount() {
    return this.callCount;
  }

  isCalled() {
    return this.callCount > 0;
  }
}

describe('Promise', () => {
  xit('execute order - 1', (done) => {
    console.log(1);
    setTimeout(() => {
      console.log(2);
      done();
    }, 0);
    Promise.resolve().then(() => {
      console.log(5);
    });
    new Promise<void>((resolve) => {
      console.log(3);
      resolve();
    }).then(() => {
      console.log(4);
    });
  });

  xit('execute order - 2', (done) => {
    console.log(1);

    setTimeout(() => {
      console.log(2);
      Promise.resolve().then(() => {
        console.log(3);
      });
    });

    new Promise((resolve, reject) => {
      console.log(4)
      resolve(5)
    }).then((data) => {
      console.log(data);
    })

    setTimeout(() => {
      console.log(6);
      done();
    })

    console.log(7);
  });

  xit('execute order - 3', async () => {
    setTimeout(() => {
      console.log(`[${Date.now()}] idleValue executor`);
    }, 0);
    console.log(`[${Date.now()}] before delay`);
    await delayMs(0);
    console.log(`[${Date.now()}] after delay`);
    await delayMs(0);
    console.log(`[${Date.now()}] after delay`);
  });

  it('then many times', async () => {
    let fireFun: (() => void) | undefined;
    const promise = new Promise<void>((resolve) => {
      fireFun = resolve;
    });

    const record1 = new CallRecorder();
    promise.then(() => {
      record1.call();
    });

    const record2 = new CallRecorder();
    promise.then(() => {
      record2.call();
    });

    fireFun?.();

    const record3 = new CallRecorder();
    promise.then(() => {
      record3.call();
    });

    expect(record1.getCallCount()).toBe(0);
    expect(record2.getCallCount()).toBe(0);
    expect(record3.getCallCount()).toBe(0);

    await promise;

    expect(record1.getCallCount()).toBe(1);
    expect(record2.getCallCount()).toBe(1);
    expect(record3.getCallCount()).toBe(1);
  });
});

describe('FireablePromise', () => {
  it('fire', async () => {
    const fireablePromise = new ResolvablePromise<void>();
    const record = new CallRecorder();
    fireablePromise.Promise.then(() => {
      record.call();
    });

    fireablePromise.Resolve();
    expect(record.isCalled()).toBe(false);
    await fireablePromise.Promise;
    expect(record.isCalled()).toBe(true);
  });

  it('fire with value', async () => {
    const fireablePromise = new ResolvablePromise<number>();
    const record = new CallRecorder();
    fireablePromise.Promise.then((value) => {
      record.call();
      expect(value).toBe(123);
    });

    fireablePromise.Resolve(123);
    expect(record.isCalled()).toBe(false);
    await fireablePromise.Promise;
    expect(record.isCalled()).toBe(true);
  });

  it('reject', async () => {
    const fireablePromise = new ResolvablePromise<void>();
    const record = new CallRecorder();
    fireablePromise.Promise.catch(() => {
      record.call();
    });

    fireablePromise.Reject(new Error('reason'));
    expect(record.isCalled()).toBe(false);

    let err: Error | undefined = undefined;
    await fireablePromise.Promise.catch((reason) => { err = reason; });
    expect(err!.message).toBe('reason');
    expect(record.isCalled()).toBe(true);
  });
});

