

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
let currentProcs: { video?: any; audio?: any; ffmpeg?: any; files?: string[] } = {};

// Helper để lấy đúng đường dẫn tới thư mục unpacked
function getUnpackedPath(...segments: string[]) {
  // Nếu đang chạy dev (NODE_ENV=development hoặc process.defaultApp), trả về từ project root
  if (process.env.NODE_ENV === 'development' || process.defaultApp) {
    return path.join(process.cwd(), ...segments);
  }
  // Khi build, resourcesPath là .../resources
  const base = process.resourcesPath;
  const unpacked = path.join(base, 'app.asar.unpacked');
  if (fs.existsSync(unpacked)) {
    return path.join(unpacked, ...segments);
  }
  return path.join(base, ...segments);
}

export function cancelDownload() {
  if (currentProcs.video) currentProcs.video.kill('SIGKILL');
  if (currentProcs.audio) currentProcs.audio.kill('SIGKILL');
  if (currentProcs.ffmpeg) currentProcs.ffmpeg.kill('SIGKILL');
  // Remove temp files
  if (currentProcs.files) {
    for (const f of currentProcs.files) {
      try { fs.existsSync(f) && fs.unlinkSync(f); } catch (e) {}
    }
  }
  currentProcs = {};
}

export function getTitle(url: string): Promise<string> {
  return new Promise((resolve) => {
    const pythonPath = getUnpackedPath('python', "python.exe");
    const scriptPath = getUnpackedPath('python', 'yt-dlp.py');
    const proc = spawn(pythonPath, [scriptPath, '--get-title', url]);
    let title = '';
    proc.stdout.on('data', (d: Buffer) => { title += d.toString(); });
    proc.on('close', (_code: number) => {
      resolve(title.trim()); // Nếu lỗi thì trả về chuỗi rỗng
    });
  });
}

export function getThumb(
  url: string,
  outputFolder = './downloads',
  fileName?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const pythonPath = getUnpackedPath('python', "python.exe");
    const scriptPath = getUnpackedPath('python', 'yt-dlp.py');

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    const safeName = fileName
      ? fileName.replace(/[\\/:*?"<>|]/g, '_')
      : 'thumbnail';

    const thumbPath = path.resolve(outputFolder, safeName + '.jpg');

    // Gọi yt-dlp để lấy thumbnail URL
    const proc = spawn(pythonPath, [scriptPath, '--get-thumbnail', url]);
    let thumbUrl = '';
    let errorOutput = '';

    proc.stdout.on('data', (d: Buffer) => {
      thumbUrl += d.toString();
    });

    proc.stderr.on('data', (err: Buffer) => {
      errorOutput += err.toString();
    });

    proc.on('close', async (code: number) => {
      thumbUrl = thumbUrl.trim();
      if (code !== 0 || !thumbUrl) {
        return reject(
          new Error(`Failed to get thumbnail. ${errorOutput || 'No output received.'}`)
        );
      }

      try {
        // Tải thumbnail từ URL và lưu vào file
        const https = await import('https');
        const fileStream = fs.createWriteStream(thumbPath);
        https.get(thumbUrl, (response) => {
          if (response.statusCode !== 200) {
            return reject(new Error(`Failed to download thumbnail. HTTP ${response.statusCode}`));
          }
          response.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve(thumbPath); // Trả về đường dẫn file đã lưu
          });
        }).on('error', (err) => {
          fs.existsSync(thumbPath) && fs.unlinkSync(thumbPath);
          reject(err);
        });
      } catch (err) {
        reject(err);
      }
    });
  });
}


export function downloadWithYtDlpAndMerge(
  url: string,
  outputFolder = './downloads',
  onProgress?: (progress: { phase: string; percent?: number; message?: string; mergeTime?: string; mergeDuration?: string; mergeElapsed?: number }) => void,
  fileName?: string
) {
  return new Promise<void>( async (resolve, reject) => {
    const pythonPath = getUnpackedPath('python', "python.exe");
    const scriptPath = getUnpackedPath('python', 'yt-dlp.py');
    const ffmpegPath = getUnpackedPath('ffmpeg', 'bin', 'ffmpeg.exe');

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    // Lấy duration video (giây)
    let durationSec = 0;
    try {
      durationSec = await new Promise<number>((resolveDur) => {
        const proc = spawn(pythonPath, [scriptPath, '--get-duration', url]);
        let dur = '';
        proc.stdout.on('data', (d: Buffer) => { dur += d.toString(); });
        proc.on('close', () => {
          // yt-dlp trả về dạng HH:MM:SS
          const parts = dur.trim().split(':').map(Number);
          let sec = 0;
          if (parts.length === 3) sec = parts[0]*3600 + parts[1]*60 + parts[2];
          else if (parts.length === 2) sec = parts[0]*60 + parts[1];
          else if (parts.length === 1) sec = parts[0];
          resolveDur(sec);
        });
      });
    } catch { durationSec = 0; }

    const safeName = fileName ? fileName.replace(/[\\/:*?"<>|]/g, '_') : 'video';
    const videoFile = path.resolve(outputFolder, safeName + '_video.mp4');
    const audioFile = path.resolve(outputFolder, safeName + '_audio.m4a');
    const finalFile = path.resolve(outputFolder, safeName + '.mp4');
    currentProcs.files = [videoFile, audioFile, finalFile];

    onProgress?.({ phase: 'video', percent: 0, message: 'Downloading video stream...' });
    const videoProc = spawn(pythonPath, [scriptPath, '-f', 'bestvideo', '-o', videoFile, url]);
    currentProcs.video = videoProc;

    videoProc.stdout.on('data', (data: Buffer) => {
      const str = data.toString();
      const match = str.match(/\[download\]\s+(\d+\.\d+)%/);
      if (match) {
        onProgress?.({ phase: 'video', percent: parseFloat(match[1]), message: str });
      }
    });
    videoProc.stderr.on('data', (_data: Buffer) => {});

    videoProc.on('close', (videoCode: number) => {
      if (videoCode !== 0) {
        return reject(new Error(`Video download failed with code ${videoCode}`));
      }

      onProgress?.({ phase: 'audio', percent: 0, message: 'Downloading audio stream...' });
      const audioProc = spawn(pythonPath, [scriptPath, '-f', 'bestaudio', '-o', audioFile, url]);
      currentProcs.audio = audioProc;

      audioProc.stdout.on('data', (data: Buffer) => {
        const str = data.toString();
        const match = str.match(/\[download\]\s+(\d+\.\d+)%/);
        if (match) {
          onProgress?.({ phase: 'audio', percent: parseFloat(match[1]), message: str });
        }
      });
      audioProc.stderr.on('data', (_data: Buffer) => {});

      audioProc.on('close', (audioCode: number) => {
        if (audioCode !== 0) {
          return reject(new Error(`Audio download failed with code ${audioCode}`));
        }

        onProgress?.({ phase: 'merge', percent: 0, message: 'Merging video and audio...', mergeDuration: durationSec ? String(durationSec) : undefined });
        const ffmpegProc = spawn(ffmpegPath, [
          '-i', videoFile,
          '-i', audioFile,
          '-c:v', 'copy',
          '-c:a', 'aac',
          '-shortest',
          '-y',
          finalFile
        ]);
        currentProcs.ffmpeg = ffmpegProc;

        let mergePercent = 0;
        const mergeStart = Date.now();
        ffmpegProc.stderr.on('data', (data: Buffer) => {
          const str = data.toString();
          // Parse ffmpeg time progress
          const timeMatch = str.match(/time=([\d:.]+)/);
          let curSec = 0;
          if (timeMatch) {
            const t = timeMatch[1].split(':').map(Number);
            if (t.length === 3) curSec = t[0]*3600 + t[1]*60 + t[2];
            else if (t.length === 2) curSec = t[0]*60 + t[1];
            else if (t.length === 1) curSec = t[0];
            mergePercent = durationSec ? Math.min((curSec/durationSec)*100, 100) : Math.min(mergePercent+2,100);
            onProgress?.({ phase: 'merge', percent: mergePercent, message: str, mergeTime: String(curSec), mergeDuration: String(durationSec), mergeElapsed: Math.floor((Date.now()-mergeStart)/1000) });
          }
        });

        ffmpegProc.on('close', (ffmpegCode: number) => {
          if (ffmpegCode === 0) {
            onProgress?.({ phase: 'done', percent: 100, message: 'Merge complete!' });
            try {
              fs.unlinkSync(videoFile);
              fs.unlinkSync(audioFile);
            } catch (err) {
              // ignore
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
