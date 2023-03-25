/* eslint-disable no-unused-vars */
export interface IElectronAPI {
  readFile: (filePath: string) => Promise<string>;
  add: (a: number, b: number) => Promise<number>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
