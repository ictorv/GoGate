import React from "react";
import YoutubeEmbed from "./YoutubeEmbed";

export default function CourseContent({ item }) {
  switch (item.type) {
    case "video":
      return (
        <div style={{ flexGrow: 1, padding: 20 }}>
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

    case "externalLinksList":
      return (
        <div style={{ flexGrow: 1, padding: 20, maxWidth: 650 }}>
          <h2>{item.title}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
            {item.content.map(({ label, url, slideUrl }) => (
              <div
                key={url}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "linear-gradient(135deg, #60a5fa, #a855f7)",
                  borderRadius: "24px",
                  padding: "12px 24px",
                  boxShadow: "0 4px 15px rgba(168, 85, 247, 0.5)",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 6px 25px rgba(168, 85, 247, 0.75)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(168, 85, 247, 0.5)";
                }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "1rem",
                    textDecoration: "none",
                    flexGrow: 1,
                    marginRight: 16,
                  }}
                >
                  {label}
                </a>
                {slideUrl && (
                  <a
                    href={slideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.3)",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#fff",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.5)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)";
                    }}
                    title="View Related Slides"
                  >
                    Lecture Slides
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <div style={{ padding: 20 }}>Unsupported content type.</div>;
  }
}
