export interface PaymentSummaryDetails {
  percentPaid: number;
  paidAmount: string;
  remainingAmount: string;
  totalAmount: string;
}

function DonutChart({ percent }: { percent: number }) {
  const size = 140;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(percent, 0), 100) / 100);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#A2CE3A"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="47%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#E8EFF1"
        fontSize="22"
        fontWeight="700"
        fontFamily="var(--font-mona-sans, sans-serif)"
      >
        {percent}%
      </text>
      <text
        x="50%"
        y="63%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#95ACCB"
        fontSize="12"
        fontFamily="var(--font-mona-sans, sans-serif)"
      >
        Paid
      </text>
    </svg>
  );
}

function SummaryRow({ dotColor, label, value }: { dotColor: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm font-mona-sans" style={{ color: dotColor }}>
        <span className="w-2 h-2 rounded-full" style={{ background: dotColor }} />
        {label}
      </span>
      <span className="text-[#E8EFF1] font-mona-sans text-sm font-semibold">{value}</span>
    </div>
  );
}

export default function PaymentSummaryCard({ summary }: { summary: PaymentSummaryDetails }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
    >
      <h3 className="text-white font-mona-sans font-semibold text-base mb-4">Payment Summary</h3>

      <div className="flex justify-center mb-5">
        <DonutChart percent={summary.percentPaid} />
      </div>

      <div className="space-y-3">
        <SummaryRow dotColor="#359E5B" label="Paid" value={summary.paidAmount} />
        <SummaryRow dotColor="#FF8D28" label="Remaining" value={summary.remainingAmount} />
        <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid #FFFFFF0D" }}>
          <span className="text-[#95ACCB] font-mona-sans text-sm pt-2">Total</span>
          <span className="text-[#E8EFF1] font-mona-sans text-sm font-semibold pt-2">{summary.totalAmount}</span>
        </div>
      </div>
    </div>
  );
}
