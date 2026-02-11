"use client";

import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

const CalendarSVG = () => (
  <svg
    width="33"
    height="36"
    viewBox="0 0 33 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.9412 1.25134V7.92514M9.59359 1.25134V7.92514M31.2834 17.9358C31.2834 11.6441 31.2834 8.49742 29.328 6.54366C27.3726 4.58991 24.2276 4.58824 17.9358 4.58824H14.5989C8.30721 4.58824 5.16052 4.58824 3.20677 6.54366C1.25301 8.49909 1.25134 11.6441 1.25134 17.9358V21.2727C1.25134 27.5645 1.25134 30.7111 3.20677 32.6649C5.16219 34.6187 8.30721 34.6203 14.5989 34.6203M1.25134 14.5989H31.2834"
      stroke="#D0D5DD"
      strokeWidth="2.50267"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.7236 29.1163L24.6097 27.9467V25.0553M31.2835 27.9467C31.2835 29.7167 30.5804 31.4143 29.3288 32.6658C28.0772 33.9174 26.3797 34.6205 24.6097 34.6205C22.8397 34.6205 21.1422 33.9174 19.8906 32.6658C18.639 31.4143 17.9359 29.7167 17.9359 27.9467C17.9359 26.1767 18.639 24.4792 19.8906 23.2277C21.1422 21.9761 22.8397 21.2729 24.6097 21.2729C26.3797 21.2729 28.0772 21.9761 29.3288 23.2277C30.5804 24.4792 31.2835 26.1767 31.2835 27.9467Z"
      stroke="#D0D5DD"
      strokeWidth="2.50267"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GlobeSVG = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.25134 17.9358C1.25134 27.1507 8.72099 34.6203 17.9358 34.6203C27.1507 34.6203 34.6203 27.1507 34.6203 17.9358C34.6203 8.72099 27.1507 1.25134 17.9358 1.25134C8.72099 1.25134 1.25134 8.72099 1.25134 17.9358Z"
      stroke="#D0D5DD"
      strokeWidth="2.50267"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.6042 1.33484C19.6042 1.33484 24.6096 7.92521 24.6096 17.9359C24.6096 27.9466 19.6042 34.537 19.6042 34.537M16.2673 34.537C16.2673 34.537 11.262 27.9466 11.262 17.9359C11.262 7.92521 16.2673 1.33484 16.2673 1.33484M2.30243 23.7755H33.5692M2.30243 12.0963H33.5692"
      stroke="#D0D5DD"
      strokeWidth="2.50267"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationSVG = () => (
  <svg
    width="25"
    height="35"
    viewBox="0 0 25 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4262 12.3C16.4262 13.3941 15.9916 14.4433 15.218 15.2169C14.4444 15.9905 13.3952 16.425 12.3012 16.425C11.2072 16.425 10.158 15.9905 9.38436 15.2169C8.61077 14.4433 8.17618 13.3941 8.17618 12.3C8.17618 11.206 8.61077 10.1568 9.38436 9.38323C10.158 8.60965 11.2072 8.17505 12.3012 8.17505C13.3952 8.17505 14.4444 8.60965 15.218 9.38323C15.9916 10.1568 16.4262 11.206 16.4262 12.3Z"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M14.3752 26.3151C13.8179 26.8513 13.0745 27.1508 12.3012 27.1508C11.5278 27.1508 10.7844 26.8513 10.2271 26.3151C5.13026 21.3766 -1.69909 15.8607 1.63061 7.8516C3.43406 3.52035 7.75706 0.75 12.3012 0.75C16.8453 0.75 21.1699 3.522 22.9717 7.8516C26.2981 15.8491 19.4853 21.3931 14.3752 26.3151Z"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M22.2012 30.45C22.2012 32.2732 17.7693 33.75 12.3012 33.75C6.83308 33.75 2.40118 32.2732 2.40118 30.45"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

interface FieldTag {
  label: string;
  color: string;
}

interface CoachFieldsCoachedSectionProps {
  coach: {
    fields: FieldTag[];
    availability: string;
    languages: string;
    location: string;
  };
}

export default function CoachFieldsCoachedSection({
  coach,
}: CoachFieldsCoachedSectionProps) {
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
          Fields Coached:
        </h2>

        {/* Field Tags */}
        <div className="flex flex-wrap gap-3 mt-5">
          {coach.fields.map((field, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="px-4 py-2 rounded-[100px] text-sm font-mona-sans font-medium text-[#0B0D0F] border border-transparent"
              style={{ backgroundColor: field.color }}
            >
              {field.label}
            </motion.span>
          ))}
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 lg:mt-12">
          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-[#37393B] rounded-[16px] p-5 lg:p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <CalendarSVG />
              <span className="text-[#D0D5DD] text-sm font-mona-sans">
                Availability
              </span>
            </div>
            <p className="text-white text-lg lg:text-xl font-mona-sans font-semibold">
              {coach.availability}
            </p>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#37393B] rounded-[16px] p-5 lg:p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <GlobeSVG />
              <span className="text-[#D0D5DD] text-sm font-mona-sans">
                Languages
              </span>
            </div>
            <p className="text-white text-lg lg:text-xl font-mona-sans font-semibold">
              {coach.languages}
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#37393B] rounded-[16px] p-5 lg:p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <LocationSVG />
              <span className="text-[#D0D5DD] text-sm font-mona-sans">
                Location
              </span>
            </div>
            <p className="text-[#A2CE3A] text-lg lg:text-xl font-mona-sans font-semibold">
              {coach.location}
            </p>
          </motion.div>
        </div>
      </Fade>
    </motion.section>
  );
}
