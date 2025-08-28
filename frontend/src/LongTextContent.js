import React from "react";

export default function LongTextContent({ item }) {
  return (
    <div style={{ flexGrow: 1, padding: 20, whiteSpace: "pre-wrap" }}>
      <h2>{item.title}</h2>
      <p>{item.content}</p>
    </div>
  );
}
