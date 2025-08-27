import React, { useState } from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({
  embedId,
  title = "YouTube video player",
  aspectRatio = "16:9",
  autoplay = false,
  start = 0,
  allowFullscreen = true,
  className = "",
}) => {
  const [hasError, setHasError] = useState(false);

  // Calculate aspect ratio padding percentage
  const [width, height] = aspectRatio.split(":").map(Number);
  const paddingBottom = `${(height / width) * 100}%`;

  if (hasError) {
    return (
      <div
        style={{
          position: "relative",
          padding: "1rem",
          background: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
          borderRadius: "6px",
          maxWidth: "560px",
          margin: "1rem auto",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        <strong>⚠️ Oops!</strong> Video failed to load.
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        paddingBottom,
        height: 0,
        overflow: "hidden",
        borderRadius: "8px",
        background: "#000",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${embedId}?autoplay=${autoplay ? 1 : 0
          }&start=${start}&rel=0`}
        frameBorder="0"
        loading="lazy"
        onError={() => setHasError(true)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
        allowFullScreen={allowFullscreen}
        title={title}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  title: PropTypes.string,
  aspectRatio: PropTypes.string, // e.g. "16:9" or "4:3"
  autoplay: PropTypes.bool,
  start: PropTypes.number,
  allowFullscreen: PropTypes.bool,
  className: PropTypes.string,
};

export default YoutubeEmbed;
