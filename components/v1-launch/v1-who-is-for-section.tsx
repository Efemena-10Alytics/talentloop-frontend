"use client";

import { motion } from "framer-motion";

const CheckmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="#A2CE3A"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M17.8047 7.52925C18.0651 7.7896 18.0651 8.21171 17.8047 8.47206L10.4714 15.8054C10.2111 16.0657 9.78894 16.0657 9.5286 15.8054L6.19526 12.4721C5.93491 12.2117 5.93491 11.7896 6.19526 11.5292C6.45561 11.2689 6.87772 11.2689 7.13807 11.5292L10 14.3912L16.8619 7.52925C17.1223 7.2689 17.5444 7.2689 17.8047 7.52925Z" fill="#0E0C15"/>
  </svg>
);

const userTypes = [
  "Career switchers",
  "Recent graduates",
  "Mid-level professionals",
  "Senior executives",
  "International job seekers"
];

// Mock user images for the scrolling columns
const columnImages = [
  // Column 1
  [
    { name: "Chloe Ramirez", role: "UX Designer", image: "/Image-1.png" },
    { name: "Sofia Chen", role: "Product Manager", image: "/Image-2.png" },
    { name: "Nina Torres", role: "Content Strategist", image: "/Image-3.png" },
    { name: "Ethan Brooks", role: "Software Engineer", image: "/Image-4.png" },
    { name: "Richard Malick", role: "Data Analyst", image: "/Image-5.png" },
    // { name: "Andrew Jones", role: "Marketing Manager", image: "/Image-6.png" }
  ],
  // Column 2
  [
    { name: "Sofia Chen", role: "Product Manager", image: "/Image-2.png" },
    { name: "Chloe Ramirez", role: "UX Designer", image: "/Image-1.png" },
    { name: "Ethan Brooks", role: "Software Engineer", image: "/Image-4.png" },
    { name: "Nina Torres", role: "Content Strategist", image: "/Image-3.png" },
    { name: "Richard Malick", role: "Data Analyst", image: "/Image-5.png" },
    // { name: "Andrew Jones", role: "Marketing Manager", image: "/Image-6.png" }
  ],
  // Column 3
 [
   { name: "Richard Malick", role: "Data Analyst", image: "/Image-5.png" },
   { name: "Sofia Chen", role: "Product Manager", image: "/Image-2.png" },
   { name: "Ethan Brooks", role: "Software Engineer", image: "/Image-4.png" },
   { name: "Chloe Ramirez", role: "UX Designer", image: "/Image-1.png" },
   { name: "Nina Torres", role: "Content Strategist", image: "/Image-3.png" },
    // { name: "Andrew Jones", role: "Marketing Manager", image: "/Image-6.png" }
  ],
];

export default function V1WhoIsForSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
    
     
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side - Checkmark List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-[50%] space-y-6"
          >

   <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-5 lg:mb-16 w-[100px]"
        >
          <h2 className="text-4xl lg:text-[54px] font-sora font-bold leading-normal text-white mb-4">
            WHO
            <span className="text-[#A2CE3A] font-sora mx-2">
            TALENTLOOP.AI 
              </span> 
            IS FOR
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
              <div
                key={columnIndex}
                className="flex flex-col gap-5 flex-1"
              >
                {/* Duplicate the images for infinite scroll effect */}
                <motion.div
                  className="flex flex-col gap-5"
                  animate={{
                    y: [0, -100 * column.length]
                  }}
                  transition={{
                    duration: 20 + columnIndex * 5, // Different speeds for each column
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {/* First set of images */}
                  {column.map((user, index) => (
                    <div
                      key={`first-${index}`}
                      className="relative w-full h-[150px] bg-white/10 rounded-[12px] overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-white font-mona-sans text-sm font-semibold">
                          {user.name}
                        </p>
                        <p className="text-white/60 font-sora text-xs">
                          {user.role}
                        </p>
                      </div>
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
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-white font-mona-sans text-sm font-semibold">
                          {user.name}
                        </p>
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
