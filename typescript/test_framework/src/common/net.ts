export interface IPackage {
    srcPort: number;
    destPort: number;
    message: string;
}

export class CommandService {
    private sendQueue: IPackage[] = [];
    private recvQueue: IPackage[] = [];

    constructor(public port: number) {
    }

    send(port: number, message: string) {
        this.sendQueue.push({ srcPort: this.port, destPort: port, message});
    }

    recv() {
        return this.recvQueue.shift();
    }

    push(pkg: IPackage) {
        this.recvQueue.push(pkg);
    }

    pull() {
        return this.sendQueue.shift();
    }
}

export class CommandServiceManager {
    private _serviceMap = new Map<number, CommandService>();

    register(service: CommandService) {
        this._serviceMap.set(service.port, service);
    }

    update() {
        this._serviceMap.forEach((service) => {
            let pkg: IPackage | undefined;
            while (pkg = service.pull()) {
                const destService = this._serviceMap.get(pkg.destPort);
                destService?.push(pkg);
            }
        });
    }
}
