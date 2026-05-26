const WarningIcon = () => (
  <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.5 36.5H26.52M26.5 16.5V29M51.5 26.5C51.5 12.6925 40.3075 1.5 26.5 1.5C12.6925 1.5 1.5 12.6925 1.5 26.5C1.5 40.3075 12.6925 51.5 26.5 51.5C40.3075 51.5 51.5 40.3075 51.5 26.5Z" stroke="#FBC02D" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface WelcomeCardProps {
  userName: string;
  cvScore: number;
  managerName: string;
  deliveryDate: string;
}

export default function WelcomeCard({ userName, cvScore, managerName, deliveryDate }: WelcomeCardProps) {
  return (
    <div
      className="rounded-[20px] overflow-hidden flex flex-col justify-between"
      style={{
        background: "radial-gradient(circle at center, #2b513b 0%, #010009 100%)",
      }}
    >
      {/* Welcome Section */}
      <div className="p-6 lg:p-8">
        <p className="text-white text-sm font-mona-sans mb-2">
          Welcome to Your Dashboard
        </p>
        <span className="text-4xl lg:text-5xl font-mona-sans font-bold flex gap-2">

        <h2
          className="text-4xl lg:text-5xl font-mona-sans font-bold mb-6"
          style={{
            background: "linear-gradient(90.16deg, #FFFFFF 0.14%, rgba(255, 255, 255, 0.7) 105.9%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Hello {userName} 
        </h2>
        👋
        </span>
      </div>

      {/* CV Score Section */}
      <div
        className="p-6 lg:p-8 backdrop-blur-[32px]"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          borderTop: "0.5px solid rgba(255, 255, 255, 0.1)",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <WarningIcon />
          </div>
          <div className="flex-1">
            <p className="text-white font-mona-sans font-semibold text-base mb-2">
              Your CV Score:{" "}
              <span style={{ color: "#FBC02D" }}>{cvScore}/100</span>
            </p>
            <p className="text-white/90 text-sm font-mona-sans leading-relaxed">
              Your manager {managerName} is currently optimising your CV. Expected delivery:{" "}
              <span className="font-semibold">{deliveryDate}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
