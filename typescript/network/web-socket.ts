/**
 * 实现一个websocket的简单例子
 * 启动服务器：ts-node web-socket.ts --port 12345 --is-server true
 * 启动客户端：ts-node web-socket.ts --port 12345
 * 在客户端输入的内容会被发送到服务器端，服务器端接收到的内容会被打印到控制台
 */

import WebSocket, { WebSocketServer } from 'ws';
import { createInterface } from 'readline';

const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const isServerIndex = args.indexOf('--is-server');

if (portIndex < 0) {
  console.error('请提供端口号，例如：--port 12345');
  process.exit(1);
}

const port = parseInt(args[portIndex + 1], 10);
const isServer = isServerIndex >= 0 && args[isServerIndex + 1] === 'true';

if (isServer) {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws) => {
    console.log('客户端已连接');

    ws.on('message', (message) => {
      console.log(`收到客户端消息: ${message}`);
    });

    ws.on('close', () => {
      console.log('客户端已断开连接');
    });
  });

  console.log(`WebSocket 服务器已启动，监听端口 ${port}`);
} else {
  const ws = new WebSocket(`ws://localhost:${port}`);

  ws.on('open', () => {
    console.log('已连接到服务器');

    const rl = createInterface({
      input: process.stdin,
    });

    rl.on('line', (line) => {
      ws.send(line);
    });
  });

  ws.on('message', (message) => {
    console.log(`收到服务器消息: ${message}`);
  });

  ws.on('close', () => {
    console.log('与服务器的连接已断开');
    process.exit(0);
  });
}
