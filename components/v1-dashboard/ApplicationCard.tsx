type ApplicationCardProps = {
  application: {
    company: string;
    position: string;
    location: string;
    date: string;
    status: "Sponsored" | "Call Scheduled" | "Open" | "Done";
  };
};

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Sponsored":
        return {
          bg: "rgba(20, 174, 92, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          color: "#34C759",
        };
      case "Call Scheduled":
        return {
          bg: "rgba(255, 204, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          color: "#FFCC00",
        };
      case "Open":
        return {
          bg: "rgba(60, 60, 67, 0.18)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          color: "#FFFFFF",
        };
      case "Done":
        return {
          bg: "rgba(60, 60, 67, 0.18)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          color: "#95ACCB",
        };
      default:
        return {
          bg: "rgba(60, 60, 67, 0.18)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          color: "#FFFFFF",
        };
    }
  };

  const statusStyles = getStatusStyles(application.status);

  return (
    <div
      className="p-3 rounded-lg w-full"
      style={{
        background: "rgba(21, 99, 116, 0.1)",
        border: "0.5px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="w-full flex items-start justify-between mb-2">
        <div className="w-full flex flex-col gap-1">
         
         <div className="w-full flex gap-3">
                    <div className="w-[60%]">

          <h3 className="text-white font-mona-sans font-semibold text-[12px] 2xl:text-sm">
            {application.company}
          </h3>
                    </div>
          <div className="w-[40%]">
             <span
            className="w-fit text-[8px] font-jakarta-sans font-medium px-3 py-1 rounded-[100px]"
            style={{
              color: statusStyles.color,
            background: statusStyles.bg,
            border: statusStyles.border,
          }}
          >
            {application.status == "Call Scheduled" ? "Call S." : application.status}
          </span>
          </div>
         </div>
          <p className="text-[#95ACCB] text-xs font-mona-sans">
            {application.position} · {application.location}
          </p>
        </div>
       
      </div>
      <p className="text-[#657997] text-xs font-mona-sans">{application.date}</p>
    </div>
  );
}
