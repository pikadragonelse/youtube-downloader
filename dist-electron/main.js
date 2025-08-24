import { ipcMain, dialog, app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path$1 from "node:path";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
let currentProcs = {};
function cancelDownload() {
  if (currentProcs.video) currentProcs.video.kill("SIGKILL");
  if (currentProcs.audio) currentProcs.audio.kill("SIGKILL");
  if (currentProcs.ffmpeg) currentProcs.ffmpeg.kill("SIGKILL");
  if (currentProcs.files) {
    for (const f of currentProcs.files) {
      try {
        fs.existsSync(f) && fs.unlinkSync(f);
      } catch (e) {
      }
    }
  }
  currentProcs = {};
}
function getTitle(url) {
  return new Promise((resolve) => {
    const pythonPath = "python";
    const scriptPath = path.resolve("python", "yt-dlp.py");
    const proc = spawn(pythonPath, [scriptPath, "--get-title", url]);
    let title = "";
    proc.stdout.on("data", (d) => {
      title += d.toString();
    });
    proc.on("close", (_code) => {
      resolve(title.trim());
    });
  });
}
function downloadWithYtDlpAndMerge(url, outputFolder = "./downloads", onProgress, fileName) {
  return new Promise(async (resolve, reject) => {
    const pythonPath = "python";
    const scriptPath = path.resolve("python", "yt-dlp.py");
    const ffmpegPath = path.resolve("ffmpeg/bin", "ffmpeg.exe");
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }
    let durationSec = 0;
    try {
      durationSec = await new Promise((resolveDur) => {
        const proc = spawn(pythonPath, [scriptPath, "--get-duration", url]);
        let dur = "";
        proc.stdout.on("data", (d) => {
          dur += d.toString();
        });
        proc.on("close", () => {
          const parts = dur.trim().split(":").map(Number);
          let sec = 0;
          if (parts.length === 3) sec = parts[0] * 3600 + parts[1] * 60 + parts[2];
          else if (parts.length === 2) sec = parts[0] * 60 + parts[1];
          else if (parts.length === 1) sec = parts[0];
          resolveDur(sec);
        });
      });
    } catch {
      durationSec = 0;
    }
    const safeName = fileName ? fileName.replace(/[\\/:*?"<>|]/g, "_") : "video";
    const videoFile = path.resolve(outputFolder, safeName + "_video.mp4");
    const audioFile = path.resolve(outputFolder, safeName + "_audio.m4a");
    const finalFile = path.resolve(outputFolder, safeName + ".mp4");
    currentProcs.files = [videoFile, audioFile, finalFile];
    onProgress == null ? void 0 : onProgress({ phase: "video", percent: 0, message: "Downloading video stream..." });
    const videoProc = spawn(pythonPath, [scriptPath, "-f", "bestvideo", "-o", videoFile, url]);
    currentProcs.video = videoProc;
    videoProc.stdout.on("data", (data) => {
      const str = data.toString();
      const match = str.match(/\[download\]\s+(\d+\.\d+)%/);
      if (match) {
        onProgress == null ? void 0 : onProgress({ phase: "video", percent: parseFloat(match[1]), message: str });
      }
    });
    videoProc.stderr.on("data", (_data) => {
    });
    videoProc.on("close", (videoCode) => {
      if (videoCode !== 0) {
        return reject(new Error(`Video download failed with code ${videoCode}`));
      }
      onProgress == null ? void 0 : onProgress({ phase: "audio", percent: 0, message: "Downloading audio stream..." });
      const audioProc = spawn(pythonPath, [scriptPath, "-f", "bestaudio", "-o", audioFile, url]);
      currentProcs.audio = audioProc;
      audioProc.stdout.on("data", (data) => {
        const str = data.toString();
        const match = str.match(/\[download\]\s+(\d+\.\d+)%/);
        if (match) {
          onProgress == null ? void 0 : onProgress({ phase: "audio", percent: parseFloat(match[1]), message: str });
        }
      });
      audioProc.stderr.on("data", (_data) => {
      });
      audioProc.on("close", (audioCode) => {
        if (audioCode !== 0) {
          return reject(new Error(`Audio download failed with code ${audioCode}`));
        }
        onProgress == null ? void 0 : onProgress({ phase: "merge", percent: 0, message: "Merging video and audio...", mergeDuration: durationSec ? String(durationSec) : void 0 });
        const ffmpegProc = spawn(ffmpegPath, [
          "-i",
          videoFile,
          "-i",
          audioFile,
          "-c:v",
          "copy",
          "-c:a",
          "aac",
          "-shortest",
          "-y",
          finalFile
        ]);
        currentProcs.ffmpeg = ffmpegProc;
        let mergePercent = 0;
        const mergeStart = Date.now();
        ffmpegProc.stderr.on("data", (data) => {
          const str = data.toString();
          const timeMatch = str.match(/time=([\d:.]+)/);
          let curSec = 0;
          if (timeMatch) {
            const t = timeMatch[1].split(":").map(Number);
            if (t.length === 3) curSec = t[0] * 3600 + t[1] * 60 + t[2];
            else if (t.length === 2) curSec = t[0] * 60 + t[1];
            else if (t.length === 1) curSec = t[0];
            mergePercent = durationSec ? Math.min(curSec / durationSec * 100, 100) : Math.min(mergePercent + 2, 100);
            onProgress == null ? void 0 : onProgress({ phase: "merge", percent: mergePercent, message: str, mergeTime: String(curSec), mergeDuration: String(durationSec), mergeElapsed: Math.floor((Date.now() - mergeStart) / 1e3) });
          }
        });
        ffmpegProc.on("close", (ffmpegCode) => {
          if (ffmpegCode === 0) {
            onProgress == null ? void 0 : onProgress({ phase: "done", percent: 100, message: "Merge complete!" });
            try {
              fs.unlinkSync(videoFile);
              fs.unlinkSync(audioFile);
            } catch (err) {
            }
            resolve();
          } else {
            reject(new Error(`FFmpeg merge failed with code ${ffmpegCode}`));
          }
        });
      });
    });
  });
}
const userDataPath = process.env.APPDATA || process.env.HOME || process.env.USERPROFILE || ".";
const settingsFile = path.join(userDataPath, "idm-clone-user-settings.json");
function saveSettings(settings) {
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), "utf-8");
}
function loadSettings() {
  try {
    return JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
  } catch {
    return {};
  }
}
ipcMain.handle("download-video", async (event, { url, outputFolder, fileName }) => {
  if (outputFolder) saveSettings({ outputFolder });
  return new Promise((resolve, reject) => {
    downloadWithYtDlpAndMerge(
      url,
      outputFolder,
      (progress) => {
        event.sender.send("download-progress", progress);
      },
      fileName
    ).then(() => resolve("done")).catch((err) => reject(err));
  });
});
ipcMain.handle("cancel-download", () => {
  cancelDownload();
  return "cancelled";
});
ipcMain.handle("get-title", async (_event, url) => {
  return await getTitle(url);
});
ipcMain.handle("select-folder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });
  if (result.canceled || !result.filePaths[0]) return null;
  saveSettings({ outputFolder: result.filePaths[0] });
  return result.filePaths[0];
});
ipcMain.handle("get-settings", async () => {
  return loadSettings();
});
const __dirname = path$1.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path$1.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$1.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$1.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$1.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path$1.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path$1.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$1.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
