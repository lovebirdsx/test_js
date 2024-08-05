declare module 'electronAPI' {
    declare interface IElectronAPI {
        getSavePath(relativePath): Promise<string>;
        openFileDialog(inputPath: string): Promise<string | undefined>;
        readFile(filePath: string): Promise<string>;
        writeFile(filePath: string, content: string): Promise<void>;
        add(a: number, b: number): Promise<number>;
        setTitle(title: string): Promise<void>;
        log(message: string): Promise<void>;
    }

    declare global {
        interface Window {
            electronAPI: IElectronAPI;
            port: MessagePort;
        }
    }
}
