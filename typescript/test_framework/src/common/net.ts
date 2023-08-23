import { EventDispatcher } from './event_dispatcher';

const eventDefine = {
    OnCommand: (cmd: string) => { },
};

export class CommandService extends EventDispatcher<typeof eventDefine> {
    constructor(public port: number) {
        super();
    }

    async start() {

    }
}

interface Scheme {
    name: string;
}
