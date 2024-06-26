import * as net from 'net';
import * as dgram from 'dgram';

/**
 * 检查TCP端口是否可用
 * @param port 要检查的端口号
 * @returns Promise<boolean> 端口是否可用
 */
function checkTcpPort(port: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(port, '0.0.0.0', () => {
      server.once('close', () => {
        resolve(true); // TCP 端口可用
      });
      server.close();
    });

    server.on('error', (err: { code: string }) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false); // TCP 端口被占用
      } else {
        reject(err); // 其他错误
      }
    });
  });
}

/**
* 检查UDP端口是否可用
* @param port 要检查的端口号
* @returns Promise<boolean> 端口是否可用
*/
function checkUdpPort(port: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const socket = dgram.createSocket('udp4');

    socket.bind(port, '0.0.0.0', () => {
      socket.close();
      resolve(true); // UDP 端口可用
    });

    socket.on('error', (err: { code: string }) => {
      if (err.code === 'EADDRINUSE') {
        socket.close();
        resolve(false); // UDP 端口被占用
      } else {
        reject(err); // 其他错误
      }
    });
  });
}

/**
* 同时检查TCP和UDP端口是否占用
* @param port 要检查的端口号
*/
async function checkPort(port: number): Promise<boolean> {
  try {
    const isTcpAvailable = await checkTcpPort(port);
    const isUdpAvailable = await checkUdpPort(port);
    console.log(`TCP on port ${port} is ${isTcpAvailable ? 'available' : 'not available'}`);
    console.log(`UDP on port ${port} is ${isUdpAvailable ? 'available' : 'not available'}`);
    return isTcpAvailable && isUdpAvailable;
  } catch (err) {
    console.error('Error checking ports:', err);
    return false;
  }
}

async function test() {
  // 使用示例
  const PORT_TO_CHECK = 8890;
  console.time('checkPort');
  const isAvailable = await checkPort(PORT_TO_CHECK);
  console.log(`Port ${PORT_TO_CHECK} is ${isAvailable ? 'available' : 'not available'}`);
  console.timeEnd('checkPort');
}

test();
