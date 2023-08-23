import { EventDispatcher } from './event_dispatcher';

const eventDefine = {
    OnCommand: (cmd: string) => { },
};

class CommandServiceManager {
    private static instance: CommandServiceManager;

    static getInstance() {
        if (!CommandServiceManager.instance) {
            CommandServiceManager.instance = new CommandServiceManager();
        }
        return CommandServiceManager.instance;
    }

    private constructor() { }

    private services: CommandService[] = [];

    registerService(service: CommandService) {
        this.services.push(service);
    }

    async start() {
        for (let i = 0; i < this.services.length; i += 1) {
            await this.services[i].start();
        }
    }
}

export class CommandService extends EventDispatcher<typeof eventDefine> {
    constructor(public port: number) {
        super();
    }

    async start() {

    }
}
