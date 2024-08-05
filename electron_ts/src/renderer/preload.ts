// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { IElectronAPI } from 'electronAPI';

function invokeRender<T extends keyof IElectronAPI>(
    channel: T,
    ...args: Parameters<IElectronAPI[T]>
): ReturnType<IElectronAPI[T]> {
    return ipcRenderer.invoke(channel, ...args) as ReturnType<IElectronAPI[T]>;
}

const electronAPI: IElectronAPI = {
    openFileDialog: async (inputPath) => {
        const path = await invokeRender('openFileDialog', inputPath);
        return path;
    },
    getSavePath: async (relativePath) => {
        const path = await invokeRender('getSavePath', relativePath);
        return path;
    },
    readFile: async (path) => {
        const content = await invokeRender('readFile', path);
        return content;
    },
    writeFile: async (filePath, content) => {
        await invokeRender('writeFile', filePath, content);
    },
    add: async (a, b) => {
        const result = await invokeRender('add', a, b);
        return result;
    },
    setTitle: async (title) => {
        await invokeRender('setTitle', title);
    },
    log: async (message) => {
        await invokeRender('log', message);
    },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('port', (event) => {
        console.log('event', event);
        const port = (event as any).ports[0] as MessagePort;

        // 必须调用 start() 方法，否则无法接收消息
        port.start();

        port.postMessage(`hello from renderer`);

        // https://www.electronjs.org/zh/docs/latest/api/context-bridge
        // 要让渲染进程能够使用 MessagePort，需要将其暴露到 window 对象中
        contextBridge.exposeInMainWorld('port', {
            postMessage: (message: any) => port.postMessage(message),
        });

        port.onmessage = (ev) => {
            console.log('renderer received', ev.data);
        };
    });
});
