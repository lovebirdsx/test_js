import { log } from 'console';

const callbacks: ((msg: string) => void)[] = [];

async function waitFoo(msg: string) {
    log('waitFoo start', msg);
    const promise = new Promise((resolve, reject) => {
        const cb = (msg1: string) => {
            if (msg1 === msg) {
                resolve(msg);
                callbacks.splice(callbacks.indexOf(cb), 1);
            }
        };
        callbacks.push(cb);
    });
    await promise;
    log('waitFoo end', msg);
}

let isTestRunning = false;
async function test() {
    isTestRunning = true;
    await waitFoo('hello');
    await waitFoo('world');
    isTestRunning = false;
}

function sendMsg(msg: string) {
    callbacks.forEach((callback) => {
        callback(msg);
    });
}

// 如果使用下面的main, 则无法正常运行test函数

// 这个问题的根本原因在于main函数中的while (isTestRunning)循环。
// JavaScript是单线程的，main函数在执行时，将阻塞其他异步操作。
// 在这个例子中，由于while循环阻塞了事件循环，await waitFoo('hello')和await
// waitFoo('world')无法顺利完成，导致test()函数无法继续执行下去。

// function main() {
//     test();
//     while (isTestRunning) {
//         sendMsg('hello');
//         sendMsg('world');
//     }
// }

// function main() {
//     test();
//     const intervalId = setInterval(() => {
//         if (!isTestRunning) {
//             clearInterval(intervalId);
//         } else {
//             sendMsg('hello');
//             sendMsg('world');
//         }
//     });
// }

async function sendMessges() {
    while (isTestRunning) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise<void>((resolve) => {
            sendMsg('hello');
            sendMsg('world');
            resolve();
        });
    }
}

function main() {
    test();
    sendMessges();
}

main();
