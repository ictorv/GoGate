import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import YoutubeEmbed from "./YoutubeEmbed";

const courseVideos = {
  "calc-opt": [
    {
      title: "1. Finding Limit of a function",
      embedId: "N7d8Ccdk9sk",
      notesUrl:
        "https://drive.google.com/file/d/1adDgoR7Z1RCpYJu0ZXpmYBIkmImU_X87/view",
    },
    {
      title: "2. Methods to Evaluate the Limit of a function",
      embedId: "3GydMIhdWMs",
      notesUrl:
        "https://drive.google.com/uc?export=download&id=1nsH2bY73JoUHYuhBYLcquAdNHzWKyyuU",
    },
    {
      title: "3. Limits LHopital's rule and Other Indeterminate forms",
      embedId: "kYSra1saopw",
      notesUrl:
        "https://drive.google.com/uc?export=download&id=1CFun0sohScCCt_oDKs5Iz7dpWZIDYENV",
    },
  ],
};

export default function Course() {
  const { courseId } = useParams();
  const videos = useMemo(() => {
    return courseVideos[courseId] || [];
  }, [courseId]);

  const [searchParams, setSearchParams] = useSearchParams();
  const embedIdFromUrl = searchParams.get("video");

  const [selectedIndex, setSelectedIndex] = useState(() =>
    videos.findIndex((v) => v.embedId === embedIdFromUrl) >= 0
      ? videos.findIndex((v) => v.embedId === embedIdFromUrl)
      : 0
  );

  const navigate = useNavigate();

  // Update URL query parameter when selectedIndex changes
  useEffect(() => {
    if (videos[selectedIndex]) {
      setSearchParams({ video: videos[selectedIndex].embedId });
    }
  }, [selectedIndex, setSearchParams, videos]);

  if (!videos.length) {
    return <div style={{ padding: 20 }}>Course not found or no videos available.</div>;
  }

  const selectedVideo = videos[selectedIndex];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
          <Sidebar
        videos={videos}
        selectedId={selectedVideo.embedId}
        onSelect={(embedId) => {
          const idx = videos.findIndex((v) => v.embedId === embedId);
          if (idx >= 0) setSelectedIndex(idx);
        }}
        onGoHome={() => navigate("/")} // Pass Go to Homepage handler here
      />
      <main style={{ flexGrow: 1, padding: "20px", overflowY: "auto" }}>
        {/* Button to redirect to homepage */}
        

        {/* YouTube video */}
        <YoutubeEmbed embedId={selectedVideo.embedId} />

        {/* Link to open PDF lecture notes in new tab */}
        {selectedVideo.notesUrl && (
          <div style={{ marginTop: 30 }}>
            <h3>Lecture Notes</h3>
            <a
        href={selectedVideo.notesUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="lecture-notes-button"
        >
        Open Lecture Notes (PDF)
        </a>

          </div>
        )}
      </main>
    </div>
  );
}
