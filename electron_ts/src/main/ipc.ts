import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron';
// eslint-disable-next-line import/no-unresolved
import { IElectronAPI } from 'electronAPI';
import * as fs from 'fs';

type HandleResult<T extends Promise<any>> = T extends Promise<infer U> ? U | T : never;

function handle<T extends keyof IElectronAPI>(
  channel: T,
  listener: (
    // eslint-disable-next-line no-unused-vars
    event: IpcMainInvokeEvent,
    // eslint-disable-next-line no-unused-vars
    ...args: Parameters<IElectronAPI[T]>
  ) => HandleResult<ReturnType<IElectronAPI[T]>>
) {
  ipcMain.handle(channel, listener);
}

export function initIPC() {
  handle('add', (event, a, b) => a + b);
  handle('readFile', (event, path) => {
    try {
      const data = fs.readFileSync(path, 'utf8');
      return data;
    } catch (err) {
      console.error(err);
      return `Can not read file: ${path}`;
    }
  });

  handle('setTitle', (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  });

  handle('log', (event, message) => {
    // 弹出一个消息框
    console.log(message);
  });
}
