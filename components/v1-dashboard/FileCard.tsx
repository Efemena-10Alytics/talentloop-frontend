"use client";

import { useState } from "react";
import { EnrollmentDocument } from "@/hooks/useEnrollmentData";

const CATEGORY_LABELS: Record<string, string> = {
  cv: "CV",
  cover_letter: "Cover Letter",
  other: "Other",
};

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface FileCardProps {
  document: EnrollmentDocument;
  onDeleted: (id: number) => void;
}

export default function FileCard({ document, onDeleted }: FileCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/enrollment/documents/${document.id}`, {
        method: "DELETE",
      });
      if (res.ok || res.status === 204) {
        onDeleted(document.id);
      }
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const formattedDate = new Date(document.created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const categoryLabel = CATEGORY_LABELS[document.category] ?? document.category;

  return (
    <>
      <div
        className="p-4 sm:p-6 rounded-2xl"
        style={{
          background: "rgba(21, 99, 116, 0.2)",
          border: "0.5px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* File Icon */}
          <div className="text-4xl sm:text-5xl flex-shrink-0">📄</div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-mona-sans font-semibold text-sm sm:text-base mb-1 truncate">
              {document.original_filename}
            </h3>
            <p className="text-[#95ACCB] text-xs sm:text-sm font-mona-sans">
              {categoryLabel} · {formattedDate}
            </p>
          </div>

          {/* Category Badge */}
          <div className="flex-shrink-0 hidden sm:block">
            <div
              className="px-4 py-2 rounded-[100px]"
              style={{ background: "#00C8B31A", border: "1px solid #FFFFFF0F" }}
            >
              <span className="text-sm font-mona-sans font-medium text-white">
                {categoryLabel}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0 w-full sm:w-auto">
            <a
              href={document.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-mona-sans font-medium text-xs sm:text-sm transition-opacity hover:opacity-80 text-center"
              style={{
                background: "rgba(0, 0, 0, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                color: "#FFFFFF",
              }}
            >
              Preview
            </a>

            <a
              href={document.file_url}
              download={document.original_filename}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-mona-sans font-semibold text-xs sm:text-sm transition-opacity hover:opacity-90 text-center"
              style={{ background: "#A2CE3A", color: "#121212" }}
            >
              Download
            </a>

            <button
              onClick={() => setShowConfirm(true)}
              className="w-full sm:w-9 h-10 sm:h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-red-500/20 text-red-400"
              style={{ border: "1px solid rgba(255, 255, 255, 0.06)" }}
              title="Delete document"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />
          <div
            className="relative z-10 w-full max-w-sm rounded-2xl p-6"
            style={{
              background: "linear-gradient(135deg, #0e1718 0%, #172520 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3 className="text-white font-mona-sans font-bold text-lg mb-2">
              Delete Document
            </h3>
            <p className="text-[#95ACCB] font-mona-sans text-sm mb-6">
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">{document.original_filename}</span>?
              This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 h-10 rounded-lg font-mona-sans text-sm font-medium text-white transition-opacity hover:opacity-80"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 h-10 rounded-lg font-mona-sans text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: "#ef4444", color: "#fff" }}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
