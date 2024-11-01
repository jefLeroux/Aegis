// src/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    sendMessage: (message: string) => ipcRenderer.send('message-from-renderer', message),
    onMessage: (callback: (arg: any) => void) => ipcRenderer.on('message-from-main', (event, arg) => callback(arg)),
});
