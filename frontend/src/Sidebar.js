import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = ({ modules, selectedId, onSelect, onGoHome }) => {
  const [openModules, setOpenModules] = useState(() =>
    Object.keys(modules).reduce((acc, key) => {
      acc[key] = true; 
      return acc;
    }, {})
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Lectures</h3>
      </div>

      <div className="sidebar-content">
        {Object.entries(modules).map(([key, module]) => (
          <div key={key} className="module-section">
            <div
              className="module-header"
              onClick={() =>
                setOpenModules((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
              style={{
                cursor: "pointer",
                userSelect: "none",
                padding: "12px 20px",
                fontWeight: "600",
                fontSize: "1.1rem",
                color: "#ffffff",
                borderBottom: "1.5px solid rgba(255, 255, 255, 0.2)",
                marginBottom: "10px",
                borderRadius: "4px",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {module.title}
            </div>

            {openModules[key] &&
              module.items.map((item) => (
                <div
                  key={item.embedId || item.title}
                  onClick={() => onSelect(item.embedId || item.title)}
                  className={`sidebar-item ${
                    (item.embedId || item.title) === selectedId ? "active" : ""
                  }`}
                >
                  <div className="sidebar-item-text">{item.title}</div>
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button className="go-home-btn" onClick={onGoHome}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
