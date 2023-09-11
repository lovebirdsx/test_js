import { expect } from 'chai';
import { spy } from 'sinon';
import { createDecorator } from '../instantiation';
import { InstantiationService } from '../instantiationService';
import { getSingletonServiceDescriptors, registerSingleton } from '../extension';
import { ServiceCollection } from '../serviceCollection';

// 接口定义
interface ILogger {
    readonly _serviceBrand: undefined;
    log(message: string): void;
}

const ILogger = createDecorator<ILogger>('Logger');

interface IFileSystem {
    readonly _serviceBrand: undefined;
    readFile(path: string): string;
    writeFile(path: string, content: string): void;
}

const IFileSystem = createDecorator<IFileSystem>('FileSystem');

interface ISaver {
    readonly _serviceBrand: undefined;
    save(path: string, obj: unknown): void
}

const ISaver = createDecorator<ISaver>('Saver');

// 接口实现
class Logger implements ILogger {
    declare readonly _serviceBrand: undefined;

    constructor() {
        this.log = this.log.bind(this);
    }

    log(message: string): void {
        console.log(message);
    }
}

class FileSystem implements IFileSystem {
    private static _files: Map<string, string> = new Map();

    static clearFiles(): void {
        FileSystem._files.clear();
    }

    static getFile(path: string): string | undefined {
        return FileSystem._files.get(path);
    }

    declare readonly _serviceBrand: undefined;

    constructor(@ILogger private logger: ILogger) {
    }

    readFile(path: string): string {
        this.logger.log(`Reading file ${path}`);
        return FileSystem.getFile(path) || '';
    }

    writeFile(path: string, content: string): void {
        this.logger.log(`Writing file ${path}`);
        FileSystem._files.set(path, content);
    }
}

class Saver implements ISaver {
    declare readonly _serviceBrand: undefined;

    constructor(
        @ILogger private logger: ILogger,
        @IFileSystem private fileSystem: IFileSystem,
    ) {}

    save(path: string, obj: unknown): void {
        this.logger.log(`Saving object to ${path}`);
        const content = JSON.stringify(obj);
        this.fileSystem.writeFile(path, content);
    }
}

registerSingleton(ILogger, Logger, true);
registerSingleton(IFileSystem, FileSystem, true);
registerSingleton(ISaver, Saver, true);

describe('Dependency Injection', () => {
    it('should inject a dependency', () => {
        const logger = new Logger();
        const logSpy = spy(logger, 'log');
        const fileSystem = new FileSystem(logger);
        fileSystem.readFile('test.txt');
        expect(logSpy.callCount).to.equal(1);

        const saver = new Saver(logger, fileSystem);
        saver.save('test.txt', { test: true });
        expect(logSpy.callCount).to.equal(3);
    });

    // 通过InstantiationService来创建服务
    it('should inject a dependency through InstantiationService', () => {
        const services = new ServiceCollection();
        for (const [id, descriptor] of getSingletonServiceDescriptors()) {
            services.set(id, descriptor);
        }

        const instantiationService = new InstantiationService(services);
        const saver = instantiationService.createInstance(Saver);
        saver.save('test.txt', 'hello');
        expect(FileSystem.getFile('test.txt')).to.equal('"hello"');
    });
});
