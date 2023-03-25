/* eslint-disable no-unused-vars */
declare module 'electronAPI' {
  declare interface IElectronAPI {
    readFile(filePath: string): Promise<string>;
    add(a: number, b: number): Promise<number>;
    setTitle(title: string): Promise<void>;
    showMessage(message: string): Promise<void>;
  }

  declare global {
    interface Window {
      electronAPI: IElectronAPI;
    }
  }
}
