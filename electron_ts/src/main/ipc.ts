import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent } from 'electron';
import { IElectronAPI } from 'electronAPI';
import * as fs from 'fs';

type HandleResult<T extends Promise<any>> = T extends Promise<infer U> ? U | T : never;

const handles: {
    [K in keyof IElectronAPI]: (
        // eslint-disable-next-line no-unused-vars
        event: IpcMainInvokeEvent,
        // eslint-disable-next-line no-unused-vars
        ...args: Parameters<IElectronAPI[K]>
    ) => HandleResult<ReturnType<IElectronAPI[K]>>;
} = {
    openFileDialog: async (ev, inputPath) => {
        const webContents = ev.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        const { canceled, filePaths } = await dialog.showOpenDialog(win, {
            title: 'Open File',
            defaultPath: inputPath,
        });
        if (canceled) {
            return undefined;
        }
        return filePaths[0];
    },
    getSavePath: (ev, relativePath) => `${app.getPath('userData')}/${relativePath}`,
    readFile: (ev, path) => {
        try {
            const data = fs.readFileSync(path, 'utf8');
            return data;
        } catch (err) {
            console.error(`Can not read file ${path}: ${err}`);
            return '';
        }
    },
    writeFile: (event, filePath, content) => {
        try {
            fs.writeFileSync(filePath, content);
        } catch (err) {
            console.error(`Can not write file: ${filePath}: ${err}`);
        }
    },
    add: (ev, a, b) => a + b,
    setTitle: (ev, title) => {
        const webContents = ev.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        win.setTitle(title);
    },
    log: (ev, message) => {
        console.log(message);
    },
};

export function initIPC() {
    Object.keys(handles).forEach((key) => {
        const channel = key as keyof IElectronAPI;
        ipcMain.handle(channel, handles[channel]);
    });
}
