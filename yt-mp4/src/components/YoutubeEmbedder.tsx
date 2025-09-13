import { useState, type SyntheticEvent } from "react";

export default function YouTubeEmbedder() {
  const [url, setUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const videoId = new URL(url).searchParams.get("v");
      if (videoId) {
        setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
      } else {
        alert("Invalid YouTube link. Please use a full video URL.");
      }
    } catch {
      alert("Please enter a valid URL.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">YouTube Video Preview</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Paste YouTube link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded-lg px-3 py-2 w-80"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Preview
        </button>
      </form>

      {embedUrl && (
        <div className="w-full flex justify-center">
          <iframe
            width="560"
            height="315"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
