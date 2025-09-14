import express from "express";
import ytdl from "ytdl-core";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/download", async (req, res) => {
  const videoUrl = req.query.link;
  const quality = req.query.quality || "highest";

  if (!videoUrl) {
    return res.status(400).send("Missing video URL");
  }

  res.header("Content-Disposition", 'attachment; filename="video.mp4"');
  ytdl(videoUrl, { quality }).pipe(res);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});