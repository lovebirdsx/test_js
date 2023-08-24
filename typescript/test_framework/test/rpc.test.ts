import {
    it, beforeEach, afterEach, expect, describe,
} from '@jest/globals';
import { RpcClient, RpcServer } from '../src/common/rpc';
import { STcp } from '../src/common/stcp';

const serviceConfig = {
    add: (a: number, b: number) => 0,
    sub: (a: number, b: number) => 0,
    mul: (a: number, b: number) => 0,
    div: (a: number, b: number) => 0,
};

const service: typeof serviceConfig = {
    add: (a: number, b: number) => a + b,
    sub: (a: number, b: number) => a - b,
    mul: (a: number, b: number) => a * b,
    div: (a: number, b: number) => a / b,
};

describe('rpc test', () => {
    let sv: RpcServer<typeof serviceConfig>;
    let cl: RpcClient<typeof serviceConfig>;
    let clTran: STcp;
    let svTran: STcp;

    beforeEach(() => {
        svTran = new STcp(6804, 6805);
        clTran = new STcp(6805, 6804);
        sv = new RpcServer(svTran, service);
        cl = new RpcClient(clTran);
        sv.start();
    });

    afterEach(() => {
        sv.stop();
        svTran.close();
        clTran.close();
    });

    it('rpc test', async () => {
        expect(await cl.call('add', 1, 2)).toEqual(3);
        expect(await cl.call('sub', 1, 2)).toEqual(-1);
        expect(await cl.call('mul', 1, 2)).toEqual(2);
        expect(await cl.call('div', 1, 2)).toEqual(0.5);
    });
});
