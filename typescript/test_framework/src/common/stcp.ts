import { log, warn } from 'console';
import { SUdp } from './sudp';

const MAGIC = '##';
const MAX_MESSAGE_LENGTH = 1024;

interface IMessage {
    seq: number;
    payload?: unknown;
}

interface IPackage {
    magic: string;
    ack: number;
    msgs: IMessage[];
}

function encode(pkg: IPackage): string {
    return JSON.stringify(pkg);
}

function decode(str: string) {
    try {
        return JSON.parse(str) as IPackage;
    } catch (e) {
        return undefined;
    }
}

export class STcp {
    // 最大的消息序号，超过后从0开始
    public static MAX_SEQ_ID = 10000;

    // 处理收发的间隔
    public static REFRESH_INTERVAL = 1000 / 50;

    // 模拟的掉包率
    public static DROP_RATE = 0;

    private commandService: SUdp;

    // 需要重传的消息队列
    private sendQueue: IMessage[] = [];

    // 已经收到的消息队列
    private recvQueue: IMessage[] = [];

    // 发送的消息序号
    private sendSeq = 0;

    // 下一个需要接收的消息序号
    private recvSeq = 0;

    // 已经得到对方确认的消息序号
    private sendSeqAck = 0;

    // eslint-disable-next-line no-undef
    private timer: NodeJS.Timeout;

    constructor(public port: number, public destPort: number) {
        this.port = port;
        this.commandService = new SUdp(port);
        this.timer = setInterval(() => {
            this.pull();
            this.sendImpl();
        }, STcp.REFRESH_INTERVAL);
    }

    get isRunning() {
        return this.commandService.isRunning;
    }

    private generatePackage() {
        const pck: IPackage = {
            magic: MAGIC,
            ack: this.recvSeq,
            msgs: [],
        };
        for (let i = 0; i < this.sendQueue.length; i++) {
            const msg = this.sendQueue[i];
            pck.msgs.push(msg);
            if (encode(pck).length >= MAX_MESSAGE_LENGTH) {
                pck.msgs.pop();
                break;
            }
        }
        return pck;
    }

    private sendImpl() {
        const pck = this.generatePackage();
        this.commandService.send(this.destPort, encode(pck));
        // log(`${this.port} send ack ${pck.ack} m ${pck.msgs.length} q ${this.sendQueue.length} [${pck.msgs.map((m) => m.seq).join(',')}]`);
    }

    send(obj: unknown) {
        if (this.sendQueue.length >= STcp.MAX_SEQ_ID) {
            throw new Error('sendQueue.length >= ReliableCommandService.MAX_SEQ_ID');
        }

        this.sendQueue.push({
            seq: this.sendSeq,
            payload: obj,
        });
        this.sendSeq = (this.sendSeq + 1) % STcp.MAX_SEQ_ID;
        this.sendImpl();
    }

    private pullOne() {
        // 缓冲区满了，不再接收
        if (this.recvQueue.length >= STcp.MAX_SEQ_ID) {
            return false;
        }

        // 从commandService中获取数据，如果数据取完了，返回false
        const d = this.commandService.recv();
        if (!d) {
            return false;
        }

        if (d.srcPort !== this.destPort) {
            warn(`srcPort ${d.srcPort} !== this.destPort ${this.destPort}`);
            return true;
        }

        const pkg = decode(d.message);
        if (!pkg) {
            warn(`decode failed: ${d.message}`);
            return true;
        }

        if (pkg.magic !== MAGIC) {
            warn(`pkg.magic ${pkg.magic} !== MAGIC ${MAGIC}`);
            return true;
        }

        if (pkg.ack > this.sendSeqAck) {
            this.sendSeqAck = pkg.ack;
            while (this.sendQueue.length > 0 && this.sendQueue[0].seq < this.sendSeqAck) {
                this.sendQueue.shift();
            }
        }

        // log(`${this.port} recv ack ${pkg.ack} m ${pkg.msgs.length} [${pkg.msgs.map((m) => m.seq).join(',')}]`);
        pkg.msgs.forEach((msg) => {
            if (msg.seq === this.recvSeq) {
                this.recvQueue.push(msg);
                this.recvSeq = (this.recvSeq + 1) % STcp.MAX_SEQ_ID;
            }
        });

        return true;
    }

    private pull() {
        while (this.pullOne()) {
            // do nothing
        }
    }

    recv() {
        this.pull();
        return this.recvQueue.shift()?.payload;
    }

    async recvAsync(timeout: number = -1) {
        return new Promise<unknown>((resolve, reject) => {
            // eslint-disable-next-line no-undef
            let timer: NodeJS.Timeout | undefined;
            const interval = setInterval(() => {
                this.pull();
                const pkg = this.recvQueue.shift();
                if (pkg?.payload) {
                    if (timer) {
                        clearTimeout(timer);
                    }
                    clearInterval(interval);
                    resolve(pkg.payload);
                }
            }, 1);

            if (timeout >= 0) {
                timer = setTimeout(() => {
                    clearInterval(interval);
                    resolve(undefined);
                }, timeout);
            }
        });
    }

    stop() {
        this.commandService.stop();
        clearInterval(this.timer);
    }
}
