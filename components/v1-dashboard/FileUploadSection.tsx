"use client";

import { useState } from "react";

export default function FileUploadSection() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      className={`rounded-[10px] flex flex-col items-center justify-center transition-colors ${
        isDragging ? "bg-[#1a2229]" : "bg-[#151A20]"
      }`}
      style={{
        height: "261px",
        border: "2.01px dashed #546881",
        borderStyle: "dashed",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <div className="text-6xl mb-4">📂</div>
        <p className="text-[#7e848a] font-sora text-base mb-2">
          Drop files here to upload
        </p>
        <p className="text-[#7e848a] font-sora text-sm">
          CV, Cover Letter, or any career document · Max 10MB · PDF, DOCX
        </p>
      </div>
    </div>
  );
}
