"use client";

const pipelineData = [
  { label: "Basic (£70)",          color: "#FF9500", value: 9,  max: 20 },
  { label: "Premium (£250)",       color: "#34C759", value: 14, max: 20 },
  { label: "Comprehensive (£350)", color: "#0088FF", value: 10, max: 20 },
  { label: "Platinum (£200)",      color: "#CB30E0", value: 5,  max: 20 },
];

export default function ClientPipeline() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <h2 className="text-white font-mona-sans font-semibold text-base">
          Client Pipeline by Package
        </h2>
        <span className="font-mona-sans text-sm" style={{ color: "#95ACCB" }}>
          {pipelineData.length}
        </span>
      </div>

      <div className="space-y-5">
        {pipelineData.map((item) => (
          <div key={item.label} className="flex items-center gap-4">
            {/* Label */}
            <span
              className="font-mona-sans text-sm flex-shrink-0"
              style={{ color: "#E8EFF1", width: "175px" }}
            >
              {item.label}
            </span>

            {/* Bar track */}
            <div
              className="flex-1 rounded-full overflow-hidden"
              style={{ height: "8px", background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(item.value / item.max) * 100}%`,
                  background: item.color,
                }}
              />
            </div>

            {/* Count */}
            <span
              className="font-mona-sans font-semibold text-sm flex-shrink-0 text-right"
              style={{ color: "#E8EFF1", width: "24px" }}
            >
              {String(item.value).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}