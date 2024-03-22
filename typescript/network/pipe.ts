/**
 * 实现一个命名管道的简单例子
 * 启动服务器：ts-node pipe.ts --pipe-name test --is-server true
 * 启动客户端：ts-node pipe.ts --pipe-name test --is-server false
 * 在客户端输入的内容会被发送到服务器端，服务器端接收到的内容会被打印到控制台
 */

import { Socket, createServer } from 'net';
import * as readline from 'readline';

const args = process.argv.slice(2);
const pipeNameIndex = args.indexOf('--pipe-name');
const isServerIndex = args.indexOf('--is-server');

if (pipeNameIndex === -1 || isServerIndex === -1) {
  console.error('Missing required arguments: --pipe-name and --is-server');
  process.exit(1);
}

const pipeName = args[pipeNameIndex + 1]!;
const isServer = args[isServerIndex + 1] === 'true';

if (isServer) {
  const server = createServer();
  server.listen(pipeName);

  server.on('connection', (socket) => {
    const rl = readline.createInterface({
      input: socket,
      output: process.stdout,
    });

    rl.on('line', (input) => {
      console.log(input);
    });
  });
} else {
  const socket = new Socket();
  socket.connect(pipeName);
  const rl = readline.createInterface({
    input: process.stdin,
    output: socket,
  });

  rl.on('line', (input) => {
    socket.write(input);
  });
}
