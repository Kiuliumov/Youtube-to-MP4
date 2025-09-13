import { useState, type SyntheticEvent } from "react";

export default function YouTubeEmbedder() {
  const [url, setUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [quality, setQuality] = useState("720p");
  const [format, setFormat] = useState("mp4"); 

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
    setFormat("mp4");
    setQuality("720p");
  };

  const handleDownload = () => {
    if (!videoId) return;

    const backendUrl = new URL("http://127.0.0.1:5000/download");
    backendUrl.searchParams.append("link", url);
    backendUrl.searchParams.append("quality", quality);
    backendUrl.searchParams.append("format", format);

    window.open(backendUrl.toString(), "_blank");
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-10 rounded-2xl shadow-2xl w-full max-w-3xl border border-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">
        🎬 YouTube Preview & Download
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-8 w-full">
        <input
          type="text"
          placeholder="Paste YouTube link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
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
            className="rounded-xl border border-gray-700 shadow-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <label htmlFor="quality" className="text-gray-300 font-medium">
                Quality:
              </label>
              <select
                id="quality"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="360p">360p</option>
                <option value="480p">480p</option>
                <option value="720p">720p (HD)</option>
                <option value="1080p">1080p (Full HD)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="format" className="text-gray-300 font-medium">
                Format:
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mp4">MP4</option>
                <option value="mp3">MP3</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                ⬇️ Download ({quality}, {format})
              </button>

              <button
                onClick={handleCancelPreview}
                className="bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
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
