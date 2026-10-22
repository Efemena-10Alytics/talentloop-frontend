"use client";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckIcon = () => (
  <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="88" height="88" rx="44" fill="#A2CE3A" fillOpacity="0.15" />
    <path
      d="M29 45.5L39 55.5L59 32.5"
      stroke="#A2CE3A"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PaymentSuccessModal({ isOpen, onClose }: PaymentSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-[24px] px-8 py-10 flex flex-col items-center text-center"
        style={{
          background: "linear-gradient(0deg, #313035, #313035), linear-gradient(81.09deg, #222126 13.55%, #111116 187.95%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <CheckIcon />
        </div>

        <h2 className="text-white font-mona-sans font-bold text-xl leading-snug mb-3">
          Payment Received!
        </h2>

        <p className="text-[#9CA3AF] font-mona-sans text-sm leading-relaxed mb-8">
          Your payment has been processed successfully. Thanks for staying on track with your plan.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full font-mona-sans font-semibold text-sm text-[#0B0D0F] bg-[#A2CE3A] hover:opacity-90 transition-opacity"
          style={{ boxShadow: "0px -4px 4px 0px #FFFFFF4D inset" }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
