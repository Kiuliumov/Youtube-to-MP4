import YouTubeEmbedder from "./components/YoutubeEmbedder";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-50 backdrop-blur bg-gradient-to-r from-purple-700/70 to-pink-600/70 border-b border-gray-800 py-4 px-6 flex justify-center">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-md">
          🎥 YT Video Downloader
        </h1>
      </header>

      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 bg-gradient-to-b from-purple-900 via-gray-900 to-gray-950 flex-grow">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-lg">
          Preview & Download Videos
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mb-12">
          Paste any YouTube link and instantly download the video.  

        </p>

        <YouTubeEmbedder />
      </section>

      <section
        id="features"
        className="px-6 py-20 bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800 text-center"
      >
        <h3 className="text-3xl font-semibold mb-10 text-white">
          Why use this tool?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform bg-gradient-to-tr from-pink-500 to-red-600">
            <h4 className="text-xl font-bold mb-3 text-white">🔍 Quick Preview</h4>
            <p className="text-white/90">
              Instantly see your YouTube video without leaving the page.
            </p>
          </div>
          <div className="p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform bg-gradient-to-tr from-purple-500 to-indigo-600">
            <h4 className="text-xl font-bold mb-3 text-white">🎨 Clean UI</h4>
            <p className="text-white/90">
              Dark, modern design with smooth interactions.
            </p>
          </div>
          <div className="p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform bg-gradient-to-tr from-blue-500 to-cyan-500">
            <h4 className="text-xl font-bold mb-3 text-white">⬇️ Download Links</h4>
            <p className="text-white/90">
              Works with direct MP4 links for easy downloads.
            </p>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="px-6 py-20 text-center bg-gradient-to-b from-gray-950 to-gray-900 border-t border-gray-800"
      >
        <h3 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          About This Project
        </h3>
        <p className="max-w-2xl mx-auto text-gray-300 leading-relaxed">
          This project is built with React + TailwindCSS.  
          It’s a lightweight tool to preview YouTube videos and open direct MP4
          download links. Designed with a colorful, modern aesthetic for a fun,
          easy experience.
        </p>
      </section>

      <footer
        id="footer"
        className="bg-gradient-to-r from-purple-700 to-pink-600 py-6 text-center text-white"
      >
        <p className="font-medium">
          Made by The Cantina © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
