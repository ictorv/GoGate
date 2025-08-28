import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import CourseContent from "./CourseContent";
import { coursePlaylist } from "./data/coursePlaylist";

export default function Course() {
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get modules
  const modules = useMemo(() => coursePlaylist[courseId] || {}, [courseId]);

  // Flatten for easier selection
  const flatPlaylist = useMemo(
    () =>
      Object.entries(modules).flatMap(([moduleKey, module]) =>
        module.items.map((item) => ({ ...item, moduleKey }))
      ),
    [modules]
  );

  const embedIdOrTitleFromUrl = searchParams.get("item");

  const [selectedIndex, setSelectedIndex] = useState(() => {
    const idx = flatPlaylist.findIndex(
      (item) =>
        (item.type === "video" && item.embedId === embedIdOrTitleFromUrl) ||
        item.title === embedIdOrTitleFromUrl
    );
    return idx >= 0 ? idx : 0;
  });

  useEffect(() => {
    if (flatPlaylist[selectedIndex]) {
      const currentItem = flatPlaylist[selectedIndex];
      const queryParam =
        currentItem.type === "video" ? currentItem.embedId : currentItem.title;
      setSearchParams({ item: queryParam });
    }
  }, [selectedIndex, setSearchParams, flatPlaylist]);

  if (!flatPlaylist.length) {
    return (
      <div style={{ padding: 20 }}>
        Course not found or no content available.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        modules={modules}
        selectedId={
          flatPlaylist[selectedIndex].embedId || flatPlaylist[selectedIndex].title
        }
        onSelect={(id) => {
          const idx = flatPlaylist.findIndex(
            (item) => item.embedId === id || item.title === id
          );
          if (idx >= 0) setSelectedIndex(idx);
        }}
        onGoHome={() => navigate("/")}
      />
      <CourseContent item={flatPlaylist[selectedIndex]} />
    </div>
  );
}
