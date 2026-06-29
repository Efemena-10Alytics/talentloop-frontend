"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocType = "cv" | "cover-letter";
type UploadSource = "you" | "happiness" | "client";

interface Document {
  name: string;
  meta: string;
  type: DocType;
  source: UploadSource;
  downloadUrl?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const allDocs: Document[] = [
  { name: "CV_Adaeze_Nwosu_v3_Optimised.pdf",         meta: "Optimised by Happiness · 14 May 2025",  type: "cv",           source: "happiness" },
  { name: "CoverLetter_DataAnalyst_Barclays.pdf",     meta: "Created by Happiness · 12 May 2025",   type: "cover-letter", source: "happiness" },
  { name: "CV_Adaeze_Original_Upload.pdf",            meta: "Uploaded by you · 29 Apr 2025",        type: "cv",           source: "you",      downloadUrl: "#" },
  { name: "CV_Adaeze_Nwosu_v3_Optimised.pdf",         meta: "Optimised by Happiness · 14 May 2025", type: "cv",           source: "happiness" },
  { name: "CoverLetter_DataAnalyst_Barclays.pdf",     meta: "Created by Happiness · 12 May 2025",   type: "cover-letter", source: "happiness" },
  { name: "CoverLetter_DataAnalyst_Barclays.pdf",     meta: "Created by Happiness · 12 May 2025",   type: "cover-letter", source: "happiness" },
  { name: "CoverLetter_DataAnalyst_Barclays.pdf",     meta: "Created by Happiness · 12 May 2025",   type: "cover-letter", source: "happiness" },
  { name: "CV_Adaeze_Original_Upload.pdf",            meta: "Uploaded by you · 29 Apr 2025",        type: "cv",           source: "you",      downloadUrl: "#" },
  { name: "CV_Adaeze_Original_Upload.pdf",            meta: "Uploaded by you · 29 Apr 2025",        type: "cv",           source: "you",      downloadUrl: "#" },
  { name: "CV_Adaeze_Original_Upload.pdf",            meta: "Uploaded by you · 29 Apr 2025",        type: "cv",           source: "you",      downloadUrl: "#" },
];

const yourUploadsDocs: Document[] = allDocs.filter((d) => d.source === "happiness");

const clientUploadsDocs: Document[] = [
  { name: "CV_Adaeze_Original_Upload.pdf",        meta: "Uploaded by you · 29 Apr 2025",      type: "cv",           source: "client", downloadUrl: "#" },
  { name: "CoverLetter_DataAnalyst_Barclays.pdf", meta: "Created by Happiness · 12 May 2025", type: "cover-letter", source: "client", downloadUrl: "#" },
  { name: "CV_Adaeze_Original_Upload.pdf",        meta: "Uploaded by you · 29 Apr 2025",      type: "cv",           source: "client", downloadUrl: "#" },
  { name: "CV_Adaeze_Original_Upload.pdf",        meta: "Uploaded by you · 29 Apr 2025",      type: "cv",           source: "client", downloadUrl: "#" },
  { name: "CV_Adaeze_Original_Upload.pdf",        meta: "Uploaded by you · 29 Apr 2025",      type: "cv",           source: "client", downloadUrl: "#" },
  { name: "CoverLetter_DataAnalyst_Barclays.pdf", meta: "Created by Happiness · 12 May 2025", type: "cover-letter", source: "client", downloadUrl: "#" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const FileIcon = () => (
<div>📄</div>
);

const MailIcon = () => (
 <div>✉️</div>
);

const ExportIcon = () => (
  <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.9242 0.175674C4.81168 0.0631898 4.6591 0 4.5 0C4.3409 0 4.18832 0.0631898 4.0758 0.175674L1.0758 3.17571C0.966505 3.28887 0.906028 3.44043 0.907395 3.59775C0.908763 3.75507 0.971864 3.90556 1.08311 4.01681C1.19435 4.12805 1.34484 4.19115 1.50216 4.19252C1.65948 4.19389 1.81104 4.13341 1.9242 4.02411L3.9 2.04829V9.59997C3.9 9.75911 3.96321 9.91172 4.07574 10.0242C4.18826 10.1368 4.34087 10.2 4.5 10.2C4.65913 10.2 4.81174 10.1368 4.92426 10.0242C5.03679 9.91172 5.1 9.75911 5.1 9.59997V2.04829L7.0758 4.02411C7.13115 4.08142 7.19736 4.12713 7.27056 4.15858C7.34376 4.19002 7.42249 4.20657 7.50216 4.20727C7.58183 4.20796 7.66083 4.19278 7.73457 4.16261C7.80831 4.13244 7.8753 4.08789 7.93164 4.03155C7.98797 3.97522 8.03253 3.90822 8.06269 3.83449C8.09286 3.76075 8.10804 3.68174 8.10735 3.60207C8.10666 3.5224 8.09011 3.44367 8.05866 3.37047C8.02722 3.29726 7.98151 3.23105 7.9242 3.17571L4.9242 0.175674ZM0.45 11.1C0.330653 11.1 0.216193 11.1474 0.131802 11.2318C0.0474105 11.3162 0 11.4306 0 11.55C0 11.6693 0.0474105 11.7838 0.131802 11.8682C0.216193 11.9526 0.330653 12 0.45 12H8.55C8.66935 12 8.78381 11.9526 8.8682 11.8682C8.95259 11.7838 9 11.6693 9 11.55C9 11.4306 8.95259 11.3162 8.8682 11.2318C8.78381 11.1474 8.66935 11.1 8.55 11.1H0.45Z" fill="#0B0D0F"/>
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 6.375H0.75M6.375 12L0.75 6.375L6.375 0.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 6.375H15.25M9.625 0.75L15.25 6.375L9.625 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L6 6L11 1" stroke="#95ACCB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Shared styles ────────────────────────────────────────────────────────────

const activeTabStyle: React.CSSProperties = {
  background: "#1563743D",
  border: "0.5px solid #E8EFF11A",
  borderRadius: "10px",
  color: "#E8EFF1",
  fontFamily: "var(--font-mona-sans, sans-serif)",
  fontWeight: 500,
  fontSize: "13px",
  padding: "8px 18px",
  cursor: "pointer",
};

const inactiveTabStyle: React.CSSProperties = {
  background: "transparent",
  border: "0.5px solid #FFFFFF1A",
  borderRadius: "10px",
  color: "#E8EFF1",
  fontFamily: "var(--font-mona-sans, sans-serif)",
  fontWeight: 500,
  fontSize: "13px",
  padding: "8px 18px",
  cursor: "pointer",
};

// ─── Document Row ─────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 8;

type TabId = "all" | "yours" | "clients";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DocumentsTable() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const dataMap: Record<TabId, Document[]> = {
    all: allDocs,
    yours: yourUploadsDocs,
    clients: clientUploadsDocs,
  };

  const data = dataMap[activeTab];
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paged = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // "Your Uploads" tab = only Preview (no Download)
  // "Client's Uploads" tab = Preview + Download always
  // "All Uploads" tab = Preview always, Download only if source === "you"
  const showDownload = (doc: Document): boolean => {
    if (activeTab === "yours") return false;
    if (activeTab === "clients") return true;
    return doc.source === "you";
  };

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        {/* Tabs */}
        <div className="flex items-center gap-2">
          <button onClick={() => handleTabChange("all")}     style={activeTab === "all"     ? activeTabStyle : inactiveTabStyle}>All Uploads</button>
          <button onClick={() => handleTabChange("yours")}   style={activeTab === "yours"   ? activeTabStyle : inactiveTabStyle}>Your Uploads</button>
          <button onClick={() => handleTabChange("clients")} style={activeTab === "clients" ? activeTabStyle : inactiveTabStyle}>Client's Uploads</button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2"
            style={{
              background: "#A2CE3A",
              border: "0.5px solid #FFFFFF1A",
              borderRadius: "10px",
              padding: "8px 16px",
              color: "#0B0D0F",
              fontFamily: "var(--font-mona-sans, sans-serif)",
              fontWeight: 500,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Export <ExportIcon />
          </button>
          <button className="flex items-center gap-2" style={inactiveTabStyle}>
            Premium Clients <ChevronDown />
          </button>
          <button className="flex items-center gap-2" style={inactiveTabStyle}>
            Today <ChevronDown />
          </button>
        </div>
      </div>

      {/* File List */}
      <div className="space-y-3">
        {paged.map((doc, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-3 rounded-2xl"
            style={{
              background: "#1563741A",
              border: "1px solid #FFFFFF1A",
            }}
          >
            {/* Icon + Info */}
            <div className="flex items-center gap-4 min-w-0">
              <div
                className="flex items-center justify-center flex-shrink-0 rounded-xl"
                style={{
                  width: "44px",
                  height: "44px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid #FFFFFF1A",
                }}
              >
                {doc.type === "cover-letter" ? <MailIcon /> : <FileIcon />}
              </div>
              <div className="min-w-0">
                <p
                  className="font-mona-sans font-medium text-sm truncate"
                  style={{ color: "#E8EFF1" }}
                >
                  {doc.name}
                </p>
                <p
                  className="font-mona-sans text-xs mt-0.5"
                  style={{ color: "#657997" }}
                >
                  {doc.meta}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0 ml-6">
              {/* Preview — always shown */}
              <button
                className="font-mona-sans font-medium text-sm transition-colors hover:text-white"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#95ACCB",
                  cursor: "pointer",
                  padding: "0 4px",
                }}
              >
                Preview
              </button>

              {/* Download — conditional */}
              {showDownload(doc) && (
                <a
                  href={doc.downloadUrl ?? "#"}
                  download
                  className="flex items-center justify-center font-mona-sans font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{
                    background: "#A2CE3A",
                    color: "#0B0D0F",
                    borderRadius: "10px",
                    padding: "8px 22px",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  Download
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{
            opacity: currentPage === 1 ? 0.3 : 1,
            background: "transparent",
            border: "none",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
          }}
        >
          <ArrowLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: currentPage === page ? "#A2CE3A" : "transparent",
              color: currentPage === page ? "#0B0D0F" : "#95ACCB",
              border: currentPage === page ? "none" : "1px solid #FFFFFF1A",
              fontFamily: "var(--font-mona-sans, sans-serif)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          style={{
            opacity: currentPage === totalPages ? 0.3 : 1,
            background: "transparent",
            border: "none",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
          }}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}