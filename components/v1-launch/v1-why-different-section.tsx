"use client";

import { motion } from "framer-motion";

export default function V1WhyDifferentSection() {
  return (
    <section className="relative py-10 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[22px] lg:text-5xl font-mona-sans font-semibold mb-4">
            <span className="text-white font-mona-sans">Why </span>
            <span className="text-[#A2CE3A] font-mona-sans">TalentLoop</span>
            <span className="text-white font-mona-sans"> Is Different</span>
          </h2>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card - Intelligent Conversations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-[24px] h-fit p-8 lg:p-10 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/Intelligent Conversations (1).png')"
            }}
          >
            <h3 className="text-white font-mona-sans text-2xl font-bold mb-1">
              Intelligent Conversations
            </h3>
            <p className="text-white/60 font-jakarta-sans text-sm mb-10">
              We don't just edit. You talk. We ask. We refine. No better. Most platforms make you DIY. We make it collaborative.
            </p>

            <div className="space-y-3">
              <div 
                 style={{
              background: "linear-gradient#A2CE3A 0%, #A2CE3A33 100%)"
            }}
              className="bg-[#FFFFFF0D] rounded-full px-5 py-3 border border-[#A2CE3A]/20 w-fit">
                <span className="text-white/80 font-sora text-sm">Identifies experience gaps</span>
              </div>
              <div 
                 style={{
              background: "linear-gradient#A2CE3A 0%, #A2CE3A33 100%)"
            }}
              className="bg-[#FFFFFF0D] rounded-full px-5 py-3 border border-[#A2CE3A]/20 w-fit">
                <span className="text-white/80 font-sora text-sm">Forces accountability</span>
              </div>
              <div 
                 style={{
              background: "linear-gradient#A2CE3A 0%, #A2CE3A33 100%)"
            }}
              className="bg-[#FFFFFF0D] rounded-full px-5 py-3 border border-[#A2CE3A]/20 w-fit">
                <span className="text-white/80 font-sora text-sm">Guides real skill growth</span>
              </div>
              <div 
                 style={{
              background: "linear-gradient#A2CE3A 0%, #A2CE3A33 100%)"
            }}
              className="bg-[#FFFFFF0D] rounded-full px-5 py-3 border border-[#A2CE3A]/20 w-fit">
                <span className="text-white/80 font-sora text-sm">Aligns your profile with market reality</span>
              </div>
            </div>
          </motion.div>

          {/* Right Card - Analytics and Insights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-[24px] p-4"
            style={{
              background: "#FFFFFF08",
              border: "1px solid #A2CE3A33",
              boxShadow: "0px 0px 19.27px 0px #A2CE3A1A",
              backdropFilter: "blur(11.56px)"
            }}
          >
            <div className="space-y-3">
              {/* Applications Sent */}
              <div className="bg-[#FFFFFF0D] rounded-[24px] py-2 px-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 font-sora text-xs uppercase">Applications Sent</span>
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.545" y="0.238" width="38.5475" height="38.5475" rx="19.2737" fill="#A2CE3A" fillOpacity="0.1"/>
                    <path d="M21.804 15.393H25.177V18.7659L23.886 17.4747L20.355 21.0057L18.115 18.7659L14.742 22.1388L13.951 21.3483L18.115 17.1849L20.355 19.4247L23.095 16.6842L21.804 15.393Z" fill="#A2CE3A"/>
                  </svg>
                </div>
                <div className="text-white font-mona-sans text-2xl font-bold">1000+</div>
              </div>

              {/* Interviews Secured */}
              <div className="bg-[#FFFFFF0D] rounded-[24px] py-2 px-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 font-sora text-xs uppercase">Interviews Secured</span>
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="38.5475" height="38.5475" rx="19.2737" fill="#A2CE3A" fillOpacity="0.1"/>
                    <path d="M21.2591 19.081C21.7509 19.081 22.2867 19.1513 22.8665 19.2918C23.4462 19.4323 23.982 19.6607 24.4739 19.9769C24.9657 20.2931 25.2117 20.6533 25.2117 21.0573V22.4539H21.8388V21.0573C21.8388 20.2843 21.4699 19.6344 20.7321 19.1073C20.855 19.0898 21.0307 19.081 21.2591 19.081ZM15.172 19.2918C15.7517 19.1513 16.2875 19.081 16.7794 19.081C17.2713 19.081 17.8071 19.1513 18.3868 19.2918C18.9665 19.4323 19.4936 19.6607 19.9679 19.9769C20.4598 20.2931 20.7057 20.6533 20.7057 21.0573V22.4539H12.8268V21.0573C12.8268 20.6533 13.0727 20.2931 13.5646 19.9769C14.0565 19.6607 14.5923 19.4323 15.172 19.2918ZM17.9389 17.4736C17.6227 17.8074 17.2362 17.9743 16.7794 17.9743C16.3227 17.9743 15.9274 17.8074 15.5936 17.4736C15.2599 17.1398 15.093 16.7446 15.093 16.2878C15.093 15.8311 15.2599 15.4358 15.5936 15.102C15.9274 14.7682 16.3227 14.6014 16.7794 14.6014C17.2362 14.6014 17.6227 14.7682 17.9389 15.102C18.2726 15.4358 18.4395 15.8311 18.4395 16.2878C18.4395 16.7446 18.2726 17.1398 17.9389 17.4736ZM22.4449 17.4736C22.1111 17.8074 21.7158 17.9743 21.2591 17.9743C20.8023 17.9743 20.4071 17.8074 20.0733 17.4736C19.7395 17.1398 19.5726 16.7446 19.5726 16.2878C19.5726 15.8311 19.7395 15.4358 20.0733 15.102C20.4071 14.7682 20.8023 14.6014 21.2591 14.6014C21.7158 14.6014 22.1111 14.7682 22.4449 15.102C22.7786 15.4358 22.9455 15.8311 22.9455 16.2878C22.9455 16.7446 22.7786 17.1398 22.4449 17.4736Z" fill="#A2CE3A"/>
                  </svg>
                </div>
                <div className="text-white font-mona-sans text-2xl font-bold">300+</div>
              </div>

              {/* Avg. Response Time */}
              <div className="bg-[#FFFFFF0D] rounded-[24px] py-2 px-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 font-sora text-xs uppercase">Avg. Response Time</span>
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="38.5475" height="38.5475" rx="19.2737" fill="#A2CE3A" fillOpacity="0.1"/>
                    <path d="M21.4907 20.5002L19.2734 19.2734V16.2407M26.2734 19.2734C26.2734 21.13 25.5359 22.9104 24.2232 24.2232C22.9104 25.5359 21.13 26.2734 19.2734 26.2734C17.4169 26.2734 15.6364 25.5359 14.3237 24.2232C13.0109 22.9104 12.2734 21.13 12.2734 19.2734C12.2734 17.4169 13.0109 15.6364 14.3237 14.3237C15.6364 13.0109 17.4169 12.2734 19.2734 12.2734C21.13 12.2734 22.9104 13.0109 24.2232 14.3237C25.5359 15.6364 26.2734 17.4169 26.2734 19.2734Z" stroke="#A2CE3A" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-white font-mona-sans text-2xl font-bold">4.2 days</div>
              </div>
            </div>

            {/* Analytics Title and Description - Positioned Below Cards */}
            <div className="mt-6">
              <h3 className="text-white font-mona-sans text-2xl font-bold mb-3">
                Analytics and Insights
              </h3>
              <p className="text-white/60 font-sora text-sm">
                Get detailed reports on all interactions to continuously improve your job interviews
              </p>
            </div>
          </motion.div>
        </div>
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
