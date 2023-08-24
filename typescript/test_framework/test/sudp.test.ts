import { it, expect } from '@jest/globals';
import { SUdp } from '../src/common/sudp';

it('message should be received', async () => {
    const port1 = 6800;
    const port2 = 6801;
    const service1 = new SUdp(port1);
    const service2 = new SUdp(port2);

    const message = 'hello';
    service1.send(port2, message);
    const pkg = await service2.recvAsync(1000);
    expect(pkg?.message).toEqual(message);
    expect(pkg?.srcPort).toEqual(port1);

    const pkg2 = await service2.recv();
    expect(pkg2).toBeUndefined();

    service2.send(port1, message);
    const pkg3 = await service1.recvAsync(1000);
    expect(pkg3?.message).toEqual(message);
    expect(pkg3?.srcPort).toEqual(port2);

    service1.stop();
    service2.stop();
});
