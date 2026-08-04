"use client";

import { useState, useEffect } from "react";
import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import FileUploadSection from "@/components/v1-dashboard/FileUploadSection";
import FileCard from "@/components/v1-dashboard/FileCard";
import Skeleton from "@/components/ui/Skeleton";
import { useEnrollmentDocuments, EnrollmentDocument } from "@/hooks/useEnrollmentData";
import { useMinLoadingTime } from "@/hooks/useMinLoadingTime";

const DocumentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#0C6746"/>
    <path d="M24.0505 14.6999L23.2338 18.1833C22.5338 21.1916 21.1505 22.4083 18.5505 22.1583C18.1338 22.1249 17.6838 22.0499 17.2005 21.9333L15.8005 21.5999C12.3255 20.7749 11.2505 19.0583 12.0671 15.5749L12.8838 12.0833C13.0505 11.3749 13.2505 10.7583 13.5005 10.2499C14.4755 8.23326 16.1338 7.69159 18.9171 8.34993L20.3088 8.67493C23.8005 9.49159 24.8671 11.2166 24.0505 14.6999Z" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5503 22.1583C18.0336 22.5083 17.3836 22.8 16.592 23.0583L15.2753 23.4917C11.967 24.5583 10.2253 23.6667 9.15028 20.3583L8.08362 17.0667C7.01695 13.7583 7.90028 12.0083 11.2086 10.9417L12.5253 10.5083C12.867 10.4 13.192 10.3083 13.5003 10.25C13.2503 10.7583 13.0503 11.375 12.8836 12.0833L12.067 15.575C11.2503 19.0583 12.3253 20.775 15.8003 21.6L17.2003 21.9333C17.6836 22.05 18.1336 22.125 18.5503 22.1583Z" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.5332 13.1084L20.5749 14.1334" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.7168 16.3335L18.1335 16.9502" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function DocumentsPage() {
  const { data: fetchedDocs = [], isLoading: isDocsLoading } = useEnrollmentDocuments();
  const isLoading = useMinLoadingTime(isDocsLoading, 3000);
  const [documents, setDocuments] = useState<EnrollmentDocument[]>([]);

  useEffect(() => {
    if (fetchedDocs.length > 0) setDocuments(fetchedDocs);
  }, [fetchedDocs]);

  const handleUploaded = (doc: EnrollmentDocument) => {
    setDocuments((prev) => [doc, ...prev]);
  };

  const handleDeleted = (id: number) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen p-4 lg:p-6">
      {/* Navbar */}
      <DashboardNavbar
        pageTitle="Documents"
        pageIcon={<DocumentIcon />}
      />

      {/* File Upload Section */}
      <FileUploadSection onUploaded={handleUploaded} />

      {/* Your Files Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-white text-lg font-mona-sans font-bold">Your Files</h2>
          <span className="text-[#95ACCB] text-sm font-mona-sans">{documents.length}</span>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="p-4 sm:p-6 rounded-2xl"
                style={{ background: "rgba(21, 99, 116, 0.2)", border: "0.5px solid rgba(255, 255, 255, 0.1)" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-9 w-24 rounded-lg" />
                  <Skeleton className="h-9 w-24 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : documents.length === 0 ? (
          <p className="text-[#657997] font-mona-sans text-sm">No documents uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <FileCard key={doc.id} document={doc} onDeleted={handleDeleted} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
