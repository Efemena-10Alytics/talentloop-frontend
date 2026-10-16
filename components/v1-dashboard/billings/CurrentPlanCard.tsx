export interface CurrentPlanDetails {
  planLabel: string;
  statusLabel: string;
  planAmount: string;
  installments: number;
  installmentAmount: string;
  startDate: string;
  nextDueDate: string;
  paymentMethod: string;
}

const PlanIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="17" rx="3" stroke="#A2CE3A" strokeWidth="1.6" />
    <path d="M3 9h18M8 2v4M16 2v4" stroke="#A2CE3A" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#95ACCB] font-mona-sans text-sm">{label}</span>
      <span className="text-[#E8EFF1] font-mona-sans text-sm font-semibold">{value}</span>
    </div>
  );
}

export default function CurrentPlanCard({ plan }: { plan: CurrentPlanDetails }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
    >
      <h3 className="text-white font-mona-sans font-semibold text-base mb-4">Current Plan</h3>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(162, 206, 58, 0.15)" }}
          >
            <PlanIcon />
          </div>
          <span className="text-white font-mona-sans font-semibold text-sm">{plan.planLabel}</span>
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-jakarta-sans font-medium"
          style={{ color: "#FF8D28", background: "rgba(255, 141, 40, 0.1)" }}
        >
          {plan.statusLabel}
        </span>
      </div>

      <div className="space-y-3">
        <Row label="Plan Amount" value={plan.planAmount} />
        <Row label="Installments" value={String(plan.installments)} />
        <Row label="Installment Amount" value={plan.installmentAmount} />
        <Row label="Start Date" value={plan.startDate} />
        <Row label="Next Due Date" value={plan.nextDueDate} />
        <Row label="Payment Method" value={plan.paymentMethod} />
      </div>
    </div>
  );
}
