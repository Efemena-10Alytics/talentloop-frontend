"use client";

import { Suspense, useState, useRef, useEffect } from "react";

/* ─── SVG Icons ─── */

const DownloadSVG = () => (
 <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 16.75H12.75M6.75 0.75V12.75M6.75 12.75L10.25 9.25M6.75 12.75L3.25 9.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

const RequestWithdrawalSVG = () => (
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.4963 11.7475C18.1985 10.7381 18.6225 9.56146 18.7254 8.33609C18.8284 7.11072 18.6067 5.87985 18.0828 4.76737C17.5588 3.6549 16.751 2.70008 15.7408 1.99902C14.7305 1.29796 13.5534 0.875411 12.3279 0.773896C11.1024 0.672381 9.87178 0.895485 8.75992 1.42075C7.64806 1.94602 6.69419 2.75491 5.99432 3.76601C5.29446 4.77711 4.87329 5.95473 4.77322 7.18034C4.67315 8.40595 4.8977 9.6363 5.42428 10.7475" stroke="#0B0D0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.75 4.74756C10.645 4.74756 9.75 5.41956 9.75 6.24756C9.75 7.07556 10.645 7.74756 11.75 7.74756C12.855 7.74756 13.75 8.41956 13.75 9.24756C13.75 10.0756 12.855 10.7476 11.75 10.7476M11.75 4.74756C12.62 4.74756 13.362 5.16456 13.636 5.74756M11.75 4.74756V3.74756M11.75 10.7476C10.88 10.7476 10.138 10.3306 9.864 9.74756M11.75 10.7476V11.7476" stroke="#0B0D0F" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M0.75 12.7476H3.145C3.439 12.7476 3.729 12.8136 3.992 12.9416L6.034 13.9296C6.297 14.0566 6.587 14.1226 6.882 14.1226H7.924C8.932 14.1226 9.75 14.9136 9.75 15.8896C9.75 15.9296 9.723 15.9636 9.684 15.9746L7.143 16.6776C6.68705 16.8035 6.20087 16.7594 5.775 16.5536L3.592 15.4976M9.75 15.2476L14.343 13.8366C14.7429 13.7139 15.1713 13.7206 15.567 13.8558C15.9628 13.9911 16.3058 14.2478 16.547 14.5896C16.916 15.0996 16.766 15.8316 16.228 16.1416L8.713 20.4786C8.47802 20.6145 8.21781 20.7012 7.94824 20.7334C7.67866 20.7655 7.40537 20.7424 7.145 20.6656L0.75 18.7676" stroke="#0B0D0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TotalEarningsSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M27 29.7042C26.7012 29.8393 26.3796 29.9167 26.052 29.9322C24.981 29.9862 23.481 30.0332 21.5 30.0332C19.519 30.0332 18.019 29.9857 16.948 29.9317C16.6205 29.9163 16.2988 29.8391 16 29.7042M29.25 26.9727C28.8674 27.2183 28.4271 27.3594 27.973 27.3817C26.579 27.4577 24.4555 27.5327 21.5 27.5327C18.5445 27.5327 16.421 27.4577 15.027 27.3817C14.5729 27.3594 14.1326 27.2183 13.75 26.9727M11.199 22.6382C11.322 23.8857 12.328 24.7822 13.5805 24.8507C15.191 24.9392 17.781 25.0332 21.5 25.0332C25.219 25.0332 27.809 24.9392 29.42 24.8507C30.672 24.7822 31.678 23.8857 31.801 22.6382C31.907 21.5637 32 20.0467 32 18.0332C32 16.0197 31.907 14.5027 31.801 13.4282C31.678 12.1802 30.672 11.2842 29.4195 11.2157C27.809 11.1272 25.219 11.0332 21.5 11.0332C17.781 11.0332 15.191 11.1272 13.58 11.2157C12.328 11.2842 11.322 12.1807 11.199 13.4282C11.093 14.5032 11 16.0197 11 18.0332C11 20.0467 11.093 21.5637 11.199 22.6382Z" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.5 15.7882C23.5 15.7882 22.7 15.1757 21.5 15.1757C20.5 15.1757 19.5 15.7882 19.5 16.6042C19.5 18.6452 23.5 17.4207 23.5 19.4617C23.5 20.2777 22.5 20.8902 21.5 20.8902M21.5 20.8902C20.3 20.8902 19.5 20.2777 19.5 20.2777M21.5 20.8902V22.0332M21.5 15.1762V14.0332M28 18.0332H27.5M15.5 18.0332H15" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CurrentBalanceSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M12.172 30.328C13.343 31.5 15.229 31.5 19 31.5H23C26.771 31.5 28.657 31.5 29.828 30.328C30.999 29.156 31 27.271 31 23.5C31 22.33 31 21.342 30.965 20.5M29.828 16.672C28.657 15.5 26.771 15.5 23 15.5H19C15.229 15.5 13.343 15.5 12.172 16.672C11.001 17.844 11 19.729 11 23.5C11 24.67 11 25.658 11.035 26.5M21 11.5C22.886 11.5 23.828 11.5 24.414 12.086C25 12.672 25 13.614 25 15.5M17.586 12.086C17 12.672 17 13.614 17 15.5" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M21 26.833C22.105 26.833 23 26.087 23 25.167C23 24.247 22.105 23.5 21 23.5C19.895 23.5 19 22.754 19 21.833C19 20.913 19.895 20.167 21 20.167M21 26.833C19.895 26.833 19 26.087 19 25.167M21 26.833V27.5M21 20.167V19.5M21 20.167C22.105 20.167 23 20.913 23 21.833" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TotalWithdrawalSVG = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="21" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M29.2463 21.5322C29.9485 20.5228 30.3725 19.3461 30.4754 18.1208C30.5784 16.8954 30.3567 15.6645 29.8328 14.552C29.3088 13.4396 28.501 12.4847 27.4908 11.7837C26.4805 11.0826 25.3034 10.6601 24.0779 10.5586C22.8524 10.457 21.6218 10.6802 20.5099 11.2054C19.3981 11.7307 18.4442 12.5396 17.7443 13.5507C17.0445 14.5618 16.6233 15.7394 16.5232 16.965C16.4231 18.1906 16.6477 19.421 17.1743 20.5322" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.5 14.5322C22.395 14.5322 21.5 15.2042 21.5 16.0322C21.5 16.8602 22.395 17.5322 23.5 17.5322C24.605 17.5322 25.5 18.2042 25.5 19.0322C25.5 19.8602 24.605 20.5322 23.5 20.5322M23.5 14.5322C24.37 14.5322 25.112 14.9492 25.386 15.5322M23.5 14.5322V13.5322M23.5 20.5322C22.63 20.5322 21.888 20.1152 21.614 19.5322M23.5 20.5322V21.5322" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12.5 22.5322H14.895C15.189 22.5322 15.479 22.5982 15.742 22.7262L17.784 23.7142C18.047 23.8412 18.337 23.9072 18.632 23.9072H19.674C20.682 23.9072 21.5 24.6982 21.5 25.6742C21.5 25.7142 21.473 25.7482 21.434 25.7592L18.893 26.4622C18.4371 26.5882 17.9509 26.5441 17.525 26.3382L15.342 25.2822M21.5 25.0322L26.093 23.6212C26.4929 23.4985 26.9213 23.5053 27.317 23.6405C27.7128 23.7757 28.0558 24.0325 28.297 24.3742C28.666 24.8842 28.516 25.6162 27.978 25.9262L20.463 30.2632C20.228 30.3992 19.9678 30.4859 19.6982 30.518C19.4287 30.5502 19.1554 30.5271 18.895 30.4502L12.5 28.5522" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExportSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M11.3333 5.33333L8 2M8 2L4.66667 5.33333M8 2V10" stroke="#A2CE3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilterSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14M4 8H12M6 12H10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Data ─── */

const allTransactions = [
  { id: 1, date: "02-14-2026", client: "Alex Johnson", type: "Technical", amount: "$150", status: "Completed" },
  { id: 2, date: "02-14-2026", client: "Alex Johnson", type: "Technical", amount: "$150", status: "Completed" },
  { id: 3, date: "02-14-2026", client: "Alex Johnson", type: "Technical", amount: "$150", status: "Cancelled" },
  { id: 4, date: "02-14-2026", client: "Alex Johnson", type: "Technical", amount: "$150", status: "Completed" },
  { id: 5, date: "02-14-2026", client: "Alex Johnson", type: "Technical", amount: "$150", status: "Cancelled" },
  { id: 6, date: "02-14-2026", client: "Alex Johnson", type: "Technical", amount: "$150", status: "Completed" },
];

/* ─── Components ─── */

function EarningsContent() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const filterRef = useRef<HTMLDivElement>(null);

  const transactions = selectedFilter === "All" 
    ? allTransactions 
    : allTransactions.filter(t => t.status === selectedFilter);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#141619] min-h-screen -m-6 lg:-m-8 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-mona-sans font-bold text-3xl">Earnings & Payouts</h1>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-transparent border border-white/20 hover:border-white/40 text-white font-mona-sans font-medium text-sm rounded-[10px] transition-colors flex items-center gap-2">
            <DownloadSVG />
            Download Receipt
          </button>
          <button className="px-4 py-2.5 bg-[#A2CE3A] hover:bg-[#8fb832] text-black font-mona-sans font-semibold text-sm rounded-[10px] transition-colors flex items-center gap-2">
            <RequestWithdrawalSVG />
            Request Withdrawal
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Earnings */}
        <div className="bg-[#FFFFFF12] border border-white/70 rounded-[16px] p-6">
          <div className="flex items-center gap-3 mb-3">
            <TotalEarningsSVG />
            <span className="text-white/70 font-mona-sans text-sm">Total Earnings</span>
          </div>
          <p className="text-white font-mona-sans font-bold text-3xl">$8,750</p>
        </div>

        {/* Current Balance */}
        <div className="bg-[#FFFFFF12] border border-white/70 rounded-[16px] p-6">
          <div className="flex items-center gap-3 mb-3">
            <CurrentBalanceSVG />
            <span className="text-white/70 font-mona-sans text-sm">Current Balance</span>
          </div>
          <p className="text-white font-mona-sans font-bold text-3xl">$8,000</p>
        </div>

        {/* Total Withdrawal */}
        <div className="bg-[#FFFFFF12] border border-white/70 rounded-[16px] p-6">
          <div className="flex items-center gap-3 mb-3">
            <TotalWithdrawalSVG />
            <span className="text-white/70 font-mona-sans text-sm">Total Withdrawal</span>
          </div>
          <p className="text-white font-mona-sans font-bold text-3xl">$750</p>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="bg-[#0B0D0F] border border-white/10 rounded-[16px] p-6 mb-6">
        <h2 className="text-white font-mona-sans font-bold text-xl mb-4">Revenue Overview</h2>
        <div className="bg-[#161719] border border-white/10 rounded-[12px] h-[425px] flex items-center justify-center">
          <p className="text-[#A9B4C4] font-mona-sans text-sm">Add Chart</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-[#0B0D0F] border border-white/10 rounded-[16px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-mona-sans font-bold text-xl">Transaction History</h2>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 bg-[#A2CE3A] hover:bg-[#8fb832] text-black font-mona-sans font-semibold text-sm rounded-[10px] transition-colors flex items-center gap-2">
              <ExportSVG />
              Export
            </button>
            <div className="relative" ref={filterRef}>
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="px-4 py-2.5 bg-transparent border border-white/20 hover:border-white/40 text-white font-mona-sans font-medium text-sm rounded-[10px] transition-colors flex items-center gap-2"
              >
                <FilterSVG />
                {selectedFilter === "All" ? "Filter" : selectedFilter}
              </button>
              {filterOpen && (
                <div className="absolute right-0 mt-2 w-[160px] bg-[#1E1F21] border border-white/10 rounded-[10px] shadow-lg z-50">
                  {["All", "Completed", "Cancelled"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setSelectedFilter(filter);
                        setFilterOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-white font-mona-sans text-sm hover:bg-white/5 transition-colors first:rounded-t-[10px] last:rounded-b-[10px]"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white font-sora font-semibold text-sm pb-4">Date</th>
                <th className="text-left text-white font-sora font-semibold text-sm pb-4">Client</th>
                <th className="text-left text-white font-sora font-semibold text-sm pb-4">Type</th>
                <th className="text-left text-white font-sora font-semibold text-sm pb-4">Amount</th>
                <th className="text-left text-white font-sora font-semibold text-sm pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-white/5">
                  <td className="text-white font-sora text-sm py-4">{transaction.date}</td>
                  <td className="text-white font-sora text-sm py-4">{transaction.client}</td>
                  <td className="py-4">
                    <span className="px-3 py-1.5 bg-[#A2CE3A]/15 text-[#A2CE3A] rounded-full text-xs font-sora font-medium">
                      {transaction.type}
                    </span>
                  </td>
                  <td className="text-white font-sora text-sm py-4">{transaction.amount}</td>
                  <td className="py-4">
                    {transaction.status === "Completed" ? (
                      <span className="px-3 py-1.5 bg-[#A2CE3A]/15 text-[#A2CE3A] rounded-full text-xs font-sora font-medium inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A2CE3A]"></span>
                        {transaction.status}
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 bg-[#FF4444]/15 text-[#FF4444] rounded-full text-xs font-sora font-medium inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4444]"></span>
                        {transaction.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function EarningsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <EarningsContent />
    </Suspense>
  );
}
