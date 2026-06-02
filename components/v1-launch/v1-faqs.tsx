"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What is TalentLoop?",
    answer: "TalentLoop is a comprehensive career acceleration platform that helps professionals land their dream jobs through personalized coaching, interview preparation, and strategic career guidance."
  },
  {
    question: "How does the acceleration program work?",
    answer: "Our acceleration program combines one-on-one coaching sessions, personalized career strategy, resume optimization, interview preparation, and ongoing support to help you secure your ideal role faster."
  },
  {
    question: "What makes TalentLoop different from other career services?",
    answer: "TalentLoop offers a holistic approach with expert career coaches, proven frameworks, and personalized strategies. We focus on long-term career success, not just landing any job."
  },
  {
    question: "How long does the program take?",
    answer: "The duration varies based on your chosen tier and individual goals. Most clients see significant progress within 4-12 weeks, with ongoing support available throughout your career journey."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a satisfaction guarantee. If you're not satisfied with your first session, we'll work with you to make it right or provide a refund according to our refund policy."
  },
  {
    question: "Can I switch between tiers?",
    answer: "Yes, you can upgrade or adjust your tier at any time to better suit your needs and career goals. Contact our support team for assistance with tier changes."
  },
  {
    question: "What industries do you specialize in?",
    answer: "Our expert coaches have experience across various industries including Tech, Finance, Marketing, Engineering, Design, Product Management, and more. We match you with coaches who understand your specific field."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes, we stand behind our service. If you complete your first coaching session and feel it's not the right fit, we offer a full refund within the first 7 days of enrollment."
  },
  {
    question: "How are coaching sessions conducted?",
    answer: "All coaching sessions are conducted virtually via video call, making it convenient for you to connect with your coach from anywhere in the world."
  },
  {
    question: "Do you help with visa sponsorship?",
    answer: "While we don't guarantee visa sponsorship, we provide guidance on positioning yourself for roles that offer sponsorship and help you navigate the international job search process."
  },
];

export default function V1Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-mona-sans font-semibold mb-4">
            <span className="text-white font-mona-sans">Learn More About </span>
            <span className="text-[#A2CE3A] font-mona-sans">TalentLoop</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-[900px] mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-[16px] overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
              >
                <span className="text-white font-mona-sans text-base lg:text-lg font-semibold pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="#A2CE3A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-white/70 font-sora text-sm lg:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
