"use client";

interface PaymentCancelledModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CancelIcon = () => (
  <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="88" height="88" rx="44" fill="#FF383C" fillOpacity="0.15" />
    <path d="M31 31L57 57M57 31L31 57" stroke="#FF383C" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export default function PaymentCancelledModal({ isOpen, onClose }: PaymentCancelledModalProps) {
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
          <CancelIcon />
        </div>

        <h2 className="text-white font-mona-sans font-bold text-xl leading-snug mb-3">
          Payment Cancelled
        </h2>

        <p className="text-[#9CA3AF] font-mona-sans text-sm leading-relaxed mb-8">
          Your payment wasn&apos;t completed and no charges were made. You can try again anytime from the Payment Schedule below.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full font-mona-sans font-semibold text-sm text-[#9CA3AF] hover:bg-white/5 transition-colors"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
