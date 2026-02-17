"use client";

import { useRouter } from "next/navigation";
import { GlassCard } from "./GlassCard";

const ChevronRightSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditProfileSVG = () => (
  <svg width="47" height="49" viewBox="0 0 47 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.210662" y="0.210662" width="45.8077" height="47.8176" rx="11.965" fill="#F3F5F7"/>
    <rect x="0.210662" y="0.210662" width="45.8077" height="47.8176" rx="11.965" stroke="#D0D5DD" strokeWidth="0.421324"/>
    <path d="M17.0845 33.1648V31.1548C17.0845 30.0887 17.508 29.0662 18.2619 28.3123C19.0158 27.5585 20.0382 27.1349 21.1044 27.1349H25.1243C26.1904 27.1349 27.2129 27.5585 27.9668 28.3123C28.7207 29.0662 29.1442 30.0887 29.1442 31.1548V33.1648M19.0944 19.0951C19.0944 20.1613 19.518 21.1837 20.2718 21.9376C21.0257 22.6915 22.0482 23.115 23.1143 23.115C24.1805 23.115 25.203 22.6915 25.9569 21.9376C26.7107 21.1837 27.1343 20.1613 27.1343 19.0951C27.1343 18.029 26.7107 17.0065 25.9569 16.2526C25.203 15.4987 24.1805 15.0752 23.1143 15.0752C22.0482 15.0752 21.0257 15.4987 20.2718 16.2526C19.518 17.0065 19.0944 18.029 19.0944 19.0951Z" stroke="black" strokeWidth="2.00996" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SetAvailabilitySVG = () => (
  <svg width="47" height="49" viewBox="0 0 47 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.210662" y="0.210662" width="45.8077" height="47.8176" rx="11.965" fill="#F3F5F7"/>
    <rect x="0.210662" y="0.210662" width="45.8077" height="47.8176" rx="11.965" stroke="#D0D5DD" strokeWidth="0.421324"/>
    <path d="M30.1491 16.0803H28.1391V15.0753C28.1391 14.8088 28.0332 14.5531 27.8448 14.3647C27.6563 14.1762 27.4007 14.0703 27.1341 14.0703C26.8676 14.0703 26.612 14.1762 26.4235 14.3647C26.2351 14.5531 26.1292 14.8088 26.1292 15.0753V16.0803H20.0993V15.0753C20.0993 14.8088 19.9934 14.5531 19.8049 14.3647C19.6165 14.1762 19.3609 14.0703 19.0943 14.0703C18.8278 14.0703 18.5722 14.1762 18.3837 14.3647C18.1952 14.5531 18.0893 14.8088 18.0893 15.0753V16.0803H16.0794C15.2798 16.0803 14.5129 16.3979 13.9475 16.9633C13.3821 17.5287 13.0645 18.2956 13.0645 19.0952V31.1549C13.0645 31.9546 13.3821 32.7214 13.9475 33.2868C14.5129 33.8522 15.2798 34.1699 16.0794 34.1699H30.1491C30.9487 34.1699 31.7156 33.8522 32.281 33.2868C32.8464 32.7214 33.164 31.9546 33.164 31.1549V19.0952C33.164 18.2956 32.8464 17.5287 32.281 16.9633C31.7156 16.3979 30.9487 16.0803 30.1491 16.0803ZM31.1541 31.1549C31.1541 31.4215 31.0482 31.6771 30.8597 31.8656C30.6712 32.054 30.4156 32.1599 30.1491 32.1599H16.0794C15.8129 32.1599 15.5572 32.054 15.3688 31.8656C15.1803 31.6771 15.0744 31.4215 15.0744 31.1549V24.1201H31.1541V31.1549ZM31.1541 22.1101H15.0744V19.0952C15.0744 18.8287 15.1803 18.573 15.3688 18.3846C15.5572 18.1961 15.8129 18.0902 16.0794 18.0902H18.0893V19.0952C18.0893 19.3617 18.1952 19.6174 18.3837 19.8058C18.5722 19.9943 18.8278 20.1002 19.0943 20.1002C19.3609 20.1002 19.6165 19.9943 19.8049 19.8058C19.9934 19.6174 20.0993 19.3617 20.0993 19.0952V18.0902H26.1292V19.0952C26.1292 19.3617 26.2351 19.6174 26.4235 19.8058C26.612 19.9943 26.8676 20.1002 27.1341 20.1002C27.4007 20.1002 27.6563 19.9943 27.8448 19.8058C28.0332 19.6174 28.1391 19.3617 28.1391 19.0952V18.0902H30.1491C30.4156 18.0902 30.6712 18.1961 30.8597 18.3846C31.0482 18.573 31.1541 18.8287 31.1541 19.0952V22.1101Z" fill="black"/>
  </svg>
);

const PricingSetupSVG = () => (
  <svg width="47" height="49" viewBox="0 0 47 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.210662" y="0.210662" width="45.8077" height="47.8176" rx="11.965" fill="#F3F5F7"/>
    <rect x="0.210662" y="0.210662" width="45.8077" height="47.8176" rx="11.965" stroke="#D0D5DD" strokeWidth="0.421324"/>
    <path d="M23.1143 14.0703V34.1699M28.1392 17.0852H20.6019C19.669 17.0852 18.7743 17.4558 18.1147 18.1155C17.4551 18.7751 17.0845 19.6698 17.0845 20.6027C17.0845 21.5355 17.4551 22.4302 18.1147 23.0899C18.7743 23.7495 19.669 24.1201 20.6019 24.1201H25.6268C26.5597 24.1201 27.4543 24.4907 28.114 25.1503C28.7736 25.81 29.1442 26.7046 29.1442 27.6375C29.1442 28.5704 28.7736 29.4651 28.114 30.1247C27.4543 30.7844 26.5597 31.1549 25.6268 31.1549H17.0845" stroke="black" strokeWidth="2.00996" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CoachGuideSVG = () => (
  <svg width="47" height="49" viewBox="0 0 47 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.210662" y="0.210662" width="45.8077" height="47.8176" rx="11.965" fill="#F3F5F7"/>
    <rect x="0.210662" y="0.210662" width="45.8077" height="47.8176" rx="11.965" stroke="#D0D5DD" strokeWidth="0.421324"/>
    <path d="M23.1143 19.5976C23.868 16.6222 26.7148 15.103 32.9128 15.0752C33.0119 15.0748 33.1101 15.0941 33.2017 15.1318C33.2933 15.1696 33.3766 15.2251 33.4466 15.2951C33.5167 15.3652 33.5722 15.4484 33.6099 15.5401C33.6477 15.6317 33.6669 15.7298 33.6665 15.8289V29.3961C33.6665 29.596 33.5871 29.7878 33.4458 29.9291C33.3044 30.0705 33.1127 30.1499 32.9128 30.1499C26.8829 30.1499 24.5534 31.3657 23.1143 33.1648M23.1143 19.5976C22.3605 16.6222 19.5138 15.103 13.3158 15.0752C13.2167 15.0748 13.1185 15.0941 13.0269 15.1318C12.9353 15.1696 12.852 15.2251 12.7819 15.2951C12.7119 15.3652 12.6564 15.4484 12.6186 15.5401C12.5809 15.6317 12.5616 15.7298 12.562 15.8289V29.3052C12.562 29.7706 12.8503 30.1499 13.3158 30.1499C19.3456 30.1499 21.6836 31.3747 23.1143 33.1648M23.1143 19.5976V33.1648" stroke="black" strokeWidth="1.00498" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function QuickActionItem({ icon, title, subtitle, href }: { icon: React.ReactNode; title: string; subtitle: string; href: string }) {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href)} className="flex items-center gap-3 bg-[#FFFFFF0D] backdrop-blur-sm border border-white/10 rounded-[16px] p-4 hover:bg-[#FFFFFF1A] transition-colors cursor-pointer w-full text-left">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-mona-sans font-bold text-sm">{title}</p>
        <p className="text-white/50 font-mona-sans text-xs mt-0.5">{subtitle}</p>
      </div>
      <ChevronRightSVG />
    </button>
  );
}

export function QuickActionsCard() {
  return (
    <GlassCard className="p-6 lg:p-8">
      <h2 className="text-white font-mona-sans font-bold text-lg mb-5">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <QuickActionItem icon={<EditProfileSVG />} title="Edit Profile" subtitle="Update your coaching profile" href="/manage-your-profile/edit" />
        <QuickActionItem icon={<SetAvailabilitySVG />} title="Set Availability" subtitle="Configure your schedule" href="/manage-your-profile/set-availability" />
        <QuickActionItem icon={<PricingSetupSVG />} title="Pricing Setup" subtitle="Set your session rates" href="/manage-your-profile/set-price" />
        <QuickActionItem icon={<CoachGuideSVG />} title="Coach Guide" subtitle="Best practices & tips" href="/manage-your-profile/coaching-practices" />
      </div>
    </GlassCard>
  );
}
