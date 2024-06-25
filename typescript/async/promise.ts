function testPromise1() {
  console.log(1);
  setTimeout(() => {
    console.log(2);
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
}

function testPromise2() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
    Promise.resolve().then(() => {
      console.log(3)
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
  })

  console.log(7);
}

async function delayMs(time: number): Promise<void> {
  return new Promise(function (resolve) {
      setTimeout(resolve, time);
  });
}

async function testPromise3() {
  setTimeout(() => {
      console.log(`[${Date.now()}] idleValue executor`);
  }, 0);
  console.log(`[${Date.now()}] before delay`);
  await delayMs(0);
  console.log(`[${Date.now()}] after delay`);
  await delayMs(0);
  console.log(`[${Date.now()}] after delay`);
};

testPromise3();
