import { TestManager } from './test/manager';

async function test() {
    console.log('');
    await TestManager.instance.runTests();
    console.log('');
}

test();
