import {
 describe, it, expect, jest,
} from '@jest/globals';
import { ILogger, IFileSystem } from './dependency_injection';

export class Logger implements ILogger {
    constructor() {
        this.log = this.log.bind(this);
    }

    log(message: string): void {
        console.log(message);
    }
}

export class FileSystem implements IFileSystem {
    constructor(@ILogger private logger: ILogger) {
    }

    readFile(path: string): string {
        this.logger.log(`Reading file ${path}`);
        return 'file content';
    }
}

describe('Dependency Injection', () => {
    it('should inject a dependency', () => {
        const logger = new Logger();
        logger.log = jest.fn();
        const fileSystem = new FileSystem(logger);
        fileSystem.readFile('test.txt');
        expect(logger.log).toBeCalled();
    });
});
