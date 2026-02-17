import { GlassCard } from "./GlassCard";

const QuickStatsSVG = () => (
  <svg width="21" height="12" viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.8418 0.920898H19.5845V6.66363" stroke="#A2CE3A" strokeWidth="1.84248" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.5853 0.920898L11.4737 9.03251C11.3395 9.16404 11.1591 9.23771 10.9712 9.23771C10.7833 9.23771 10.6029 9.16404 10.4687 9.03251L7.16661 5.73044C7.03242 5.59891 6.85202 5.52524 6.66412 5.52524C6.47622 5.52524 6.29582 5.59891 6.16163 5.73044L0.921387 10.9707" stroke="#A2CE3A" strokeWidth="1.84248" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GreenDashSVG = () => (
  <svg width="19" height="2" viewBox="0 0 19 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0 1.00498C0 0.738441 0.105881 0.482821 0.294351 0.294351C0.482821 0.105882 0.738441 0 1.00498 0H17.0846C17.3512 0 17.6068 0.105882 17.7953 0.294351C17.9837 0.482821 18.0896 0.738441 18.0896 1.00498C18.0896 1.27152 17.9837 1.52713 17.7953 1.7156C17.6068 1.90407 17.3512 2.00996 17.0846 2.00996H1.00498C0.738441 2.00996 0.482821 1.90407 0.294351 1.7156C0.105881 1.52713 0 1.27152 0 1.00498Z" fill="#A2CE3A"/>
  </svg>
);

export function QuickStatsCard() {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <QuickStatsSVG />
        <h3 className="text-white font-mona-sans font-bold text-base">Quick Stats</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-white font-mona-sans text-sm font-semibold">Profile Views</span>
          <GreenDashSVG />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white font-mona-sans text-sm font-semibold">Sessions Completed</span>
          <GreenDashSVG />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white font-mona-sans text-sm font-semibold">Total Earnings</span>
          <GreenDashSVG />
        </div>
      </div>

      <p className="text-white/40 font-mona-sans text-xs mt-4">Stats available once your profile is live</p>
    </GlassCard>
  );
}
