import { Socket, createSocket } from 'dgram';

export interface IDgram {
    srcPort: number;
    destPort: number;
    message: string;
}

export class SUdp {
    private socket: Socket;
    private recvQueue: IDgram[] = [];
    private myIsRunning = false;

    constructor(public port: number) {
        this.socket = createSocket('udp4');
        this.socket.bind(port);
        this.socket.on('message', (msg, rinfo) => {
            const d: IDgram = {
                srcPort: rinfo.port,
                destPort: port,
                message: msg.toString(),
            };
            this.recvQueue.push(d);
        });
    }

    get isRunning() {
        return this.myIsRunning;
    }

    close() {
        this.socket.close();
        this.myIsRunning = false;
    }

    send(port: number, message: string) {
        this.socket.send(message, port, 'localhost');
    }

    recv() {
        return this.recvQueue.shift();
    }

    async recvAsync(timeout: number = 0) {
        return new Promise<IDgram | undefined>((resolve, reject) => {
            // eslint-disable-next-line no-undef
            let timer: NodeJS.Timeout | undefined;
            const interval = setInterval(() => {
                if (this.recvQueue.length > 0) {
                    if (timer) {
                        clearTimeout(timer);
                    }
                    clearInterval(interval);
                    resolve(this.recvQueue.shift());
                }
            }, 1);
            if (timeout >= 0) {
                timer = setTimeout(() => {
                    resolve(undefined);
                    clearInterval(interval);
                }, timeout);
            }
        });
    }
}
