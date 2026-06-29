export const RightSideComponent = () => {
  return (
    <div
      className="w-full hidden lg:flex flex-col bg-cover bg-center h-full overflow-hidden relative px-6 pt-20"
      style={{
        backgroundImage: "url('/Frame 2121452990 (1).png')",
      }}
    >
      {/* Tagline */}
      <div className="flex justify-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-white text-2xl xl:text-4xl font-mona-sans font-bold leading-snug">
            Apply Faster. Interview
          </h2>
          <h2 className="text-white text-2xl xl:text-4xl font-mona-sans font-bold leading-snug">
            Smarter. Get Hired.{" "}
          </h2>
          <span className="flex gap-5">
            <span className="text-white text-2xl xl:text-4xl font-mona-sans font-bold leading-snug">
              With
            </span>
            <span className="text-[#A2CE3A] text-2xl xl:text-4xl font-mona-sans font-bold leading-snug">
              TalentLoop.AI
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
