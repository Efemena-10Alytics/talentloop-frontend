
interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  title?: string;
}

export default function UpgradeModal({
  isOpen,
  onClose,
  onUpgrade,
  title = "Upgrade your package to have access.",
}: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000000DB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)",
          width: "520px",
          maxWidth: "calc(100vw - 32px)",
          borderRadius: "24px",
          paddingTop: "53px",
          paddingRight: "40px",
          paddingBottom: "53px",
          paddingLeft: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Padlock icon */}
        <svg
          width="88"
          height="95"
          viewBox="0 0 88 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: "8px" }}
        >
          <rect
            width="87.7232"
            height="94.7232"
            rx="19.3616"
            fill="#A2CE3A"
            fillOpacity="0.2"
          />
          <path
            d="M64.278 38.028H56.1113V31.8058C56.1113 28.5053 54.8207 25.34 52.5234 23.0062C50.2261 20.6724 47.1102 19.3613 43.8613 19.3613C40.6124 19.3613 37.4966 20.6724 35.1993 23.0062C32.9019 25.34 31.6113 28.5053 31.6113 31.8058V38.028H23.4447C22.3617 38.028 21.3231 38.465 20.5573 39.243C19.7915 40.0209 19.3613 41.076 19.3613 42.1761V71.2132C19.3613 72.3133 19.7915 73.3684 20.5573 74.1464C21.3231 74.9243 22.3617 75.3613 23.4447 75.3613H64.278C65.361 75.3613 66.3996 74.9243 67.1653 74.1464C67.9311 73.3684 68.3613 72.3133 68.3613 71.2132V42.1761C68.3613 41.076 67.9311 40.0209 67.1653 39.243C66.3996 38.465 65.361 38.028 64.278 38.028ZM45.903 58.4136V64.991C45.903 65.541 45.6879 66.0686 45.305 66.4576C44.9221 66.8465 44.4028 67.065 43.8613 67.065C43.3198 67.065 42.8005 66.8465 42.4177 66.4576C42.0348 66.0686 41.8197 65.541 41.8197 64.991V58.4136C40.4574 57.9243 39.3093 56.9616 38.5782 55.6955C37.8472 54.4295 37.5802 52.9417 37.8245 51.495C38.0689 50.0483 38.8088 48.736 39.9134 47.7899C41.0181 46.8439 42.4165 46.325 43.8613 46.325C45.3062 46.325 46.7045 46.8439 47.8092 47.7899C48.9139 48.736 49.6538 50.0483 49.8981 51.495C50.1424 52.9417 49.8755 54.4295 49.1444 55.6955C48.4133 56.9616 47.2652 57.9243 45.903 58.4136ZM52.028 38.028H35.6947V31.8058C35.6947 29.6055 36.5551 27.4953 38.0866 25.9394C39.6182 24.3835 41.6954 23.5095 43.8613 23.5095C46.0273 23.5095 48.1045 24.3835 49.636 25.9394C51.1676 27.4953 52.028 29.6055 52.028 31.8058V38.028Z"
            fill="#A2CE3A"
          />
        </svg>

        {/* Heading */}
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "1.3",
            textAlign: "center",
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          {title}
        </p>

        {/* CTA button */}
        <button
          onClick={onUpgrade}
          style={{
            background: "#A2CE3A",
            height: "48px",
            borderRadius: "90px",
            paddingTop: "14px",
            paddingRight: "48px",
            paddingBottom: "14px",
            paddingLeft: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            border: "none",
            cursor: "pointer",
            marginTop: "24px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#0F0F0F",
          }}
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}