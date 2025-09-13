import { useState, useEffect } from "react";
import YouTubeEmbedder from "./components/YoutubeEmbedder";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for theme preference
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <header className="sticky top-0 z-50 backdrop-blur bg-gradient-to-r from-purple-700/70 to-pink-600/70 border-b border-gray-800 py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-md animate-pulse">
          🎥 YT Video Downloader
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform"
        >
          {darkMode ? "🌞": "🌙 "}
        </button>
      </header>

      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 bg-gradient-to-b from-purple-900 via-gray-900 to-gray-950 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 flex-grow transition-colors duration-500">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-lg animate-gradient-x">
          Preview & Download Videos
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-12">
          Paste any YouTube link and instantly download the video in your preferred quality. No ads, no distractions, just pure download magic! ✨
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl">
          <div className="bg-gray-200/20 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-pink-400">⚡ Fast & Easy</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Download videos in seconds. No sign-ups required.
            </p>
          </div>
          <div className="bg-gray-200/20 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-purple-400">📺 Multiple Qualities</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Choose from 360p, 480p, 720p, or 1080p depending on your needs.
            </p>
          </div>
          <div className="bg-gray-200/20 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-blue-400">🔗 Instant Preview</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Watch a preview of the video before downloading.
            </p>
          </div>
        </div>

        <div className="w-full max-w-3xl">
          <YouTubeEmbedder />
        </div>
      </section>

      <footer className="bg-gradient-to-r from-purple-700 to-pink-600 dark:from-gray-800 dark:to-gray-900 py-6 text-center text-white shadow-inner transition-colors duration-500">
        <p className="font-medium mb-2">Made by The Cantina © {new Date().getFullYear()}</p>
        <p className="text-sm text-gray-200 dark:text-gray-400">
          Want to support us? Share with friends or ⭐ us on GitHub!
        </p>
      </footer>
    </div>
  );
}

export default App;
