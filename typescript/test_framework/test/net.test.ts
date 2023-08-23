import { describe, it } from '@jest/globals';
import { CommandService, CommandServiceManager } from '../src/common/net';

describe('net', () => {
    it('message should be received', () => {
        const manager = new CommandServiceManager();
        const service1 = new CommandService(1);
        const service2 = new CommandService(2);
        manager.register(service1);
        manager.register(service2);
        
        const message = 'hello';
        service1.send(2, message);
        manager.update();
        expect(service2.recv()?.message).toEqual('hello');
        expect(service2.recv()).toBeUndefined();
        
        service2.send(1, message);
        manager.update();
        expect(service1.recv()?.message).toEqual('hello');
        expect(service1.recv()).toBeUndefined();
    });
});
