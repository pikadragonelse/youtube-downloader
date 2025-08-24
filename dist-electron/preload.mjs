"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  downloadVideo: (opts) => electron.ipcRenderer.invoke("download-video", opts),
  cancelDownload: () => electron.ipcRenderer.invoke("cancel-download"),
  getTitle: (url) => electron.ipcRenderer.invoke("get-title", url),
  selectFolder: () => electron.ipcRenderer.invoke("select-folder"),
  getSettings: () => electron.ipcRenderer.invoke("get-settings"),
  onProgress: (callback) => {
    electron.ipcRenderer.on("download-progress", (_, progress) => callback(progress));
  }
});
