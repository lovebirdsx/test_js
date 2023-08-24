import {
    it, beforeEach, afterEach, expect, describe,
} from '@jest/globals';
import { ReliableCommandService } from '../src/common/reliable_command_service';

// 测试中接收消息的超时时间
const TIMEOUT = 100;

// 测试中的收发消息间隔
const REFRESH_INTERVAL = 1;

describe('reliable command service', () => {
    ReliableCommandService.REFRESH_INTERVAL = REFRESH_INTERVAL;

    let service1: ReliableCommandService;
    let service2: ReliableCommandService;

    beforeEach(() => {
        service1 = new ReliableCommandService(6802, 6803);
        service2 = new ReliableCommandService(6803, 6802);
    });

    afterEach(() => {
        service1.stop();
        service2.stop();
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
        while (sendCount < 100) {
            const random = Math.random();
            if (random < 0.5) {
                obj.id = sendCount;
                service1.send(obj);
                sendCount += 1;
            } else {
                // eslint-disable-next-line no-lonely-if
                if (recvCount < sendCount) {
                    const recvObj = await service2.recvAsync(TIMEOUT);
                    if (recvObj) {
                        obj.id = recvCount;
                        expect(recvObj).toEqual(recvObj);
                        recvCount += 1;
                    }
                } else {
                    service2.recv();
                    sendCount += 1;
                }
            }
        }
    });
});
