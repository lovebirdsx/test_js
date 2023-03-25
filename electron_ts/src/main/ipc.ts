import { BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';

export function initIPC() {
  ipcMain.handle('read-file', (event, path) => {
    try {
      const data = fs.readFileSync(path, 'utf8');
      return data;
    } catch (err) {
      console.error(err);
      return `Can not read file: ${path}`;
    }
  });

  ipcMain.handle('set-title', (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  });

  ipcMain.handle('show-message', (event, message) => {
    // 弹出一个消息框
    console.log(message);
  });

  console.log('IPC initialized');
}
