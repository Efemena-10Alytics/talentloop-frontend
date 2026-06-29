interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const TrendUpIcon = () => (
  <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.97805 3.38479L6.10555 1.51229L4.96221 0.363125C4.47805 -0.121042 3.69055 -0.121042 3.20638 0.363125L0.184715 3.38479C-0.211952 3.78146 0.0738811 4.45812 0.628048 4.45812H3.90055H7.53471C8.09471 4.45812 8.37471 3.78146 7.97805 3.38479Z" fill="#9EFF00"/>
  </svg>
);

export default function StatCard({ title, value, trend }: StatCardProps) {
  return (
    <div
      className="bg-[#1563741A] border border-[#FFFFFF1A] rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[#95ACCB] text-xs font-mona-sans uppercase tracking-wide">
          {title}
        </p>
        {trend && (
          <div className="flex items-center gap-1.5">
            <TrendUpIcon />
            <span className="text-[#9EFF00] text-xs font-mona-sans font-medium">
              {trend.value}
            </span>
          </div>
        )}
      </div>
      <p className="text-white text-3xl lg:text-4xl font-mona-sans font-bold">
        {value}
      </p>
    </div>
  );
}
