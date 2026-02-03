interface CoachCardProps {
  image: string;
  name: string;
  rating: number;
  tag: string;
  tagColor: string;
  specialty: string;
  specialtyColor: string;
  sessionCount: string;
  hiredCount: string;
  avatars: string[];
}

const SVG1 = () => {
  return (
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75009 6.87939C7.64804 7.8072 6.25314 8.31494 4.81255 8.31266C3.37195 8.31494 1.97705 7.8072 0.875 6.87939V13.1252C0.875038 13.2812 0.916781 13.4344 0.995906 13.5688C1.07503 13.7033 1.18866 13.8141 1.32503 13.8899C1.46139 13.9656 1.61553 14.0036 1.77148 13.9998C1.92744 13.9959 2.07953 13.9505 2.21202 13.8681L4.81255 12.2493L7.41307 13.8681C7.54562 13.9505 7.6978 13.996 7.85382 13.9998C8.00985 14.0035 8.16406 13.9655 8.30045 13.8897C8.43684 13.8138 8.55046 13.7028 8.62952 13.5683C8.70858 13.4337 8.75021 13.2804 8.75009 13.1243V6.87939Z"
        fill="url(#paint0_radial_532_1373)"
      />
      <path
        d="M9.62511 4.81256C9.62511 6.08893 9.11807 7.31302 8.21554 8.21555C7.31302 9.11808 6.08892 9.62512 4.81255 9.62512C3.53619 9.62512 2.31209 9.11808 1.40956 8.21555C0.507036 7.31302 0 6.08893 0 4.81256C0 3.53619 0.507036 2.31209 1.40956 1.40957C2.31209 0.507036 3.53619 0 4.81255 0C6.08892 0 7.31302 0.507036 8.21554 1.40957C9.11807 2.31209 9.62511 3.53619 9.62511 4.81256Z"
        fill="url(#paint1_radial_532_1373)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_532_1373"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(4.81254 7.00015) rotate(90) scale(9.9935 15.4764)"
        >
          <stop stop-color="#163697" />
          <stop offset="1" stop-color="#29C3FF" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_532_1373"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-20.7967 -33.688) rotate(56.615) scale(53.7249 46.0129)"
        >
          <stop offset="0.772" stop-color="#FFCD0F" />
          <stop offset="0.991" stop-color="#E67505" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default function CoachCard({
  image,
  name,
  rating,
  tag,
  tagColor,
  specialty,
  specialtyColor,
  sessionCount,
  hiredCount,
  avatars,
}: CoachCardProps) {
  return (
    <div className="min-w-[280px] flex-shrink-0">
      <div className="">
        {/* Image Section */}
        <div className="border border-white rounded-[16px] overflow-hidden relative h-[320px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover brightness-75"
          />

          {/* Top Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-[#FFFFFF1A] border-[#FFFFFF1A] bg-opacity-20 backdrop-blur-sm rounded-[4px] px-3 py-1.5 flex items-center gap-1.5">
              <SVG1 />
              <span className="text-white text-base font-mona-sans">{tag}</span>
            </div>
          </div>

          {/* Specialty Badge */}
          <div className="absolute bottom-4 left-4 flex flex-col w-fit">
            <div
              className="rounded-full px-2 h-5 flex items-center w-fit"
              style={{ backgroundColor: specialtyColor }}
            >
              <span className="text-[#121212] text-[10px] font-mona-sans font-medium">
                {specialty}
              </span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <h3 className="text-white text-xl font-mona-sans font-semibold">
                {name}
              </h3>
              <div className="flex items-center gap-1">
                <span className="text-[#FBC02D] text-base">★</span>
                <span className="text-white text-sm font-mona-sans">
                  {rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <p className="text-white text-base font-mona-sans my-2">
            {sessionCount}
          </p>

          {/* Avatars and Hired Count */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt=""
                  className="w-6 h-6 rounded-full border-2 border-[#141619]"
                />
              ))}
            </div>
            <span className="text-white text-xs font-mona-sans">
              {hiredCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
