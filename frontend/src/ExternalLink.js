import React from "react";

export default function ExternalLink({ item }) {
  return (
    <div style={{ flexGrow: 1, padding: 20 }}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff" }}>
        Open External Resource
      </a>
    </div>
  );
}
