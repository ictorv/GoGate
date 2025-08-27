import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const courses = [
  { id: "calc-opt", title: "Calculus and Optimization" },

];

export default function Home() {
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
