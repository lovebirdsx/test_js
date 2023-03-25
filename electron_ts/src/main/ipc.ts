import { ipcMain } from 'electron';
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
}
