import { useState, type SyntheticEvent } from "react";

export default function YouTubeEmbedder() {
  const [url, setUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [quality, setQuality] = useState("720p");
  const API_URL = "http://127.0.0.1:5000/download";

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const videoIdParam = new URL(url).searchParams.get("v");
      if (videoIdParam) {
        setVideoId(videoIdParam);
        setEmbedUrl(`https://www.youtube.com/embed/${videoIdParam}`);
      } else if (url.includes("youtu.be/")) {
        const videoIdShort = url.split("youtu.be/")[1]?.split("?")[0];
        if (videoIdShort) {
          setVideoId(videoIdShort);
          setEmbedUrl(`https://www.youtube.com/embed/${videoIdShort}`);
        } else {
          alert("Invalid YouTube link.");
        }
      } else {
        alert("Invalid YouTube link. Please use a valid URL.");
      }
    } catch {
      alert("Please enter a valid URL.");
    }
  };

  const handleCancelPreview = () => {
    setEmbedUrl("");
    setVideoId("");
    setQuality("720p");
  };

  const handleDownload = () => {
    if (!videoId) return;

    const backendUrl = new URL(API_URL);
    backendUrl.searchParams.append("link", url);
    backendUrl.searchParams.append("quality", quality);

    window.open(backendUrl.toString(), "_blank");
  };

  return (
    <div className="flex flex-col items-center bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
        🎬 YouTube Preview & Download
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-8 w-full">
        <input
          type="text"
          placeholder="Paste YouTube link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-medium px-6 py-3 rounded-lg shadow transition-transform transform hover:scale-105"
        >
          Preview
        </button>
      </form>

      {embedUrl && (
        <div className="flex flex-col items-center gap-6 w-full">
          <iframe
            width="640"
            height="360"
            src={embedUrl}
            title="YouTube video player"
            className="rounded-xl border border-gray-300 shadow-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 w-full justify-center">
            <div className="flex items-center gap-2">
              <label htmlFor="quality" className="text-gray-700 font-medium">
                Quality:
              </label>
              <select
                id="quality"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="360p">360p</option>
                <option value="480p">480p</option>
                <option value="720p">720p (HD)</option>
                <option value="1080p">1080p (Full HD)</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-lg shadow transition-transform transform hover:scale-105"
              >
                ⬇️ Download ({quality})
              </button>

              <button
                onClick={handleCancelPreview}
                className="bg-red-500 hover:bg-red-400 text-white font-semibold px-6 py-3 rounded-lg shadow transition-transform transform hover:scale-105"
              >
                ❌ Cancel Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
