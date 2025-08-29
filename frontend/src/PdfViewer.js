import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PdfViewer.css";

// Set workerSrc for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewer({ fileUrl, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));

  return (
    <div className="pdf-viewer-container">
      <button onClick={onClose} className="btn btn-primary mb-4">
        Close PDF
      </button>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div>Loading PDF...</div>}
        error={<div>Failed to load PDF.</div>}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="pdf-navigation">
        <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="btn">
          Prev
        </button>
        <span>
          Page {pageNumber} of {numPages || "--"}
        </span>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="btn">
          Next
        </button>
      </div>
    </div>
  );
}
