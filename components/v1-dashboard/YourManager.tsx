interface YourManagerProps {
  name: string;
  rating?: number | null;
  title: string;
  imageUrl?: string | null;
  meetingLink?: string | null;
}

export default function YourManager({
  name,
  rating,
  title,
  imageUrl,
  meetingLink,
}: YourManagerProps) {
  return (
    <div
      className="rounded-[20px] p-6 flex flex-col"
      style={{
        background: "#1563741A",
        borderTop: "#FFFFFF1A",
      }}
    >
      {/* Header */}
      <h3 className="text-white text-lg font-mona-sans font-bold mb-6">
        Your Manager
      </h3>

      {/* Manager Image */}
      <div className="mb-6 rounded-[10px] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-[220px] object-cover"
          />
        ) : (
          <div className="w-full h-[120px] flex justify-center items-center">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="80"
                height="80"
                rx="40"
                fill="#A2CE3A"
                fill-opacity="0.24"
              />
              <path
                d="M57.5 19H22.5C21.5717 19 20.6815 19.3687 20.0251 20.0251C19.3687 20.6815 19 21.5717 19 22.5V57.5C19 58.4283 19.3687 59.3185 20.0251 59.9749C20.6815 60.6312 21.5717 61 22.5 61H57.5C58.4283 61 59.3185 60.6312 59.9749 59.9749C60.6312 59.3185 61 58.4283 61 57.5V22.5C61 21.5717 60.6312 20.6815 59.9749 20.0251C59.3185 19.3687 58.4283 19 57.5 19ZM29.5 57.5H22.5V22.5H29.5V57.5ZM50.5 45.25H36.5C36.0359 45.25 35.5908 45.0656 35.2626 44.7374C34.9344 44.4093 34.75 43.9641 34.75 43.5C34.75 43.0359 34.9344 42.5907 35.2626 42.2626C35.5908 41.9344 36.0359 41.75 36.5 41.75H50.5C50.9641 41.75 51.4092 41.9344 51.7374 42.2626C52.0656 42.5907 52.25 43.0359 52.25 43.5C52.25 43.9641 52.0656 44.4093 51.7374 44.7374C51.4092 45.0656 50.9641 45.25 50.5 45.25ZM50.5 38.25H36.5C36.0359 38.25 35.5908 38.0656 35.2626 37.7374C34.9344 37.4092 34.75 36.9641 34.75 36.5C34.75 36.0359 34.9344 35.5908 35.2626 35.2626C35.5908 34.9344 36.0359 34.75 36.5 34.75H50.5C50.9641 34.75 51.4092 34.9344 51.7374 35.2626C52.0656 35.5908 52.25 36.0359 52.25 36.5C52.25 36.9641 52.0656 37.4092 51.7374 37.7374C51.4092 38.0656 50.9641 38.25 50.5 38.25Z"
                fill="#161719"
              />
            </svg>
          </div>
        )}
      </div>


  
      {/* Manager Info */}
        {name ? (
      <div className="relative text-center">
          <>
            <div className="flex items-center gap-2">
              <h4 className="text-white font-mona-sans font-semibold text-sm 2xl:text-base mb-2">
                {name}
              </h4>
              {rating != null && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#A2CE3A] text-lg">⭐</span>
                  <span className="text-white text-sm font-mona-sans">
                    {rating}
                  </span>
                </div>
              )}
            </div>
            <div
              className="absolute lg:-top-20 right-5 2xl:right-10 w-fit px-4 py-1.5 rounded-full"
              style={{
                background: "#E7FFAE",
              }}
            >
              <p className="text-[#0B0D0F] text-[9px] 2xl:text-xs font-sora font-medium">
                {title}
              </p>
            </div>
          </>
      </div>
        ) : (
          <></>
        )}

{!name && (
<div  className="flex flex-col items-center gap-5">

            <span className="text-[#A2CE3A] font-jakarta-sans text-base font-semibold">
              You’ve not been assigned a manager yet
            </span>
            <span className="text-[#5C6777] font-jakarta-sans text-base font-semibold">
              This will be done within 24hrs
            </span>
          
</div>
)}

      {/* Join Session Button */}
      {meetingLink ? (
        <a
          href={meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-[10px] font-sora font-semibold text-sm transition-opacity hover:opacity-90 text-center block"
          style={{
            background: "#A2CE3A",
            color: "#121212",
          }}
        >
          Join Session
        </a>
      ) : (
        <>
        </>
        // <button
        //   disabled
        //   className="w-full py-3 rounded-[10px] font-sora font-semibold text-sm opacity-40 cursor-not-allowed"
        //   style={{
        //     background: "#A2CE3A",
        //     color: "#121212",
        //   }}
        // >
        //   No Session Scheduled
        // </button>
      )}
    </div>
  );
}
