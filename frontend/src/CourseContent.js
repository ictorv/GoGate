import React from "react";
import YoutubeEmbed from "./YoutubeEmbed";

export default function CourseContent({ item }) {
  switch (item.type) {
    case "video":
      return (
        <div style={{ flexGrow: 1, padding: 20 }}>
          {/* Video title is NOT rendered */}
          <YoutubeEmbed embedId={item.embedId} />
          {item.notesUrl && (
            <div style={{ marginTop: 20 }}>
              <a
                href={item.notesUrl}
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

    case "externalLink":
      return (
        <div style={{ flexGrow: 1, padding: 20 }}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff" }}>
            Open External Resource
          </a>
        </div>
      );

    case "longText":
      return (
        <div style={{ flexGrow: 1, padding: 20, whiteSpace: "pre-wrap" }}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      );

    default:
      return <div style={{ padding: 20 }}>Unsupported content type.</div>;
  }
}
