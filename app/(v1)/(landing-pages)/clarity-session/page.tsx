"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import BookingCalendar from "@/components/v1-launch/pricing-components/BookingCalendar";
import BookingDetailsForm, {
  BookingFormData,
} from "@/components/v1-launch/pricing-components/BookingDetailsForm";
import V1FooterSection from "@/components/v1-launch/v1-footer-section";
import { useToast } from "@/components/ui/use-toast";
import { getApiUrl } from "@/lib/api";

const GoogleMeetIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="64" height="64" rx="12" fill="#787880" fillOpacity="0.16" />
    <path
      d="M18.25 41.4492C18.25 42.4437 19.0625 43.2492 20.0635 43.2492H20.0896C19.0732 43.2492 18.25 42.4437 18.25 41.4492Z"
      fill="#FBBC05"
    />
    <path
      d="M33.8336 27.5V32.1995L40.1693 27.089V22.55C40.1693 21.5555 39.3568 20.75 38.3558 20.75H24.6294L24.6172 27.5H33.8336Z"
      fill="#FBBC05"
    />
    <path
      d="M33.8361 36.9007H24.6045L24.5938 43.2502H38.3585C39.361 43.2502 40.172 42.4447 40.172 41.4502V37.3522L33.8361 32.2012V36.9007Z"
      fill="#34A853"
    />
    <path d="M24.6303 20.75L18.25 27.5H24.6195L24.6303 20.75Z" fill="#EA4335" />
    <path
      d="M18.25 36.9004V41.4499C18.25 42.4444 19.0732 43.2499 20.0896 43.2499H24.592L24.6026 36.9004H18.25Z"
      fill="#1967D2"
    />
    <path
      d="M24.6195 27.5H18.25V36.9005H24.6026L24.6195 27.5Z"
      fill="#4285F4"
    />
    <path
      d="M45.7412 39.85V24.4001C45.384 22.3496 43.1351 24.7001 43.1351 24.7001L40.1719 27.0896V37.351L44.4136 40.7995C45.9451 41.0005 45.7412 39.85 45.7412 39.85Z"
      fill="#34A853"
    />
    <path
      d="M33.8359 32.1987L40.1733 37.3512V27.0898L33.8359 32.1987Z"
      fill="#188038"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="64" height="64" rx="12" fill="#787880" fillOpacity="0.16" />
    <path
      d="M32 18.25C29.0333 18.25 26.1332 19.1297 23.6665 20.778C21.1997 22.4262 19.2771 24.7689 18.1418 27.5097C17.0065 30.2506 16.7094 33.2666 17.2882 36.1764C17.867 39.0861 19.2956 41.7588 21.3934 43.8566C23.4912 45.9544 26.1639 47.383 29.0737 47.9618C31.9834 48.5406 34.9994 48.2435 37.7403 47.1082C40.4811 45.9729 42.8238 44.0503 44.472 41.5836C46.1203 39.1168 47 36.2167 47 33.25C46.9955 29.2731 45.4136 25.4605 42.6016 22.6484C39.7895 19.8364 35.9769 18.2545 32 18.25ZM39.1344 27.8844L32.8844 34.1344C32.7682 34.2505 32.6304 34.3426 32.4786 34.4055C32.3269 34.4683 32.1643 34.5007 32 34.5007C31.8358 34.5007 31.6731 34.4683 31.5214 34.4055C31.3696 34.3426 31.2318 34.2505 31.1156 34.1344C30.9995 34.0182 30.9074 33.8804 30.8445 33.7286C30.7817 33.5769 30.7493 33.4142 30.7493 33.25C30.7493 33.0858 30.7817 32.9231 30.8445 32.7714C30.9074 32.6196 30.9995 32.4818 31.1156 32.3656L37.3656 26.1156C37.4818 25.9995 37.6196 25.9074 37.7714 25.8445C37.9231 25.7817 38.0858 25.7493 38.25 25.7493C38.4143 25.7493 38.5769 25.7817 38.7286 25.8445C38.8804 25.9074 39.0182 25.9995 39.1344 26.1156C39.2505 26.2318 39.3426 26.3696 39.4055 26.5214C39.4684 26.6731 39.5007 26.8358 39.5007 27C39.5007 27.1642 39.4684 27.3269 39.4055 27.4786C39.3426 27.6304 39.2505 27.7682 39.1344 27.8844ZM27 14.5C27 14.1685 27.1317 13.8505 27.3661 13.6161C27.6005 13.3817 27.9185 13.25 28.25 13.25H35.75C36.0815 13.25 36.3995 13.3817 36.6339 13.6161C36.8683 13.8505 37 14.1685 37 14.5C37 14.8315 36.8683 15.1495 36.6339 15.3839C36.3995 15.6183 36.0815 15.75 35.75 15.75H28.25C27.9185 15.75 27.6005 15.6183 27.3661 15.3839C27.1317 15.1495 27 14.8315 27 14.5Z"
      fill="#4ADE80"
    />
  </svg>
);

const MicIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="64" height="64" rx="12" fill="#787880" fillOpacity="0.16" />
    <path
      d="M50.75 32C50.75 32.3315 50.6183 32.6495 50.3839 32.8839C50.1495 33.1183 49.8315 33.25 49.5 33.25H46.8953C46.5976 34.9966 45.6921 36.5817 44.3389 37.7253C42.9856 38.869 41.2718 39.4976 39.5 39.5H33.25V43.25H37C38.3261 43.25 39.5979 43.7768 40.5355 44.7145C41.4732 45.6521 42 46.9239 42 48.25C42 48.5815 41.8683 48.8995 41.6339 49.1339C41.3995 49.3683 41.0815 49.5 40.75 49.5C40.4185 49.5 40.1005 49.3683 39.8661 49.1339C39.6317 48.8995 39.5 48.5815 39.5 48.25C39.5 47.587 39.2366 46.9511 38.7678 46.4822C38.2989 46.0134 37.663 45.75 37 45.75H33.25V48.25C33.25 48.5815 33.1183 48.8995 32.8839 49.1339C32.6495 49.3683 32.3315 49.5 32 49.5C31.6685 49.5 31.3505 49.3683 31.1161 49.1339C30.8817 48.8995 30.75 48.5815 30.75 48.25V45.75H27C26.337 45.75 25.7011 46.0134 25.2322 46.4822C24.7634 46.9511 24.5 47.587 24.5 48.25C24.5 48.5815 24.3683 48.8995 24.1339 49.1339C23.8995 49.3683 23.5815 49.5 23.25 49.5C22.9185 49.5 22.6005 49.3683 22.3661 49.1339C22.1317 48.8995 22 48.5815 22 48.25C22 46.9239 22.5268 45.6521 23.4645 44.7145C24.4021 43.7768 25.6739 43.25 27 43.25H30.75V39.5H24.5C22.7282 39.4976 21.0144 38.869 19.6611 37.7253C18.3079 36.5817 17.4024 34.9966 17.1047 33.25H14.5C14.1685 33.25 13.8505 33.1183 13.6161 32.8839C13.3817 32.6495 13.25 32.3315 13.25 32C13.25 31.6685 13.3817 31.3505 13.6161 31.1161C13.8505 30.8817 14.1685 30.75 14.5 30.75H18.25C18.5815 30.75 18.8995 30.8817 19.1339 31.1161C19.3683 31.3505 19.5 31.6685 19.5 32C19.5 33.3261 20.0268 34.5979 20.9645 35.5355C21.9021 36.4732 23.1739 37 24.5 37H39.5C40.8261 37 42.0979 36.4732 43.0355 35.5355C43.9732 34.5979 44.5 33.3261 44.5 32C44.5 31.6685 44.6317 31.3505 44.8661 31.1161C45.1005 30.8817 45.4185 30.75 45.75 30.75H49.5C49.8315 30.75 50.1495 30.8817 50.3839 31.1161C50.6183 31.3505 50.75 31.6685 50.75 32ZM24.5 34.5H39.5C39.8581 34.5 40.2121 34.4231 40.5379 34.2744C40.8638 34.1257 41.1539 33.9087 41.3885 33.6382C41.6232 33.3677 41.797 33.0498 41.8982 32.7063C41.9994 32.3627 42.0256 32.0014 41.975 31.6469L39.7969 18.6469C39.7188 18.1367 39.4555 17.6734 39.0556 17.3449C38.6557 17.0165 38.1467 16.8456 37.625 16.8656H26.375C25.8533 16.8456 25.3443 17.0165 24.9444 17.3449C24.5445 17.6734 24.2812 18.1367 24.2031 18.6469L22.025 31.6469C21.9744 32.0014 22.0006 32.3627 22.1018 32.7063C22.203 33.0498 22.3768 33.3677 22.6115 33.6382C22.8461 33.9087 23.1362 34.1257 23.4621 34.2744C23.7879 34.4231 24.1419 34.5 24.5 34.5Z"
      fill="#4ADE80"
    />
  </svg>
);

// Success Modal Component
const SuccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.8)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1E1F21] rounded-[24px] p-8 max-w-md w-full"
        style={{ border: "1px solid #FFFFFF1A" }}
      >
        <div className="text-center">
          {/* Success Icon */}
          <div
            className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "#A2CE3A20" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="#A2CE3A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3 className="text-white font-mona-sans font-bold text-2xl mb-3">
            Session Booked Successfully!
          </h3>
          <p className="text-white/60 font-sora text-sm mb-6">
            Your clarity session has been booked. A Manager will contact you via
            email shortly to confirm the details.
          </p>

          <button
            onClick={onClose}
            className="w-full h-12 rounded-full font-mona-sans font-semibold text-sm transition-all"
            style={{ background: "#A2CE3A", color: "#0B0D0F" }}
          >
            Got it
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ClaritySessionContent = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get planId from URL query parameter
  const planId = searchParams.get("p-id");

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleFormSubmit = async (formData: BookingFormData) => {
    setIsSubmitting(true);

    try {
      // Format the date and time for API - ensure it's in the future
      const startTime = new Date(selectedDate!);
      const [hours, minutes] = selectedTime!.split(":");
      startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Validate that the selected time is in the future
      const now = new Date();
      if (startTime <= now) {
        toast({
          variant: "error",
          title: "Invalid time",
          description: "Please select a time in the future.",
        });
        setIsSubmitting(false);
        return;
      }

      const bookingData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        referral_source: formData.howDidYouFind,
        notes: formData.message,
        start_time: startTime.toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      const response = await fetch(
        `${getApiUrl()}/api/v1/calendly/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        },
      );

      const result = await response.json();

      if (response.ok && result.status === "success") {
        // Show success modal
        setShowSuccessModal(true);
        toast({
          variant: "success",
          title: "Session booked!",
          description: "Your clarity session has been booked successfully.",
        });
      } else {
        // Handle error with specific message
        const errorMessage =
          result.message || "Failed to book session. Please try again.";
        toast({
          variant: "error",
          title: "Booking failed",
          description: errorMessage,
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        variant: "error",
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Optionally redirect to home page
    window.location.href = "/";
  };

  const featureItems = [
    {
      icon: <GoogleMeetIcon />,
      title: "Link would be sent on booking",
      desc: "You'll receive a Google Meet link via email",
    },
    {
      icon: <ClockIcon />,
      title: "Monday to Friday. 20 min",
      desc: "Quick session to align on your career goals",
    },
    {
      icon: <MicIcon />,
      title: "Speak to a career coach One - on - one",
      desc: "Personal consultation with an expert",
    },
  ];

  return (
    <div className="bg-[#01090B] min-h-screen">
      <div className="p-3">
        <Navbar v1Launch />

        <section className="relative py-14 lg:py-20 overflow-hidden">
          {/* Ambient glow blobs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.18, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, #A2CE3A 0%, transparent 70%)", filter: "blur(60px)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 2.4, ease: "easeOut", delay: 0.3 }}
            className="pointer-events-none absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, #156374 0%, transparent 70%)", filter: "blur(80px)" }}
          />

          <div className="max-w-[1400px] mx-auto px-3 lg:px-6 relative">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-10"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl lg:text-5xl font-semibold leading-tight mb-3"
              >
                <span className="text-white font-mona-sans">
                  Book your clarity session
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-[#CCCCCC] font-sora text-sm"
              >
              Before purchasing the Premium package, book a free clarity session with our team.
              </motion.p>
            </motion.div>

            {/* Booking Flow Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3, ease: "easeOut" }}
              className="rounded-[32px] p-6 lg:p-10 max-w-6xl mx-auto"
              style={{ background: "#0F1416" }}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side - Info */}
                <motion.div
                  layout
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`${currentStep === 1 ? "lg:w-[35%]" : "lg:w-[50%]"}`}
                >
                  {/* Step Indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="inline-flex items-center justify-center h-[28px] px-4 rounded-[32px] mb-6"
                    style={{
                      background: "#00C0630D",
                      border: "1.5px solid #00C06326",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentStep}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#00C063] font-mona-sans text-sm font-semibold"
                      >
                        {currentStep}/2
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-white font-mona-sans font-bold text-3xl lg:text-4xl mb-4"
                  >
                    Get Clarity with a Career Coach
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.58 }}
                    className="text-white/60 font-sora text-sm mb-8"
                  >
                    Choose a time that works for you. The session helps us
                    understand your goals so we can tailor your package.
                  </motion.p>

                  {/* Feature Items */}
                  <div className="space-y-4">
                    {featureItems.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.55, delay: 0.65 + i * 0.12, ease: "easeOut" }}
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-4 cursor-default"
                      >
                        <motion.div
                          whileHover={{ scale: 1.08, rotate: 3 }}
                          transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-white font-mona-sans font-semibold text-base mb-1">
                            {item.title}
                          </h3>
                          <p className="text-white/50 font-sora text-sm">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Side - Calendar / Form with step transition */}
                <motion.div
                  layout
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`${currentStep === 1 ? "lg:w-[65%]" : "lg:w-[50%]"}`}
                >
                  <AnimatePresence mode="wait">
                    {currentStep === 1 ? (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.38, ease: "easeInOut" }}
                      >
                        <BookingCalendar
                          onDateSelect={setSelectedDate}
                          onTimeSelect={setSelectedTime}
                        />
                        {/* Action Buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.55 }}
                          className="flex items-center gap-4 mt-6"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => window.history.back()}
                            className="flex-1 h-12 rounded-full font-mona-sans font-semibold text-sm transition-colors"
                            style={{
                              background: "transparent",
                              border: "1.5px solid #FFFFFF1A",
                              color: "#FFFFFF",
                            }}
                          >
                            Back
                          </motion.button>
                          <motion.button
                            whileHover={(!selectedDate || !selectedTime) ? {} : { scale: 1.02 }}
                            whileTap={(!selectedDate || !selectedTime) ? {} : { scale: 0.97 }}
                            onClick={handleContinue}
                            className="flex-1 h-12 rounded-full font-mona-sans font-semibold text-sm transition-opacity"
                            style={{
                              background: "#A2CE3A",
                              color: "#0B0D0F",
                              opacity: (!selectedDate || !selectedTime) ? 0.45 : 1,
                            }}
                            disabled={!selectedDate || !selectedTime}
                          >
                            Continue
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.38, ease: "easeInOut" }}
                      >
                        <BookingDetailsForm
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          onBack={handleBack}
                          onSubmit={handleFormSubmit}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <V1FooterSection />
        </motion.div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
};

const ClaritySessionPage = () => {
  return (
    <Suspense
      fallback={
        <div className="bg-[#01090B] min-h-screen py-14 lg:py-20 flex items-center justify-center">
          <div className="text-white font-mona-sans text-lg">Loading...</div>
        </div>
      }
    >
      <ClaritySessionContent />
    </Suspense>
  );
};

export default ClaritySessionPage;
