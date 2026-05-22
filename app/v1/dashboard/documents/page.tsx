"use client";

import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import FileUploadSection from "@/components/v1-dashboard/FileUploadSection";
import FileCard from "@/components/v1-dashboard/FileCard";

const DocumentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#0C6746"/>
    <path d="M24.0505 14.6999L23.2338 18.1833C22.5338 21.1916 21.1505 22.4083 18.5505 22.1583C18.1338 22.1249 17.6838 22.0499 17.2005 21.9333L15.8005 21.5999C12.3255 20.7749 11.2505 19.0583 12.0671 15.5749L12.8838 12.0833C13.0505 11.3749 13.2505 10.7583 13.5005 10.2499C14.4755 8.23326 16.1338 7.69159 18.9171 8.34993L20.3088 8.67493C23.8005 9.49159 24.8671 11.2166 24.0505 14.6999Z" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5503 22.1583C18.0336 22.5083 17.3836 22.8 16.592 23.0583L15.2753 23.4917C11.967 24.5583 10.2253 23.6667 9.15028 20.3583L8.08362 17.0667C7.01695 13.7583 7.90028 12.0083 11.2086 10.9417L12.5253 10.5083C12.867 10.4 13.192 10.3083 13.5003 10.25C13.2503 10.7583 13.0503 11.375 12.8836 12.0833L12.067 15.575C11.2503 19.0583 12.3253 20.775 15.8003 21.6L17.2003 21.9333C17.6836 22.05 18.1336 22.125 18.5503 22.1583Z" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.5332 13.1084L20.5749 14.1334" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.7168 16.3335L18.1335 16.9502" stroke="#E8EFF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const sampleFiles = [
  {
    id: "1",
    name: "CV_Adaeze_Nwosu_v3_Optimised.pdf",
    description: "Optimised by Happiness · 14 May 2025 · ATS Score: 87",
    status: "Ready" as const,
    icon: "📄",
  },
  {
    id: "2",
    name: "CV_Adaeze_Original_Upload.pdf",
    description: "Uploaded by you · 29 Apr 2025 · ATS Score: 62",
    status: "Latest" as const,
    icon: "📄",
  },
  {
    id: "3",
    name: "CoverLetter_DataAnalyst_Barclays.pdf",
    description: "Created by Happiness · 12 May 2025",
    status: "Latest" as const,
    icon: "📄",
  },
];

export default function DocumentsPage() {
  return (
    <div className="min-h-screen p-4 lg:p-6">
      {/* Navbar */}
      <DashboardNavbar 
        pageTitle="Documents" 
        pageIcon={<DocumentIcon />} 
      />

      {/* File Upload Section */}
      <FileUploadSection />

      {/* Your Files Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-white text-lg font-mona-sans font-bold">
            Your Files
          </h2>
          <span className="text-[#95ACCB] text-sm font-mona-sans">3</span>
        </div>

        {/* File List */}
        <div className="space-y-4">
          {sampleFiles.map((file) => (
            <FileCard
              key={file.id}
              name={file.name}
              description={file.description}
              status={file.status}
              icon={file.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
