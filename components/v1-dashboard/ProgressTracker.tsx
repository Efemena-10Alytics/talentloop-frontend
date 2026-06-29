type ProgressTrackerProps = {
  totalSteps?: number;
  currentStep?: number;
  stepLabels?: string[];
};

const CheckmarkIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" fill="#A2CE3A" fillOpacity="0.15"/>
    <path d="M16.001 8.03321C18.1224 8.03321 20.1568 8.87588 21.6635 10.3826C23.1702 11.8893 24.0129 13.9237 24.0129 16.0452C24.0129 18.1666 23.1702 20.201 21.6635 21.7077C20.1568 23.2144 18.1224 24.0571 16.001 24.0571C13.8795 24.0571 11.8451 23.2144 10.3384 21.7077C8.83173 20.201 7.98906 18.1666 7.98906 16.0452C7.98906 13.9237 8.83173 11.8893 10.3384 10.3826C11.8451 8.87588 13.8795 8.03321 16.001 8.03321ZM15.0033 17.2046L13.2644 15.4644C13.2027 15.4027 13.1291 15.3537 13.0478 15.3202C12.9665 15.2867 12.8793 15.2693 12.7912 15.2693C12.7031 15.2693 12.6159 15.2867 12.5346 15.3202C12.4533 15.3537 12.3797 15.4027 12.318 15.4644C12.1925 15.5898 12.1217 15.7609 12.1217 15.9395C12.1217 16.1181 12.1925 16.2892 12.318 16.4146L14.5006 18.5972C14.5622 18.6593 14.6357 18.7086 14.717 18.7423C14.7983 18.776 14.8856 18.7935 14.9738 18.7935C15.0619 18.7935 15.1492 18.776 15.2305 18.7423C15.3118 18.7086 15.3854 18.6593 15.447 18.5972L20.1556 13.8873C20.2191 13.8259 20.2704 13.7524 20.3067 13.6709C20.343 13.5894 20.3635 13.5015 20.3639 13.4125C20.3643 13.3235 20.3446 13.2355 20.309 13.1537C20.2734 13.0719 20.2228 12.998 20.1599 12.9361C20.097 12.8741 20.0231 12.8252 19.9422 12.7921C19.8613 12.759 19.7749 12.7423 19.6878 12.7426C19.6007 12.7429 19.5144 12.7602 19.4337 12.7938C19.353 12.8274 19.2794 12.8768 19.217 12.9392L15.0033 17.2046Z" fill="#A2CE3A"/>
  </svg>
);

export default function ProgressTracker({ 
  totalSteps = 7, 
  currentStep = 2,
  stepLabels = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7"]
}: ProgressTrackerProps) {
  return (
    <div>
      {/* Desktop View */}
      <div className="hidden lg:block w-full relative overflow-hidden">
        {/* Continuous connecting line - starts and ends at circle centers */}
        <div
          className="absolute h-[2px] top-[16px]"
          style={{ background: "#A2CE3A", left: "calc(100% / 14)", right: "calc(100% / 14)" }}
        />
        {/* Steps */}
        <div className="relative flex items-start justify-between w-full">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber <= currentStep;

            return (
              <div key={stepNumber} className="flex flex-col items-center relative z-10">
                {/* Step Circle or Checkmark */}
                <div className="flex-shrink-0 mb-2 rounded-full bg-[#0B0D0F]">
                  {isCompleted ? (
                    <div className="rounded-full bg-[#0B0D0F]">
                      <CheckmarkIcon />
                    </div>
                  ) : (
                    <div
                      className="w-[32px] h-[32px] text-[#F0F5FF] text-xs font-semibold font-mona-sans rounded-full flex items-center justify-center border-2 bg-[#0B0D0F]"
                      style={{
                        borderColor: "#A2CE3A",
                      }}
                    >
                      0{stepNumber}
                    </div>
                  )}
                </div>
                {/* Step Label */}
                <p className="text-[#F0F5FF] text-[10px] font-mona-sans font-semibold text-center whitespace-nowrap">
                  {stepLabels[index]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View - Grid Format */}
      <div className="grid grid-cols-4 gap-3 lg:hidden">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center">
              {/* Step Circle or Checkmark */}
              <div className="mb-2">
                {isCompleted ? (
                  <CheckmarkIcon />
                ) : (
                  <div
                    className="w-[32px] h-[32px] rounded-full flex items-center justify-center border-2"
                    style={{
                      borderColor: "#A2CE3A",
                      background: "transparent",
                    }}
                  >      0{stepNumber}
                    </div>
                )}
              </div>
              {/* Step Label */}
              <p className="text-[#F0F5FF] text-[9px] font-mona-sans text-center opacity-60">
                {stepLabels[index]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
