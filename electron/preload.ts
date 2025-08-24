import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  downloadVideo: (opts: { url: string; outputFolder: string; fileName: string }) => ipcRenderer.invoke('download-video', opts),
  cancelDownload: () => ipcRenderer.invoke('cancel-download'),
  getTitle: (url: string) => ipcRenderer.invoke('get-title', url),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  onProgress: (callback: (progress: { phase: string; percent?: number; message?: string; mergeTime?: string; mergeDuration?: string; mergeElapsed?: number }) => void) => {
    ipcRenderer.on('download-progress', (_, progress) => callback(progress));
  },
});
