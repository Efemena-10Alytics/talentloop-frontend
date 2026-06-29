interface YourManagerProps {
  name: string;
  rating: number;
  title: string;
  imageUrl?: string;
}

export default function YourManager({ name, rating, title, imageUrl }: YourManagerProps) {
  return (
    <div
      className="rounded-[20px] p-6 flex flex-col"
      style={{
        background: "rgba(21, 99, 116, 0.1)",
        borderTop: "0.5px solid rgba(255, 255, 255, 0.1)",
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
          <div 
            className="w-full bg-gradient-to-br from-[#A2CE3A] to-[#156374] flex items-center justify-center"
            style={{ minHeight: "220px"}}
          >
            <div className="w-32 h-32 rounded-full bg-white/20" />
          </div>
        )}
      </div>

      {/* Manager Info */}
      <div className="relative text-center">
        <div className="flex items-center gap-2">
        <h4 className="text-white font-mona-sans font-semibold text-sm 2xl:text-base mb-2">
          {name}
        </h4>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[#A2CE3A] text-lg">⭐</span>
          <span className="text-white text-sm font-mona-sans">{rating}</span>
        </div>
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
      </div>

      {/* Join Session Button */}
      <button
        className="w-full py-3 rounded-[10px] font-sora font-semibold text-sm transition-opacity hover:opacity-90"
        style={{
          background: "#A2CE3A",
          color: "#121212",
        }}
      >
        Join Session
      </button>
    </div>
  );
}
