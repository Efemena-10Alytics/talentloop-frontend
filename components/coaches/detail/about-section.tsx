"use client";

import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

interface CoachAboutSectionProps {
  coach: {
    bio: string;
    hiredCount: string;
    avatars: string[];
  };
}

export default function CoachAboutSection({ coach }: CoachAboutSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#1E1F21] rounded-[16px] px-6 lg:px-10 py-8 lg:py-10"
    >
      <Fade direction="up" triggerOnce duration={1500}>
        <h2 className="text-white text-2xl lg:text-[28px] font-mona-sans font-bold leading-tight">
          About Me
        </h2>

        <p className="text-white/80 text-base lg:text-lg font-mona-sans leading-relaxed mt-4 max-w-[800px]">
          {coach.bio}
        </p>

        {/* Avatars + Hired Count */}
        <div className="flex items-center gap-3 mt-6">
          <div className="flex -space-x-2">
            {coach.avatars.map((avatar, i) => (
              <img
                key={i}
                src={avatar}
                alt={`Hired person ${i + 1}`}
                className="w-8 h-8 rounded-full border-2 border-[#1E1F21] object-cover"
              />
            ))}
          </div>
          <span className="text-white/70 text-sm font-mona-sans">
            {coach.hiredCount}
          </span>
        </div>
      </Fade>
    </motion.section>
  );
}
