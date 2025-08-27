import React from "react";
import './sidebar.css'; // Your provided CSS file

const Sidebar = ({ videos, selectedId, onSelect, onGoHome }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Lectures</h3>
      </div>
      <div className="sidebar-content">
        {videos.map(({ title, embedId }) => (
          <div
            key={embedId}
            onClick={() => onSelect(embedId)}
            className={`sidebar-item ${embedId === selectedId ? 'active' : ''}`}
          >
            <div className="sidebar-item-content">
              <div className="sidebar-item-icon"></div>
              <div className="sidebar-item-text">{title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Button fixed at bottom */}
      <div className="sidebar-bottom">
        <button className="go-home-btn" onClick={onGoHome}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
