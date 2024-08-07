import { app, BrowserWindow, MessageChannelMain } from 'electron';
import path from 'path';
import fs from 'fs';
import { initIPC } from './ipc';

const WINDOW_STATE_FILE = 'window-state.json';

const defaultWindowState = {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    isMaximized: false,
    isShowDevTools: false,
};

function getWindowState(): typeof defaultWindowState {
    try {
        const file = path.join(app.getPath('userData'), WINDOW_STATE_FILE);
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return defaultWindowState;
    }
}

function saveWindowState(window: BrowserWindow) {
    try {
        const lastWindowState = {
            x: window.getPosition()[0],
            y: window.getPosition()[1],
            width: window.getSize()[0],
            height: window.getSize()[1],
            isMaximized: window.isMaximized(),
            isShowDevTools: window.webContents.isDevToolsOpened(),
        };
        const file = path.join(app.getPath('userData'), WINDOW_STATE_FILE);
        fs.writeFileSync(file, JSON.stringify(lastWindowState, null, 2));
    } catch (err) {
        console.error(err);
    }
}

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = (): void => {
    // Create the browser window.
    const state = getWindowState();
    const mainWindow = new BrowserWindow({
        ...state,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    if (state.isMaximized) {
        mainWindow.maximize();
    }

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    const { port1, port2 } = new MessageChannelMain();
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.postMessage('port', 'message from main process', [port2]);

        port1.start();
        port1.postMessage('hello from main process');
    });

    port1.on('message', (event) => {
        console.log('message from renderer:', event.data);
    });

    // Open the DevTools.
    if (state.isShowDevTools) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('close', () => {
        saveWindowState(mainWindow);
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    initIPC();
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
