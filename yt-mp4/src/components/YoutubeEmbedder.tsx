import { useState, type SyntheticEvent } from "react";

export default function YouTubeEmbedder() {
  const [url, setUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const videoIdParam = new URL(url).searchParams.get("v");
      if (videoIdParam) {
        setVideoId(videoIdParam);
        setEmbedUrl(`https://www.youtube.com/embed/${videoIdParam}`);
      } else if (url.includes("youtu.be/")) {
        // Handle short links
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

  return (
    <div className="flex flex-col items-center bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Preview a YouTube Video</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6 w-full">
        <input
          type="text"
          placeholder="Paste YouTube link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow border border-gray-700 bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Preview
        </button>
      </form>

      {embedUrl && (
        <div className="flex flex-col items-center gap-4">
          <iframe
            width="560"
            height="315"
            src={embedUrl}
            title="YouTube video player"
            className="rounded-xl border border-gray-700"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
