import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import "./Resources.css";

const insightReadmeFiles = {
  "Calculus & Optimization": process.env.PUBLIC_URL + "/resources/calc.md",
  AI: process.env.PUBLIC_URL + "/resources/ai.md",
};

export default function Resources() {
  const [clickedSection, setClickedSection] = useState(() => localStorage.getItem("clickedSection") || null);
  const [pdfUrl, setPdfUrl] = useState(() => localStorage.getItem("pdfUrl") || null);
  const [insightContent, setInsightContent] = useState(null);
  const [loadingReadme, setLoadingReadme] = useState(false);

  useEffect(() => {
    const lastInsightKey = localStorage.getItem("insightKey");
    if (lastInsightKey && insightReadmeFiles[lastInsightKey]) {
      showInsight(insightReadmeFiles[lastInsightKey], lastInsightKey);
      setClickedSection("insights");
    }
  }, []);

  useEffect(() => {
    if (clickedSection) {
      localStorage.setItem("clickedSection", clickedSection);
    } else {
      localStorage.removeItem("clickedSection");
    }
  }, [clickedSection]);

  useEffect(() => {
    if (pdfUrl) {
      localStorage.setItem("pdfUrl", pdfUrl);
    } else {
      localStorage.removeItem("pdfUrl");
    }
  }, [pdfUrl]);

  const pyqLinks = {
    "PYQ 2024": "https://gate2024.iisc.ac.in/wp-content/uploads/2023/10/DataScienceAISampleQuestionPaper.pdf",
    "PYQ 2025": "https://gate2025.iitr.ac.in/doc/2025/2025_QP/DA.pdf",
  };

  const practiceLinks = {
    "Calculus & Optimization": "https://drive.google.com/file/d/1KIj49guDMlsa4d89zGIozCa-ng6IDCZB/preview",
    AI: "https://drive.google.com/file/d/1M6TUjlfB1vUgOAU-W4JXH4aVj7ArXSKq/preview",
  };

  const showPdf = (url) => {
    setPdfUrl(url);
    setInsightContent(null);
    setLoadingReadme(false);
    localStorage.removeItem("insightKey");
  };

  const showInsight = async (readmeUrl, subjectKey) => {
    setPdfUrl(null);
    setLoadingReadme(true);
    setInsightContent(null);
    try {
      const response = await fetch(readmeUrl);
      if (!response.ok) throw new Error("Failed to load README file");
      const text = await response.text();
      setInsightContent(text);
      localStorage.setItem("insightKey", subjectKey);
    } catch {
      setInsightContent("# Error loading README file.");
      localStorage.removeItem("insightKey");
    } finally {
      setLoadingReadme(false);
    }
  };

  const closeViewer = () => {
    setPdfUrl(null);
    setInsightContent(null);
    setLoadingReadme(false);
    localStorage.removeItem("pdfUrl");
    localStorage.removeItem("insightKey");
  };

  const renderSidebarButtons = () => {
    if (!clickedSection) {
      return (
        <>
          <button className="btn side-btn" onClick={() => setClickedSection("insights")}>Insights</button>
          <button className="btn side-btn" onClick={() => setClickedSection("pyq-questions")}>PYQ Questions</button>
          <button className="btn side-btn" onClick={() => setClickedSection("practice")}>Practice</button>
          
        </>
      );
    }

    if (clickedSection === "pyq-questions") {
      return (
        <>
          {Object.entries(pyqLinks).map(([label, url]) =>
            <button key={label} className="btn side-btn sub-btn" onClick={() => showPdf(url)}>{label}</button>
          )}
          <button className="btn side-btn back-btn" onClick={() => setClickedSection(null)}>{"\u00AB"} Back</button>
        </>
      );
    }

    if (clickedSection === "practice") {
      return (
        <>
          {Object.entries(practiceLinks).map(([label, url]) =>
            <button key={label} className="btn side-btn sub-btn" onClick={() => showPdf(url)}>{label}</button>
          )}
          <button className="btn side-btn back-btn" onClick={() => setClickedSection(null)}>{"\u00AB"} Back</button>
        </>
      );
    }

    if (clickedSection === "insights") {
      return (
        <>
          {Object.entries(insightReadmeFiles).map(([subject, readmeUrl]) =>
            <button key={subject} className="btn side-btn sub-btn" onClick={() => showInsight(readmeUrl, subject)}>{subject}</button>
          )}
          <button className="btn side-btn back-btn" onClick={() => setClickedSection(null)}>{"\u00AB"} Back</button>
        </>
      );
    }
    return null;
  };

  return (
    <div className="resources-layout">
      <Link to="/" className="home-logo-link" aria-label="Home">
        <img src={process.env.PUBLIC_URL + "/home.png"} alt="Home" className="home-logo" />
      </Link>

      <aside className="resources-sidebar">
        <h2 className="resources-sidebar-header">Resources</h2>
        <div className="resources-button-group">{renderSidebarButtons()}</div>
      </aside>

      <main className="resources-pdf-viewer-area">
        {(pdfUrl || insightContent) ? (
          <>
            <button onClick={closeViewer} className="resources-close-pdf-btn">
              Close {pdfUrl ? "PDF" : "Insights"}
            </button>
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                title="PDF Viewer"
                className="resources-pdf-iframe"
                width="100%"
                height="90vh"
              />
            ) : loadingReadme ? (
              <p>Loading README...</p>
            ) : (
              <div className="resources-readme-content">
                <ReactMarkdown>{insightContent}</ReactMarkdown>
              </div>
            )}
          </>
        ) : (
          <p className="resources-placeholder-text">
            Select a document or insight topic from the sidebar to view here.
          </p>
        )}
      </main>
    </div>
  );
}
