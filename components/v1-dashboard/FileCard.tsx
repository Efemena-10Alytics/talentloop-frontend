interface FileCardProps {
  name: string;
  description: string;
  status: "Ready" | "Latest";
  icon: string;
}

export default function FileCard({ name, description, status, icon }: FileCardProps) {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        background: "rgba(21, 99, 116, 0.2)",
        border: "0.5px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="flex items-center gap-4">
        {/* File Icon */}
        <div className="text-5xl flex-shrink-0">
          {icon}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-mona-sans font-semibold text-base mb-1">
            {name}
          </h3>
          <p className="text-[#95ACCB] text-sm font-mona-sans">
            {description}
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex-shrink-0">
          {status === "Ready" ? (
            <div
              className="px-4 py-2 rounded-lg"
              style={{
                background: "rgba(20, 174, 92, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <span
                className="text-sm font-mona-sans font-medium"
                style={{ color: "#34C759" }}
              >
                Ready
              </span>
            </div>
          ) : (
            <div
              className="px-4 py-2 rounded-lg"
              style={{
                background: "rgba(0, 0, 0, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <span className="text-sm font-mona-sans font-medium text-white">
                Latest
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Preview Button */}
          <button
            className="px-6 py-2.5 rounded-lg font-mona-sans font-medium text-sm transition-opacity hover:opacity-80"
            style={{
              background: "rgba(0, 0, 0, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              color: "#FFFFFF",
            }}
          >
            Preview
          </button>

          {/* Download Button */}
          <button
            className="px-6 py-2.5 rounded-lg font-mona-sans font-semibold text-sm transition-opacity hover:opacity-90"
            style={{
              background: "#A2CE3A",
              color: "#121212",
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
