import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { apiUrl } from "./config";

const courses = [
  { id: "calc-opt", title: "Calculus and Optimization" },
];

export default function Home() {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
      fetch(`${apiUrl}/api/location`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
        }),
      });
    });     
    }
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-header">DA</h1>
      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.id} className="course-item">
            <Link to={`/course/${course.id}`} style={{ color: "inherit", textDecoration: "none" }}>
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
