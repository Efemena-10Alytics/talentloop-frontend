export function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#FFFFFF1A] backdrop-blur-md border border-white/10 rounded-[24px] ${className}`} style={{ backgroundImage: "url('/img3.png')", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
      {children}
    </div>
  );
}
