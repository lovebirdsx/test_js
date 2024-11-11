import { Worker } from 'worker_threads';

interface WorkerData {
  name: string;
  count: number;
}

interface WorkerMessage {
  type: 'log' | 'sum';
  name: string;
  i?: number;
  sum?: number;
}

function createSandbox(workerData: WorkerData) {
  return new Promise<WorkerMessage>((resolve, reject) => {
    const worker = new Worker(`
      const { parentPort, workerData } = require('worker_threads');
      let sum = 0;
      for (let i = 0; i < workerData.count; i++) {
        if (i % 2000000 === 0) {
          parentPort.postMessage({ type: 'log', name: workerData.name, i });
        }
        sum += i;
      }
      parentPort.postMessage({ type: 'sum', name: workerData.name, sum });
    `, { eval: true, workerData });

    worker.on('message', (msg: WorkerMessage) => {
      if (msg.type === 'log') {
        console.log(`${msg.name} ${msg.i}`);
      } else if (msg.type === 'sum') {
        resolve(msg);
      }
    });

    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

Promise.all([
  createSandbox({ name: 'Sandbox1', count: 10 * 1000 * 1000 }),
  createSandbox({ name: 'Sandbox2', count: 10 * 1000 * 1000 }),
]).then((results) => {
  console.log(results);
}).catch((err) => {
  console.error(err);
});
