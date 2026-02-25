import { Suspense } from "react";

function EarningsContent() {
  return (
    <div>
      <h1 className="text-white font-mona-sans font-bold text-2xl lg:text-3xl mb-4">Earnings</h1>
      <p className="text-white/50 font-mona-sans">Track your earnings and payouts here.</p>
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
