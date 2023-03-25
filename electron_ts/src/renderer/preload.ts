// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  readFile: async (path: string) => {
    const content = await ipcRenderer.invoke('read-file', path);
    return content;
  },
  add: (a: number, b: number) => a + b,
});
