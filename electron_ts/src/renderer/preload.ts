// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
// eslint-disable-next-line import/no-unresolved
import { IElectronAPI } from 'electronAPI';

const electronAPI: IElectronAPI = {
  readFile: async (path: string) => {
    const content = await ipcRenderer.invoke('read-file', path);
    return content;
  },
  add: async (a: number, b: number) => a + b,
  setTitle: async (title: string) => {
    await ipcRenderer.invoke('set-title', title);
  },
  showMessage: async (message: string) => {
    await ipcRenderer.invoke('show-message', message);
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
