"use client";

import Link from "next/link";

interface Application {
  date: string;
  company: string;
  role: string;
  link: string;
}

const mockApplications: Application[] = [
  {
    date: "14 May, 26",
    company: "Barclays",
    role: "Data Analyst",
    link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433sn",
  },
  {
    date: "14 May, 26",
    company: "Accenture",
    role: "PM Consultant",
    link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433sn",
  },
  {
    date: "14 May, 26",
    company: "BT Group",
    role: "Cyber Analyst",
    link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433sn",
  },
  {
    date: "14 May, 26",
    company: "Meta Group",
    role: "Financial Analyst",
    link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433sn",
  },
  {
    date: "14 May, 26",
    company: "Meta Group",
    role: "Financial Analyst",
    link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433sn",
  },
  {
    date: "14 May, 26",
    company: "Meta Group",
    role: "Financial Analyst",
    link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433sn",
  },
  {
    date: "14 May, 26",
    company: "Meta Group",
    role: "Financial Analyst",
    link: "https://jobs.dayforcehcm.com/en-CA/reliancecomfort/CANDIDATEPORTAL/jobs/361433sn",
  },
];

export default function RecentApplicationsTable() {
  return (
    <div
      className="rounded-2xl p-5"
       style={{
              background: "#1563741A",
              border: "0.5px solid #FFFFFF1A",
            }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-mona-sans font-semibold text-base">
          Recent Applications
        </h2>
        <Link
          href="/v1/manager/applications"
          className="text-[#95ACCB] text-xs font-mona-sans hover:text-white transition-colors flex items-center gap-1"
        >
          View all →
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#FFFFFF0D]">
              <th className="text-left text-white text-base font-mona-sans font-bold pb-3 pr-4">
                Date
              </th>
              <th className="text-left text-white text-base font-mona-sans font-bold pb-3 pr-4">
                Company
              </th>
              <th className="text-left text-white text-base font-mona-sans font-bold pb-3 pr-4">
                Role
              </th>
              <th className="text-left text-white text-base font-mona-sans font-bold pb-3">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {mockApplications.map((app, index) => (
              <tr
                key={index}
                className="border-b border-[#FFFFFF06] last:border-b-0"
              >
                <td className="py-3 pr-4">
                  <span className="text-[#95ACCB] text-sm font-mona-sans">
                    {app.date}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-white text-sm font-mona-sans">
                    {app.company}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-[#95ACCB] text-sm font-mona-sans">
                    {app.role}
                  </span>
                </td>
                <td className="py-3">
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#657997] text-sm font-mona-sans hover:text-white transition-colors truncate block max-w-[400px]"
                  >
                    {app.link}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
