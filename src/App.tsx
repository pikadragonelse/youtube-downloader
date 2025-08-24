declare global {
  interface Window {
    electronAPI: {
      downloadVideo: (opts: { url: string; outputFolder: string; fileName: string }) => Promise<string>;
      cancelDownload: () => Promise<void>;
      getTitle: (url: string) => Promise<string>;
      selectFolder: () => Promise<string | null>;
      getSettings: () => Promise<{ outputFolder?: string }>;
      getThumb: (opts: { url: string; outputFolder?: string; fileName?: string }) => Promise<string>;
      onProgress: (cb: (progress: { phase: string; percent?: number; message?: string; mergeTime?: string; mergeDuration?: string; mergeElapsed?: number }) => void) => void;
    };
  }
}

import { useState, useEffect } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const [phase, setPhase] = useState<string>("");
  const [thumb, setThumb] = useState<string>("");
  const [outputFolder, setOutputFolder] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [downloading, setDownloading] = useState(false);
  const [gettingTitle, setGettingTitle] = useState(false);
  const [mergeTime, setMergeTime] = useState<string>("");
  const [mergeDuration, setMergeDuration] = useState<string>("");
  const [mergeElapsed, setMergeElapsed] = useState<number>(0);
  const [autoDownloadThumb, setAutoDownloadThumb] = useState<boolean>(true); // Checkbox state

  // Load outputFolder from settings on mount
  useEffect(() => {
    window.electronAPI.getSettings().then(s => {
      if (s.outputFolder) setOutputFolder(s.outputFolder);
    });
  }, []);

  // Extract YouTube video ID from URL
  function getYouTubeId(link: string): string | null {
    const match = link.match(/(?:v=|youtu.be\/|embed\/|shorts\/)([\w-]{11})/);
    return match ? match[1] : null;
  }

  // Listen for progress events
  useEffect(() => {
    window.electronAPI.onProgress((p) => {
      setPhase(p.phase);
      setProgress(p.percent ?? 0);
      setStatus(p.message || "");
      if (p.phase === 'merge') {
        setMergeTime(p.mergeTime || "");
        setMergeDuration(p.mergeDuration || "");
        setMergeElapsed(p.mergeElapsed || 0);
      } else {
        setMergeTime("");
        setMergeDuration("");
        setMergeElapsed(0);
      }
    });
  }, []);

  // Auto-update thumbnail and title
  useEffect(() => {
    const id = getYouTubeId(url);
    if (id) {
      setThumb(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
    } else {
      setThumb("");
    }
    if (url && !fileName) {
      setGettingTitle(true);
      window.electronAPI.getTitle(url).then(title => {
        if (!fileName) setFileName(title);
      }).finally(() => setGettingTitle(false));
    }
  }, [url]);

  const handleSelectFolder = async () => {
    const folder = await window.electronAPI.selectFolder();
    if (folder) setOutputFolder(folder);
  };

  const handleDownload = async () => {
    if (!url || !outputFolder || !fileName) {
      setStatus("Please enter URL, select folder, and wait for file name.");
      return;
    }
    setStatus("Downloading...");
    setProgress(0);
    setPhase("");
    setDownloading(true);

    try {
      // Nếu autoDownloadThumb được bật, tải thumbnail trước
      if (autoDownloadThumb) {
        await window.electronAPI.getThumb({ url, outputFolder, fileName });
        setStatus("Thumbnail downloaded successfully.");
      }

      await window.electronAPI.downloadVideo({ url, outputFolder, fileName });
      setStatus("Done! Check your folder.");
      setProgress(100);
      setPhase("done");
    } catch (e) {
      setStatus("Download cancelled or failed.");
    }

    setDownloading(false);
  };

  const handleCancel = async () => {
    await window.electronAPI.cancelDownload();
    setStatus("Download cancelled.");
    setDownloading(false);
    setProgress(0);
    setPhase("");
    setMergeTime("");
    setMergeDuration("");
    setMergeElapsed(0);
  };

  const handleDownloadThumbOnly = async () => {
    if (!url || !outputFolder || !fileName) {
      setStatus("Please enter URL, select folder, and wait for file name.");
      return;
    }
    setStatus("Downloading thumbnail...");
    try {
      const thumbPath = await window.electronAPI.getThumb({ url, outputFolder, fileName });
      setStatus(`Thumbnail saved at: ${thumbPath}`);
    } catch (e) {
      setStatus("Failed to download thumbnail.");
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">YouTube Downloader</h1>
      <div className="mb-2">
        <input
          className={`border px-2 py-1 w-96 ${
            downloading || gettingTitle ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
          }`}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL..."
          disabled={downloading || gettingTitle}
        />
      </div>

      <div className="mb-2">
        <button
          onClick={handleSelectFolder}
          className={`px-3 py-1 rounded mr-2 ${
            downloading || gettingTitle
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-300 text-black cursor-pointer"
          }`}
          disabled={downloading || gettingTitle}
        >
          {outputFolder ? 'Change Folder' : 'Select Folder'}
        </button>
        {outputFolder && <span className="text-sm text-gray-700">{outputFolder}</span>}
      </div>

      <div className="mb-2">
        <input
          className="border px-2 py-1 w-96"
          type="text"
          value={fileName}
          onChange={e => setFileName(e.target.value)}
          placeholder="File name..."
          disabled={downloading || gettingTitle}
        />
        {gettingTitle && <span className="ml-2 text-blue-500">Loading title...</span>}
      </div>

      <div className="mb-2">
        <button
          onClick={handleDownload}
          className={`px-4 py-1 rounded mr-2 ${
            downloading || gettingTitle
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-blue-500 text-white cursor-pointer"
          }`}
          disabled={downloading || gettingTitle}
        >
          Download Video
        </button>

        {downloading && (
          <button
            onClick={handleCancel}
            className="px-4 py-1 bg-red-500 text-white rounded cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>

      {thumb && (
        <div className="flex flex-col items-center mt-4">
          <img src={thumb} alt="thumbnail" className="rounded shadow w-64 h-36 object-cover" />
            <button
            onClick={handleDownloadThumbOnly}
            className={`mt-2 px-3 py-1 rounded ${
              downloading
              ? "bg-green-300 text-white cursor-not-allowed opacity-60"
              : "bg-green-500 text-white cursor-pointer"
            }`}
            disabled={downloading}
            >
            Download Thumbnail
            </button>
            <label
            className={`mt-2 flex items-center space-x-2 cursor-pointer ${
              downloading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            >
            <input
              type="checkbox"
              checked={autoDownloadThumb}
              onChange={() => setAutoDownloadThumb(!autoDownloadThumb)}
              disabled={downloading}
              className={`form-checkbox h-4 w-4 ${
              downloading ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
            <span className="text-sm text-gray-700">Auto download thumbnail with video</span>
            </label>
        </div>
      )}

      <div className="mt-4">
        {phase && <div className="mb-2 font-semibold">{phase.toUpperCase()}</div>}
        <div className="w-96 mx-auto bg-gray-200 rounded h-4 overflow-hidden">
          <div
            className="bg-blue-500 h-4 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {phase === 'merge' && mergeDuration && (
          <div className="mt-2 text-sm text-gray-700">
            Merge: {mergeTime || '0'}s / {mergeDuration}s
            {mergeElapsed > 0 && (
              <span className="ml-4">Elapsed: {mergeElapsed}s</span>
            )}
          </div>
        )}
        <div className="mt-2 text-sm text-gray-700">{status}</div>
      </div>
    </div>
  );
}
