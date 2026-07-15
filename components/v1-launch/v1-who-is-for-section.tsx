"use client";

import { motion } from "framer-motion";

const CheckmarkIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="12" fill="#A2CE3A" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.8047 7.52925C18.0651 7.7896 18.0651 8.21171 17.8047 8.47206L10.4714 15.8054C10.2111 16.0657 9.78894 16.0657 9.5286 15.8054L6.19526 12.4721C5.93491 12.2117 5.93491 11.7896 6.19526 11.5292C6.45561 11.2689 6.87772 11.2689 7.13807 11.5292L10 14.3912L16.8619 7.52925C17.1223 7.2689 17.5444 7.2689 17.8047 7.52925Z"
      fill="#0E0C15"
    />
  </svg>
);

const userTypes = [
  "Career switchers",
  "Recent graduates",
  "Mid-level professionals",
  "Senior executives",
  "International job seekers",
];

// Mock user images for the scrolling columns
const columnImages = [
  // Column 1
  [
    { role: "UX Designer", image: "/Image-1.png" },
    { role: "Product Manager", image: "/Image-2.png" },
    { role: "Content Strategist", image: "/Image-3.png" },
    { role: "Software Engineer", image: "/Image-7.png" },
    { role: "Data Analyst", image: "/Image-8.png" },
    { role: "Career Coach", image: "/Image-9.png" },
  ],
  // Column 2
  [
    { role: "Data Analyst", image: "/Image-4.png" },
    { role: "Software Engineer", image: "/Image-5.png" },
    { role: "UX Designer", image: "/Image-6.png" },
    { role: "Product Manager", image: "/Image-1.png" },
    { role: "Content Strategist", image: "/Image-3.png" },
    { role: "Career Coach", image: "/Image-7.png" },
  ],
  // Column 3
  [
    { role: "Career Coach", image: "/Image-6.png" },
    { role: "Content Strategist", image: "/Image-9.png" },
    { role: "Data Analyst", image: "/Image-2.png" },
    { role: "UX Designer", image: "/Image-5.png" },
    { role: "Product Manager", image: "/Image-8.png" },
    { role: "Software Engineer", image: "/Image-4.png" },
  ],
];

export default function V1WhoIsForSection() {
  return (
    <section className="relative py-10 lg:py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side - Checkmark List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-[50%] space-y-3 lg:space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-5 lg:mb-16"
            >
              <h2 className="text-[22px] lg:text-5xl font-mona-sans font-semibold text-white mb-4">
                Who
                <span className="text-[#A2CE3A] font-mona-sans mx-2">
                  TalentLoop
                </span> <br/>
                Is For
              </h2>
            </motion.div>

            {/* Section Heading */}
            {userTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <CheckmarkIcon />
                <span className="text-white font-sora text-lg">{type}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Scrolling Image Columns */}
          <div className="lg:w-[50%] flex flex-row gap-5 h-[600px] overflow-hidden">
            {columnImages.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-5 flex-1">
                {/* Duplicate the images for infinite scroll effect */}
                <motion.div
                  className="flex flex-col gap-5"
                  animate={{
                    y: [0, -100 * column.length],
                  }}
                  transition={{
                    duration: 20, // Same speed for all columns
                    repeat: Infinity,
                    ease: "linear",
                    delay: columnIndex * 2, // Staggered delays: 0s, 2s, 4s
                  }}
                >
                  {/* First set of images */}
                  {column.map((user, index) => (
                    <div
                      key={`first-${index}`}
                      className="relative w-full flex flex-col gap-3 rounded-[12px] flex-shrink-0"
                    >
                      <img
                        src={user.image}
                        className="w-full h-[150px] object-contain"
                      />
                         <p className="text-white/40 font-inter text-xs pl-4">
                          {user.role}
                        </p>
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {column.map((user, index) => (
                    <div
                      key={`second-${index}`}
                      className="relative w-full h-[150px] rounded-[12px] overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={user.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-white/60 font-sora text-xs">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
