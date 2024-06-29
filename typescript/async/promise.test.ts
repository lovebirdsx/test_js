async function delayMs(time: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

describe('Promise', () => {
  it('execute order - 1', (done) => {
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

  it('execute order - 2', (done) => {
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

  it('execute order - 3', async () => {
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
    promise.then(() => {
      console.log(1);
    });
    promise.then(() => {
      console.log(2);
    });
    
    console.log('before fire');
    fireFun?.();
    console.log('after fire');

    promise.then(() => {
      console.log(4);
    });
  });
});
