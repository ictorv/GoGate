import React from "react";
import YoutubeEmbed from "./YoutubeEmbed";

export default function VideoPlayer({ video }) {
  if (!video) return null;

  return (
    <div style={{ flexGrow: 1, padding: 20, overflowY: "auto" }}>
      <h2>{video.title}</h2>
      <YoutubeEmbed embedId={video.embedId} />
      {video.notesUrl && (
        <div style={{ marginTop: 20 }}>
          <a
            href={video.notesUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#007bff", fontWeight: "bold", textDecoration: "none" }}
          >
            Open Lecture Notes (PDF)
          </a>
        </div>
      )}
    </div>
  );
}
