"use client";

import { useState, useRef } from "react";

interface DocItem {
  name: string;
  meta: string;
  type: "cv" | "cover-letter";
  source: "happiness" | "client";
  downloadUrl?: string;
}

const allDocs: DocItem[] = [
  { name: "CV_Adaeze_Nwosu_v3_Optimised.pdf",     meta: "Optimised by Happiness · 14 May 2025",  type: "cv",           source: "happiness" },
  { name: "CoverLetter_DataAnalyst_Barclays.pdf",  meta: "Created by Happiness · 12 May 2025",   type: "cover-letter", source: "happiness" },
  { name: "CV_Adaeze_Original_Upload.pdf",         meta: "Uploaded by Adaeze · 29 Apr 2025",     type: "cv",           source: "client",    downloadUrl: "#" },
];

const yourUploadsDocs: DocItem[] = [
  { name: "CV_Adaeze_Nwosu_v3_Optimised.pdf",     meta: "Optimised by Happiness · 14 May 2025",  type: "cv",           source: "happiness" },
  { name: "CoverLetter_DataAnalyst_Barclays.pdf",  meta: "Created by Happiness · 12 May 2025",   type: "cover-letter", source: "happiness" },
  { name: "CV_Adaeze_Nwosu_v3_Optimised.pdf",     meta: "Optimised by Happiness · 14 May 2025",  type: "cv",           source: "happiness" },
];

const clientUploadsDocs: DocItem[] = [
  { name: "CV_Adaeze_Original_Upload.pdf", meta: "Uploaded by Adaeze · 29 Apr 2025", type: "cv", source: "client", downloadUrl: "#" },
];

type DocTab = "all" | "yours" | "clients";

const FileIcon = () => (
  <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
    <path d="M11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V7L11 1Z" stroke="#F0F5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 1V7H17" stroke="#F0F5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 12H5M13 16H5M7 8H5" stroke="#F0F5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MailIcon = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path d="M1 4C1 3.46957 1.21071 2.96086 1.58579 2.58579C1.96086 2.21071 2.46957 2 3 2H19C19.5304 2 20.0391 2.21071 20.4142 2.58579C20.7893 2.96086 21 3.46957 21 4V14C21 14.5304 20.7893 15.0391 20.4142 15.4142C20.0391 15.7893 19.5304 16 19 16H3C2.46957 16 1.96086 15.7893 1.58579 15.4142C1.21071 15.0391 1 14.5304 1 14V4Z" stroke="#F0F5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 4L11 10L21 4" stroke="#F0F5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const activeTabStyle: React.CSSProperties = {
  background: "#1563743D", border: "0.5px solid #E8EFF11A", borderRadius: "10px",
  color: "#E8EFF1", fontFamily: "var(--font-mona-sans, sans-serif)", fontWeight: 500,
  fontSize: "13px", padding: "8px 18px", cursor: "pointer",
};
const inactiveTabStyle: React.CSSProperties = {
  background: "transparent", border: "0.5px solid #FFFFFF1A", borderRadius: "10px",
  color: "#E8EFF1", fontFamily: "var(--font-mona-sans, sans-serif)", fontWeight: 500,
  fontSize: "13px", padding: "8px 18px", cursor: "pointer",
};

export default function WorkspaceCVUploads({ clientName }: { clientName: string }) {
  const [docTab, setDocTab] = useState<DocTab>("all");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dataMap: Record<DocTab, DocItem[]> = { all: allDocs, yours: yourUploadsDocs, clients: clientUploadsDocs };
  const docs = dataMap[docTab];

  const showDownload = (doc: DocItem): boolean => {
    if (docTab === "yours") return false;
    if (docTab === "clients") return true;
    return doc.source === "client";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Hook up file upload logic here
    const files = Array.from(e.dataTransfer.files);
    console.log("Dropped files:", files);
  };

  return (
    <div className="p-5">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="rounded-2xl flex flex-col items-center justify-center gap-3 mb-5 cursor-pointer transition-all"
        style={{
          border: `1.5px dashed ${isDragging ? "#A2CE3A" : "rgba(255,255,255,0.2)"}`,
          background: isDragging ? "rgba(162,206,58,0.05)" : "transparent",
          padding: "48px 24px",
          minHeight: "160px",
        }}
      >
        {/* Folder icon */}
        <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
          <path d="M44 8H26L22 4H4C1.8 4 0 5.8 0 8V36C0 38.2 1.8 40 4 40H44C46.2 40 48 38.2 48 36V12C48 9.8 46.2 8 44 8Z" fill="rgba(255,255,255,0.15)"/>
          <path d="M44 8H26L22 4H4C1.8 4 0 5.8 0 8V36C0 38.2 1.8 40 4 40H44C46.2 40 48 38.2 48 36V12C48 9.8 46.2 8 44 8Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        </svg>
        <div className="text-center">
          <p className="font-mona-sans font-medium text-sm" style={{ color: "#E8EFF1" }}>Drop files here to upload</p>
          <p className="font-mona-sans text-xs mt-1" style={{ color: "#657997" }}>
            CV, Cover Letter, or any career document · Max 10MB · PDF, DOCX
          </p>
        </div>
        <input ref={fileInputRef} type="file" accept=".pdf,.docx" className="hidden" multiple />
      </div>

      {/* Sub tabs */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setDocTab("all")}     style={docTab === "all"     ? activeTabStyle : inactiveTabStyle}>All Uploads</button>
        <button onClick={() => setDocTab("yours")}   style={docTab === "yours"   ? activeTabStyle : inactiveTabStyle}>Your Uploads</button>
        <button onClick={() => setDocTab("clients")} style={docTab === "clients" ? activeTabStyle : inactiveTabStyle}>Client's Uploads</button>
      </div>

      {/* File list */}
      <div className="space-y-3">
        {docs.map((doc, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-3 rounded-2xl"
            style={{ background: "#1563741A", border: "1px solid #FFFFFF1A" }}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex items-center justify-center flex-shrink-0 rounded-xl"
                style={{ width: "44px", height: "44px", background: "rgba(255,255,255,0.05)", border: "1px solid #FFFFFF1A" }}>
                {doc.type === "cover-letter" ? <MailIcon /> : <FileIcon />}
              </div>
              <div className="min-w-0">
                <p className="font-mona-sans font-medium text-sm truncate" style={{ color: "#E8EFF1" }}>{doc.name}</p>
                <p className="font-mona-sans text-xs mt-0.5" style={{ color: "#657997" }}>{doc.meta}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
              <button className="font-mona-sans font-medium text-sm hover:text-white transition-colors"
                style={{ background: "transparent", border: "none", color: "#95ACCB", cursor: "pointer" }}>
                Preview
              </button>
              {showDownload(doc) && (
                <a href={doc.downloadUrl ?? "#"} download
                  className="font-mona-sans font-semibold text-sm hover:opacity-90 transition-opacity"
                  style={{ background: "#A2CE3A", color: "#0B0D0F", borderRadius: "10px", padding: "8px 22px", textDecoration: "none", whiteSpace: "nowrap" }}>
                  Download
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}