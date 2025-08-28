const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, "locations.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to open database", err.message);
    process.exit(1);
  }
  console.log("Connected to SQLite database", dbPath);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      timestamp TEXT NOT NULL,
      ip TEXT NOT NULL,
      user_agent TEXT,
      platform TEXT,
      screen_width INTEGER,
      screen_height INTEGER,
      timezone TEXT,
      language TEXT
    )
  `);
});

app.post("/api/location", (req, res) => {
  const {
    latitude,
    longitude,
    timestamp,
    userAgent,
    platform,
    screenWidth,
    screenHeight,
    timezone,
    language,
  } = req.body;

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "unknown";

  if (!latitude || !longitude) {
    return res.status(400).json({ success: false, error: "Missing latitude or longitude" });
  }

  const ts = timestamp || new Date().toISOString();

  const sql = `
    INSERT INTO locations 
    (latitude, longitude, timestamp, ip, user_agent, platform, screen_width, screen_height, timezone, language) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [latitude, longitude, ts, ip, userAgent, platform, screenWidth, screenHeight, timezone, language],
    function (err) {
      if (err) {
        console.error("DB Insert error:", err.message);
        return res.status(500).json({ success: false, error: "Database error" });
      }
      res.json({ success: true, insertedId: this.lastID });
    }
  );
});

app.get("/api/location", (req, res) => {
  db.all(`SELECT * FROM locations ORDER BY timestamp DESC`, (err, rows) => {
    if (err) {
      console.error("DB Select error:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
