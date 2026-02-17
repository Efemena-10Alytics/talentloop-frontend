import { GlassCard } from "./GlassCard";

const CheckmarkSVG = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0597 0C18.7203 0 24.1195 5.39915 24.1195 12.0597C24.1195 18.7203 18.7203 24.1195 12.0597 24.1195C5.39915 24.1195 0 18.7203 0 12.0597C0 5.39915 5.39915 0 12.0597 0ZM12.0597 1.80896C9.34106 1.80896 6.73374 2.88895 4.81134 4.81134C2.88895 6.73374 1.80896 9.34106 1.80896 12.0597C1.80896 14.7784 2.88895 17.3857 4.81134 19.3081C6.73374 21.2305 9.34106 22.3105 12.0597 22.3105C14.7784 22.3105 17.3857 21.2305 19.3081 19.3081C21.2305 17.3857 22.3105 14.7784 22.3105 12.0597C22.3105 9.34106 21.2305 6.73374 19.3081 4.81134C17.3857 2.88895 14.7784 1.80896 12.0597 1.80896ZM10.5523 13.7963L15.943 8.40564C16.1046 8.2453 16.3207 8.15179 16.5482 8.14377C16.7757 8.13576 16.9979 8.21384 17.1704 8.36242C17.3428 8.51099 17.4529 8.71915 17.4787 8.94534C17.5045 9.17152 17.444 9.39911 17.3093 9.58267L17.2213 9.68397L11.1914 15.7138C11.0383 15.867 10.8353 15.9602 10.6193 15.9763C10.4033 15.9925 10.1886 15.9306 10.0144 15.8019L9.91311 15.7138L6.89817 12.6989C6.73783 12.5373 6.64432 12.3212 6.63631 12.0937C6.6283 11.8662 6.70637 11.644 6.85495 11.4715C7.00353 11.299 7.21168 11.1889 7.43787 11.1632C7.66406 11.1374 7.89164 11.1979 8.0752 11.3325L8.1765 11.4206L10.5523 13.7963Z" fill="#A2CE3A"/>
  </svg>
);

const UncheckedCircleSVG = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12.06" cy="12.06" r="11.06" stroke="#555" strokeWidth="2"/>
  </svg>
);

export function ProfileCompletionCard() {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-mona-sans font-bold text-lg">Profile Completion</h2>
        <span className="text-[#A2CE3A] font-mona-sans font-bold text-lg">40%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full mb-5">
        <div className="h-full bg-[#A2CE3A] rounded-full" style={{ width: "40%" }} />
      </div>

      {/* Checklist */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          <CheckmarkSVG />
          <span className="text-white font-mona-sans text-sm font-semibold">Profile completed</span>
        </div>
        <div className="flex items-center gap-3">
          <CheckmarkSVG />
          <span className="text-white font-mona-sans text-sm font-semibold">Photo uploaded</span>
        </div>
        <div className="flex items-center gap-3">
          <UncheckedCircleSVG />
          <span className="text-white/50 font-mona-sans text-sm">Availability set</span>
        </div>
        <div className="flex items-center gap-3">
          <UncheckedCircleSVG />
          <span className="text-white/50 font-mona-sans text-sm">Pricing configured</span>
        </div>
        <div className="flex items-center gap-3">
          <CheckmarkSVG />
          <span className="text-white font-mona-sans text-sm font-semibold">Bio added</span>
        </div>
      </div>
    </GlassCard>
  );
}
