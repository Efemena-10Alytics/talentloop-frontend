import { GlassCard } from "./GlassCard";

const ClockSVG = () => (
  <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.4278 0C28.6054 0 36.8555 8.24951 36.8555 18.4264C36.8555 28.6033 28.6054 36.8528 18.4278 36.8528C8.25011 36.8528 0 28.6033 0 18.4264C0 8.24951 8.25011 0 18.4278 0ZM18.4278 3.68528C14.5179 3.68528 10.7682 5.23836 8.00345 8.00286C5.23875 10.7674 3.68555 14.5168 3.68555 18.4264C3.68555 22.336 5.23875 26.0855 8.00345 28.85C10.7682 31.6145 14.5179 33.1676 18.4278 33.1676C22.3377 33.1676 26.0874 31.6145 28.8521 28.85C31.6168 26.0855 33.17 22.336 33.17 18.4264C33.17 14.5168 31.6168 10.7674 28.8521 8.00286C26.0874 5.23836 22.3377 3.68528 18.4278 3.68528ZM18.4278 7.37057C18.8791 7.37063 19.3148 7.53633 19.6521 7.83623C19.9894 8.13614 20.2048 8.5494 20.2577 8.99762L20.2705 9.21321V17.6636L25.2589 22.6516C25.5894 22.9832 25.7813 23.4282 25.7956 23.8961C25.8099 24.364 25.6455 24.8199 25.3359 25.171C25.0262 25.5221 24.5945 25.7423 24.1285 25.7867C23.6624 25.8311 23.1969 25.6964 22.8265 25.41L22.6533 25.2571L17.1249 19.7292C16.8385 19.4425 16.6546 19.0695 16.6016 18.6678L16.585 18.4264V9.21321C16.585 8.72451 16.7791 8.25583 17.1247 7.91027C17.4703 7.5647 17.939 7.37057 18.4278 7.37057Z" fill="#A2CE3A"/>
  </svg>
);

export function ApplicationStatusCard() {
  return (
    <GlassCard className="p-6 lg:p-8">
      <h2 className="text-white font-mona-sans font-bold text-lg mb-5">Application Status</h2>

      {/* Status Row */}
      <div className="flex items-start gap-4 mb-6">
        <ClockSVG />
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-mona-sans font-semibold bg-[#A2CE3A]/20 text-[#A2CE3A] border border-[#A2CE3A]/30">Under Review</span>
            <span className="text-white/50 font-mona-sans text-sm">Est. 2-3 days</span>
          </div>
          <p className="text-white/70 font-mona-sans text-sm leading-relaxed">
            Your application is being reviewed by our team. This typically takes 2-3 business days.
          </p>
        </div>
      </div>

      {/* What happens next */}
      <div className="bg-[#FFFFFF0A] border border-white/10 rounded-[16px] p-5">
        <div className="flex items-center gap-2 mb-3">
          <ClockSVG />
          <span className="text-[#A2CE3A] font-mona-sans font-bold text-sm">What happens next?</span>
        </div>
        <div className="space-y-1.5 pl-1">
          <p className="text-white/60 font-mona-sans text-sm">Our team reviews your qualifications</p>
          <p className="text-white/60 font-mona-sans text-sm">You may be asked to complete a brief assessment</p>
          <p className="text-white/60 font-mona-sans text-sm">Once approved, your profile goes live immediately</p>
        </div>
      </div>
    </GlassCard>
  );
}
