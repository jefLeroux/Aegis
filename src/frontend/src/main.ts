// src/main.ts
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        preload: path.join(__dirname, "preload.js"), // Load the preload script
        contextIsolation: true, // Security best practice
    },
    });

  win.loadFile(path.join(__dirname, "../src/pages/index.html")); // Load your HTML file

    ipcMain.on("message-from-renderer", (event, arg) => {
        console.log(arg); // Print message from renderer
        event.reply("message-from-main", "Hello from main process!");
    });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
