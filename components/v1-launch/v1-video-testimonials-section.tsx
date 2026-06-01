"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// import { ReactPlayer } from "react-player";

export default function V1VideoTestimonialSection() {
  return (
    <section className="relative py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl lg:text-5xl text-white font-mona-sans font-semibold leading-tight mb-4">
            <span className="text-white font-mona-sans"> Listen To What </span>
            <span className="text-[#A2CE3A] font-mona-sans mr-1">
              Our Clients
            </span>
            Who <br />
            <span className="text-[#A2CE3A] font-mona-sans">Got Hired</span>
            Have To Say
          </h2>
        </motion.div>{" "}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          <div className="border-4 border-white p-4 rounded-[10px] flex flex-col gap-5">
            <ReactPlayer
              url="https://youtu.be/HEppEyBWYIg?si=5PAywQp8JA-d_xGZ"
              width="100%"
              height="300px"
              controls={true}
              className="rounded-lg overflow-hidden cursor-pointer"
            />
          </div>
          <div className="border-4 border-white p-4 rounded-[10px] flex flex-col gap-5">
            <ReactPlayer
              url="https://youtu.be/HEppEyBWYIg?si=5PAywQp8JA-d_xGZ"
              width="100%"
              height="300px"
              controls={true}
              className="rounded-lg overflow-hidden cursor-pointer"
            />
          </div>
        </div> */}
        <div className="lg:pt-10">
          <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full pointer-events-none">
            <img
              src="/blush.png"
              alt=""
              className="w-full max-w-[1400px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
