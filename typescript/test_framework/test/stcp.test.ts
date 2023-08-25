import {
    it, beforeEach, afterEach, expect, describe,
} from '../src/test/test';
import { STcp } from '../src/common/stcp';

// 测试中接收消息的超时时间
const TIMEOUT = 100;

// 测试中的收发消息间隔
const REFRESH_INTERVAL = 1;

describe('stcp', () => {
    STcp.REFRESH_INTERVAL = REFRESH_INTERVAL;

    let service1: STcp;
    let service2: STcp;

    beforeEach(() => {
        service1 = new STcp(6802, 6803);
        service2 = new STcp(6803, 6802);
    });

    afterEach(() => {
        service1.close();
        service2.close();
    });

    // 发字符串
    it('send string', async () => {
        const message = 'hello';
        service1.send(message);
        expect(await service2.recvAsync(TIMEOUT)).toEqual(message);
        expect(service2.recv()).toBeUndefined();

        service2.send(message);
        expect(await service1.recvAsync(TIMEOUT)).toEqual(message);
        expect(service1.recv()).toBeUndefined();
    });

    // 发送对象
    it('send obj', async () => {
        const obj = {
            a: 1,
            b: 'hello',
            c: {
                d: 2,
            },
        };
        service1.send(obj);
        expect(await service2.recvAsync(TIMEOUT)).toEqual(obj);
    });

    // 发送很多对象
    it('send recv many objs', async () => {
        const obj = {
            id: 0,
            a: 1,
            b: 'hello',
            c: {
                d: 2,
            },
        };

        let sendCount = 0;
        let recvCount = 0;
        while (sendCount < 20) {
            const random = Math.random();
            if (random < 0.5) {
                obj.id = sendCount;
                service1.send(obj);
                sendCount += 1;
            } else {
                if (recvCount < sendCount) {
                    const recvObj = await service2.recvAsync(TIMEOUT);
                    obj.id = recvCount;
                    expect(recvObj).toEqual(recvObj);
                    recvCount += 1;
                } else {
                    service2.recv();
                    sendCount += 1;
                }
            }
        }
    });
});
