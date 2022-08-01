import { assert, log } from 'console';
import { type } from 'os';
import { EventDispacher } from '../event_dispatcher';

const eventConfig = {
    kill: (type: string, id: number) => {},
    collect: (type: string, id: number) => {},
    foo: (id: number) => {},
};

type TEventConfig = typeof eventConfig;

class TestEventDispatcher extends EventDispacher<keyof typeof eventConfig, typeof eventConfig> {

}

let kill1Count = 0;
function onKill1(type: string, id: number) {
    kill1Count++;
}

let kill2Count = 0;
function onKill2(type: string, id: number) {
    kill2Count++;
}

export function testEventDispatcher() {
    const dispatcher = new TestEventDispatcher();
    dispatcher.reg('kill', onKill1);
    dispatcher.reg('kill', onKill2);
    dispatcher.dispatch('kill', 'test', 1);
    assert(kill1Count === 1);
    assert(kill2Count === 1);

    dispatcher.unReg('kill', onKill1);
    dispatcher.dispatch('kill', 'test', 2);
    assert(kill1Count === 1);
    assert(kill2Count === 2);

    dispatcher.reg('foo', (id) => console.log('wahaha', id));

    dispatcher.dispatch('foo', 1);

    log('testEventDispatcher passed');
}

testEventDispatcher();
