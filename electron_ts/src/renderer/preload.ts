// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
// eslint-disable-next-line import/no-unresolved
import { IElectronAPI } from 'electronAPI';

function invokeRender<T extends keyof IElectronAPI>(
  channel: T,
  ...args: Parameters<IElectronAPI[T]>
): ReturnType<IElectronAPI[T]> {
  return ipcRenderer.invoke(channel, ...args) as ReturnType<IElectronAPI[T]>;
}

const electronAPI: IElectronAPI = {
  readFile: async (path) => {
    const content = await invokeRender('readFile', path);
    return content;
  },
  add: async (a, b) => a + b,
  setTitle: async (title) => {
    await invokeRender('setTitle', title);
  },
  log: async (message) => {
    await invokeRender('log', message);
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
