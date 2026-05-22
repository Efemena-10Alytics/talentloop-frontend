import ProgressTracker from "./ProgressTracker";

const CalendarIcon = () => (
  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.6 0.5V3.3M4 0.5V3.3M13.1 7.5C13.1 4.8603 13.1 3.5401 12.2796 2.7204C11.4592 1.9007 10.1397 1.9 7.5 1.9H6.1C3.4603 1.9 2.1401 1.9 1.3204 2.7204C0.5007 3.5408 0.5 4.8603 0.5 7.5V8.9C0.5 11.5397 0.5 12.8599 1.3204 13.6796C2.1408 14.4993 3.4603 14.5 6.1 14.5M0.5 6.1H13.1" stroke="#A9B4C4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.1869 12.1906L10.3 11.6999V10.4868M13.1 11.6999C13.1 12.4425 12.805 13.1547 12.2799 13.6798C11.7548 14.2049 11.0426 14.4999 10.3 14.4999C9.55739 14.4999 8.8452 14.2049 8.3201 13.6798C7.795 13.1547 7.5 12.4425 7.5 11.6999C7.5 10.9573 7.795 10.2451 8.3201 9.72C8.8452 9.1949 9.55739 8.8999 10.3 8.8999C11.0426 8.8999 11.7548 9.1949 12.2799 9.72C12.805 10.2451 13.1 10.9573 13.1 11.6999Z" stroke="#A9B4C4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function YourProgress() {
  return (
    <div
      className="rounded-[20px] p-6"
      style={{
        background: "rgba(21, 99, 116, 0.1)",
        borderTop: "0.5px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-white text-lg font-mona-sans font-bold">
          Your Progress
        </h3>
        <span className="text-[#95ACCB] text-sm font-mona-sans ml-auto">7</span>
      </div>

      {/* Progress Tracker */}
      <div className="mb-6">
        <ProgressTracker 
          totalSteps={7} 
          currentStep={2}
          stepLabels={[
            "Onboarding Complete",
            "CV Review",
            "CV Optimisation",
            "LinkedIn Setup",
            "Applications",
            "Interview Prep",
            "Complete"
          ]}
        />
      </div>

      {/* CV Optimization Card */}
      <div
        className="p-4 rounded-2xl mb-4"
        style={{
          background: "rgba(21, 99, 116, 0.2)",
          border: "0.5px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">✏️</span>
          <div className="flex-1">
            <h4 className="text-white font-mona-sans font-semibold text-base mb-1">
              CV Optimisation In Progress
            </h4>
            <p className="text-[#95ACCB] text-sm font-mona-sans">
              Happiness is tailoring your CV for Tolu Analyst role. Est. delivery:{" "}
              <span className="text-white font-medium">Thu 22 May</span>
            </p>
          </div>
        </div>
      </div>

      {/* CV Review Call Card */}
      <div
        className="p-4 rounded-2xl"
        style={{
          background: "rgba(21, 99, 116, 0.1)",
          border: "0.5px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="flex items-center gap-4">
          {/* Date Box */}
          <div
            className="flex flex-col items-center justify-center rounded-[24px] w-20 h-20 flex-shrink-0"
            style={{
              background: "rgba(21, 99, 116, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <p className="text-white text-2xl font-mona-sans font-bold leading-none">22</p>
            <p className="text-[#95ACCB] text-xs font-mona-sans mt-1">May</p>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h4 className="text-white font-mona-sans font-semibold text-base mb-2">
              CV Review Call
            </h4>
            <p className="text-[#95ACCB] text-sm font-mona-sans mb-2">
              With Happiness Abiyo Ibrahim
            </p>
            <div className="flex items-center gap-2 text-[#A9B4C4] text-xs font-mona-sans">
              <CalendarIcon />
              <span>10:00 AM</span>
              <span>•</span>
              <span>30 min</span>
              <span>•</span>
              <span>Google Meet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
