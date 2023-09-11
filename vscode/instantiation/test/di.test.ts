import { createDecorator } from '../instantiation';
import { InstantiationService } from '../instantiationService';

// 接口定义
interface ILogger {
    log(message: string): void;
}

const ILogger = createDecorator<ILogger>('Logger');

interface IFileSystem {
    readFile(path: string): string;
    writeFile(path: string, content: string): void;
}

const IFileSystem = createDecorator<IFileSystem>('FileSystem');

interface ISaver {
    save(path: string, obj: unknown): void
}

const ISaver = createDecorator<ISaver>('Saver');

// 接口实现
class Logger implements ILogger {
    constructor() {
        this.log = this.log.bind(this);
    }

    log(message: string): void {
        console.log(message);
    }
}

class FileSystem implements IFileSystem {
    constructor(@ILogger private logger: ILogger) {
    }

    readFile(path: string): string {
        this.logger.log(`Reading file ${path}`);
        return 'file content';
    }

    writeFile(path: string, content: string): void {
        this.logger.log(`Writing file ${path}`);
    }
}

class Saver implements ISaver {
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

describe('Dependency Injection', () => {
    it('should inject a dependency', () => {
        const logger = new Logger();
        logger.log = jest.fn();
        const fileSystem = new FileSystem(logger);
        fileSystem.readFile('test.txt');
        expect(logger.log).toHaveBeenCalledTimes(1);

        const saver = new Saver(logger, fileSystem);
        saver.save('test.txt', { test: true });
        expect(logger.log).toHaveBeenCalledTimes(3);
    });

    // 通过InstantiationService来创建服务
    it('should inject a dependency through InstantiationService', () => {
        const instantiationService = new InstantiationService();
        const logger = instantiationService.createInstance(Logger);
        expect(logger).toBeInstanceOf(Logger);
    });
});
