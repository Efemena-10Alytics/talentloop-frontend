"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function V1CTASection() {
  return (
    <section className="relative py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Title */}
          <h2 className="text-4xl lg:text-6xl font-mona-sans font-bold text-white mb-6 leading-tight">
            Your Job Search Should <br />Work as Hard as You Do.
          </h2>

          {/* Subtext */}
          <p className="text-white/60 font-sora text-base lg:text-lg mb-8">
            TalentLoop.ai applies for you to grow until you get the job.
          </p>

          {/* Sign Up Button */}
          <Link
            href="/clarity-session"
            className="inline-block px-8 py-3 rounded-[30px] font-mona-sans text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(90deg, #071522 25%, #A2CE3A 100%)",
              boxShadow: "0px -6px 4px 0px #FFFFFF4D inset",
              minWidth: "112px"
            }}
          >
            Sign Up
          </Link>
        </motion.div>
      </div>
            <div className="lg:pt-10">
        <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full pointer-events-none">
          <img
            src="/blush.png"
            alt=""
            className="w-full max-w-[1400px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
