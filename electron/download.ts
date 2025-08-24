
import path from 'path';
import fs from 'fs';
import { dialog, ipcMain } from 'electron';
import { cancelDownload, downloadWithYtDlpAndMerge, getTitle } from './downloader';

const userDataPath = process.env.APPDATA || process.env.HOME || process.env.USERPROFILE || '.';
const settingsFile = path.join(userDataPath, 'idm-clone-user-settings.json');

function saveSettings(settings: { outputFolder: string }) {
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), 'utf-8');
}
function loadSettings(): { outputFolder?: string } {
  try {
    return JSON.parse(fs.readFileSync(settingsFile, 'utf-8'));
  } catch { return {}; }
}

ipcMain.handle("download-video", async (event, { url, outputFolder, fileName }) => {
  // Lưu lại outputFolder
  if (outputFolder) saveSettings({ outputFolder });
  return new Promise((resolve, reject) => {
    downloadWithYtDlpAndMerge(
      url,
      outputFolder,
      (progress) => {
        event.sender.send('download-progress', progress);
      },
      fileName
    )
      .then(() => resolve('done'))
      .catch((err) => reject(err));
  });
});

ipcMain.handle("cancel-download", () => {
  cancelDownload();
  return 'cancelled';
});

ipcMain.handle("get-title", async (_event, url: string) => {
  return await getTitle(url);
});

ipcMain.handle("select-folder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (result.canceled || !result.filePaths[0]) return null;
  // Lưu lại folder
  saveSettings({ outputFolder: result.filePaths[0] });
  return result.filePaths[0];
});

ipcMain.handle("get-settings", async () => {
  return loadSettings();
});
