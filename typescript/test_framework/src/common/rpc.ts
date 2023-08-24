import { ITran } from './interface';

interface IFunction {
    name: string;
    args: unknown[];
}

export type TFunction = (...args: any[]) => void;
export type TService = Record<string, TFunction>;

export class RpcServer<T extends TService> {
    // eslint-disable-next-line no-undef
    private timer: NodeJS.Timeout | undefined;

    constructor(private tran: ITran, private service: T) {
    }

    start() {
        this.timer = setInterval(() => {
            const data = this.tran.recv();
            if (data) {
                const req = data as IFunction;
                const func = this.service[req.name];
                if (func) {
                    const result = func(...req.args);
                    this.tran.send(result);
                }
            }
        }, 1);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.tran.stop();
    }
}

export class RpcClient<T extends TService> {
    constructor(private tran: ITran) {
    }

    async call<K extends keyof T>(name: K, ...args: Parameters<T[K]>): Promise<ReturnType<T[K]>> {
        const req: IFunction = { name: name as string, args };
        this.tran.send(req);
        const res = await this.tran.recvAsync(3000);
        if (res === undefined) {
            throw new Error(`call ${name as string} timeout`);
        }
        return res as ReturnType<T[K]>;
    }

    stop() {
        this.tran.stop();
    }
}
