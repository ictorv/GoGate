import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import "./Resources.css";

const insightReadmeFiles = {
  "Calculus & Optimization": process.env.PUBLIC_URL + "/resources/insight/calc.md",
  AI: process.env.PUBLIC_URL + "/resources/insight/ai.md",
};

// 🔹 Change syllabus to PDFs instead of .md
const syllabusPdfFiles = {
  "GATE 2026 Syllabus": "https://gate2026.iitg.ac.in/doc/GATE2026_Syllabus/DA_2026_Syllabus.pdf",
  "GATE 2025 Syllabus": "https://gate2025.iitr.ac.in/doc/2025/GATE%20_DA_2025_Syllabus.pdf",
  "GATE 2024 Syllabus":"https://gate2024.iisc.ac.in/wp-content/uploads/2023/08/GATE2024DataScienceAIsyllabus.pdf",
};

export default function Resources() {
  const [clickedSection, setClickedSection] = useState(() => localStorage.getItem("clickedSection") || null);
  const [pdfUrl, setPdfUrl] = useState(() => localStorage.getItem("pdfUrl") || null);
  const [insightContent, setInsightContent] = useState(null);
  const [loadingReadme, setLoadingReadme] = useState(false);

  useEffect(() => {
    const lastInsightKey = localStorage.getItem("insightKey");
    const lastSyllabusKey = localStorage.getItem("syllabusKey");

    if (lastInsightKey && insightReadmeFiles[lastInsightKey]) {
      showInsight(insightReadmeFiles[lastInsightKey], lastInsightKey, "insightKey");
      setClickedSection("insights");
    } else if (lastSyllabusKey && syllabusPdfFiles[lastSyllabusKey]) {
      showPdf(syllabusPdfFiles[lastSyllabusKey]);
      setClickedSection("syllabus");
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
    "PYQ 2025": "https://gate2025.iitr.ac.in/doc/2025/2025_QP/DA.pdf",
    "PYQ 2024": "https://gate2025.iitr.ac.in/doc/download/2024/DA24S1.pdf",
    
  };

  const practiceLinks = {
    "Calculus & Optimization": process.env.PUBLIC_URL +"/resources/practice/calc.pdf",
    "AI": process.env.PUBLIC_URL +"/resources/practice/ai.pdf",
  };

  const showPdf = (url) => {
    setPdfUrl(url);
    setInsightContent(null);
    setLoadingReadme(false);
    localStorage.removeItem("insightKey");
    localStorage.removeItem("syllabusKey");
  };

  const showInsight = async (readmeUrl, key, storageKey = "insightKey") => {
    setPdfUrl(null);
    setLoadingReadme(true);
    setInsightContent(null);
    try {
      const response = await fetch(readmeUrl);
      if (!response.ok) throw new Error("Failed to load README file");
      const text = await response.text();
      setInsightContent(text);
      localStorage.setItem(storageKey, key);
    } catch {
      setInsightContent("# Error loading README file.");
      localStorage.removeItem(storageKey);
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
    localStorage.removeItem("syllabusKey");
  };

  const renderSidebarButtons = () => {
    if (!clickedSection) {
      return (
        <>
          <button className="btn side-btn" onClick={() => setClickedSection("insights")}>Insights</button>
          <button className="btn side-btn" onClick={() => setClickedSection("syllabus")}>Syllabus</button>
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
            <button key={subject} className="btn side-btn sub-btn" onClick={() => showInsight(readmeUrl, subject, "insightKey")}>{subject}</button>
          )}
          <button className="btn side-btn back-btn" onClick={() => setClickedSection(null)}>{"\u00AB"} Back</button>
        </>
      );
    }

    if (clickedSection === "syllabus") {
      return (
        <>
          {Object.entries(syllabusPdfFiles).map(([subject, pdfUrl]) =>
            <button key={subject} className="btn side-btn sub-btn" onClick={() => showPdf(pdfUrl)}>{subject}</button>
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
              Close {pdfUrl ? "PDF" : "Content"}
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
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {insightContent}
                </ReactMarkdown>
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
