/**
 * 使用http.Server实现一个websocket的简单例子
 * 启动服务器：ts-node web-socket-node.ts --port 12345 --is-server true
 * 启动客户端：ts-node web-socket-node.ts --port 12345
 *
 * 功能介绍：
 * * 客户端在连接成功后，朝服务器发送upgrade请求，请求升级为websocket协议
 * * 服务器接收到upgrade请求后，返回101状态码，表示升级成功
 * * 服务器每隔1秒向客户端发送ping消息
 * * 客户端可以输入任意内容，发送给服务器
 * * 客户端输入exit后，断开连接
 * * 客户端断开连接后，输入任意字符重新连接
 */

import { createServer } from 'http';
import { createConnection, Socket } from 'net';
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

async function timeout(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function runServer() {
  const server = createServer((req, res) => {
    console.log('客户端请求连接', req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('HTTP 服务器响应');
  });

  server.on('upgrade', (req, socket, head) => {
    console.log('客户端请求升级');
    let isConnected = true;

    socket.write([
      'HTTP/1.1 101 Web Socket Protocol Handshake',
      'Upgrade: WebSocket',
      'Connection: Upgrade',
      ].join('\r\n'));

    setInterval(() => {
      if (!isConnected) {
        return;
      }

      socket.write('ping');
    }, 1000);

    socket.on('data', (data) => {
      console.log(`收到客户端消息: ${data}`);
    });

    socket.on('end', () => {
      console.log('客户端已断开连接');
      isConnected = false;
    });
  });

  server.listen(port, () => {
    console.log(`HTTP 服务器已启动，监听端口 ${port}`);
  });
}

async function runClient() {
  await timeout(1000);

  let client: Socket | undefined;
  const startConnect = () => {
    client = createConnection({ port }, () => {
      console.log('已连接到服务器，输入exit断开连接');
      client!.write([
          `GET ws://localhost:${port}/ HTTP/1.1`,
          'Upgrade: websocket',
          'Connection: Upgrade',
          '',
          '',
        ].join('\r\n'));
    });

    client.on('data', (data) => {
      console.log(`收到服务器消息: ${data}`);
    });

    client.on('end', () => {
      console.log('与服务器的连接已断开');
      process.exit(0);
    });
  };

  startConnect();

  const rl = createInterface({
    input: process.stdin,
  });

  rl.on('line', (line) => {
    if (line === 'exit') {
      client?.end();
      client = undefined;
      console.log('已断开连接，输入任意字符重新连接');
    } else if (!client) {
      startConnect();
    } else {
      client.write(line);
    }
  });
}

if (isServer) {
  runServer();
} else {
  runClient();
}
