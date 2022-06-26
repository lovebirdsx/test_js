import { log } from 'console';
import { testEventDispatcher } from './test/event_dispatcher';

function main() {
    log('hello task1');
}

function test() {
    testEventDispatcher();
}

test();
// main();
