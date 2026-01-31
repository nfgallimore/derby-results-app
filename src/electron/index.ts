/**
 * Electron Main Process
 * Entry point for the Electron application. Creates a browser window and loads the web app
 * from https://go.rr1.us/. The preload script initializes UDP communication for receiving
 * timing data from DerbyAppTimeProc.
 */

const { app, BrowserWindow } = require('electron');
const ipc = require('electron').ipcMain;
const path = require('path');

let eWindow: any = null;

app.on('ready', () => {
    // once electron has started up, create a window.
    eWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js'),
        },
    });

    // hide the default menu bar that comes with the browser window
    eWindow.setMenuBarVisibility(null);

    // load a website to display
    eWindow.loadURL('https://go.rr1.us');
    eWindow.webContents.openDevTools();

    console.log('[ELECTRON] Window created and loaded');
});
