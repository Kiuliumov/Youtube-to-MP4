import { useState, useEffect } from "react";
import YouTubeEmbedder from "./components/YoutubeEmbedder";

const styles = {
  root: `min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 select-none`,
  header: `sticky top-0 z-50 backdrop-blur bg-gradient-to-r from-purple-300/70 to-pink-200/70 dark:from-purple-700/80 dark:to-pink-500/80 border-b border-gray-300 dark:border-gray-700 py-4 px-6 flex justify-between items-center shadow-md transition-colors duration-500`,
  headerTitle: `text-3xl font-extrabold text-gray-900 dark:text-white drop-shadow-sm animate-pulse`,
  darkModeButton: `bg-purple-500 dark:bg-pink-400 hover:bg-purple-400 dark:hover:bg-pink-500 text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition-transform`,
  section: `flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 bg-gradient-to-b from-purple-200 via-pink-200 to-indigo-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 flex-grow transition-colors duration-500`,
  sectionTitle: `text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 drop-shadow-sm`,
  sectionText: `text-lg text-gray-800 dark:text-gray-300 max-w-2xl mb-12`,
  cardGrid: `grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl`,
  card: `bg-white/90 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-sm hover:scale-105 transition-transform`,
  cardTitlePink: `text-xl font-semibold mb-2 text-pink-500 dark:text-pink-400`,
  cardTitlePurple: `text-xl font-semibold mb-2 text-purple-500 dark:text-purple-400`,
  cardTitleBlue: `text-xl font-semibold mb-2 text-blue-500 dark:text-blue-400`,
  cardText: `text-gray-800 dark:text-gray-300 text-sm`,
  embedWrapper: `w-full max-w-3xl`,
  footer: `bg-gradient-to-r from-purple-400 to-pink-300 dark:from-gray-800 dark:to-gray-900 py-6 text-center text-gray-900 dark:text-white shadow-inner transition-colors duration-500`,
  footerText: `font-medium mb-2`,
  footerSubText: `text-sm text-gray-700 dark:text-gray-400`,
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
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
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>🎥 YT Video Downloader</h1>
        <button onClick={() => setDarkMode(!darkMode)} className={styles.darkModeButton}>
          {darkMode ? "🌞" : "🌙"}
        </button>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Preview & Download Videos</h2>
        <p className={styles.sectionText}>
          Paste any YouTube link and instantly download the video in your preferred quality. No ads, no distractions, just pure download magic! ✨
        </p>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitlePink}>⚡ Fast & Easy</h3>
            <p className={styles.cardText}>Download videos in seconds. No sign-ups required.</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitlePurple}>📺 Multiple Qualities</h3>
            <p className={styles.cardText}>Choose from 360p, 480p, 720p, or 1080p depending on your needs.</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitleBlue}>🔗 Instant Preview</h3>
            <p className={styles.cardText}>Watch a preview of the video before downloading.</p>
          </div>
        </div>

        <div className={styles.embedWrapper}>
          <YouTubeEmbedder />
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>Made by The Cantina © {new Date().getFullYear()}</p>
        <p className={styles.footerSubText}>Want to support us? Share with friends or ⭐ us on GitHub!</p>
      </footer>
    </div>
  );
};

export default App;
