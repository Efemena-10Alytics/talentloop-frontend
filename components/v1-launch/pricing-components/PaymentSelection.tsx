"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import SignupModal from "@/components/auth/SignupModal";
import SigninModal from "@/components/auth/SigninModal";
import {
  fetchPaymentQuote,
  formatMoney,
  QuoteError,
  type PaymentQuote,
} from "@/lib/services/quote.service";

interface PaymentSelectionProps {
  planId: string | number;
  planType: string;
  planPrice: string;
  planAmount?: string;
  planInstallments?: number[][] | null;
  pricingPlanData?: any;
  onPaymentSelect: (paymentOption: PaymentOption) => void;
  onBack?: () => void;
}

export interface PaymentOption {
  type: "full" | "installments";
  amount: string;
  installmentDetails?: {
    first: string;
    second: string;
  };
  /** Code the user successfully applied, sent on to checkout. */
  couponCode?: string;
  /** Server-priced schedule backing the amounts above. */
  quote?: PaymentQuote | null;
}

/**
 * Fold a freshly fetched quote into a stored selection.
 *
 * Displayed amounts are only rewritten when the quote actually carries a
 * discount — otherwise the existing strings are left alone, so a re-quote can
 * refresh the due dates without reformatting "£350.00" into "£350".
 */
export function applyQuoteToPaymentOption(
  option: PaymentOption,
  quote: PaymentQuote,
): PaymentOption {
  if (quote.discount_amount <= 0) {
    return { ...option, quote };
  }

  return {
    ...option,
    amount: formatMoney(quote.total),
    ...(option.type === "installments" && quote.installments.length > 1
      ? {
          installmentDetails: {
            first: formatMoney(quote.installments[0].amount),
            second: formatMoney(quote.installments[1].amount),
          },
        }
      : {}),
    quote,
  };
}

/**
 * Social sign-in sends the whole tab to the provider, so this component's state
 * is destroyed mid-checkout. The host pages derive the wizard step and the plan
 * from the URL, so returning to the same URL restores those on its own — these
 * two values are the only things that don't survive, so they ride in
 * sessionStorage across the round trip.
 */
const RESUME_KEY = "payment_selection_resume";

interface ResumeState {
  selectedPayment: "full" | "installments";
  /** Without this an applied coupon vanishes when the user signs in with Google. */
  appliedCode?: string | null;
}

// Fallback payment plans (used if API data not provided)
const fallbackPaymentPlans = {
  basic: { price: "£70", fullAmount: "£70" },
  premium: { price: "£250", fullAmount: "£250", installment1: "£160", installment2: "£90" },
  comprehensive: { price: "£350", fullAmount: "£350", installment1: "£225", installment2: "£125" },
  platinum: { price: "£200", fullAmount: "£200", installment1: "£130", installment2: "£70" },
};

export default function PaymentSelection({
  planId,
  planType,
  planPrice,
  planAmount,
  planInstallments,
  pricingPlanData,
  onPaymentSelect,
  onBack,
}: PaymentSelectionProps) {
  const { data: session, status } = useSession();
  const [selectedPayment, setSelectedPayment] = useState<"full" | "installments">("full");
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [pendingPaymentAfterSignup, setPendingPaymentAfterSignup] = useState(false);

  // --- Coupon / server-priced quote ---
  const [couponInput, setCouponInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [quote, setQuote] = useState<PaymentQuote | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);

  const pricingId = pricingPlanData?.id ?? planId;
  const paymentOptionNumber = selectedPayment === "installments" ? 2 : 1;

  // Use API data if provided, otherwise fallback to hardcoded plans
  const planDetails = planAmount
    ? {
        price: planPrice,
        fullAmount: planPrice,
        ...(planInstallments && planInstallments.length > 0 && {
          installment1: `£${planInstallments[0][0]}`,
          installment2: `£${planInstallments[0][1]}`,
        }),
      }
    : (fallbackPaymentPlans[String(planId).toLowerCase() as keyof typeof fallbackPaymentPlans] || fallbackPaymentPlans.premium);

  // Price the current selection server-side. Runs with or without a coupon, so
  // the confirmation step also gets the real installment due dates. Re-runs when
  // the option changes, because a coupon's split differs per schedule.
  //
  // Failure is silent by design: the fallback mock plans have no pricing row to
  // quote against, and a pricing hiccup shouldn't block someone from checking
  // out at the undiscounted price the card already shows.
  useEffect(() => {
    if (!pricingId) return;

    let cancelled = false;

    void (async () => {
      try {
        const result = await fetchPaymentQuote({
          pricingId,
          paymentOption: paymentOptionNumber,
          couponCode: appliedCode ?? undefined,
        });
        if (!cancelled) setQuote(result);
      } catch {
        if (!cancelled) setQuote(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pricingId, paymentOptionNumber, appliedCode]);

  const handleApplyCoupon = async () => {
    const code = couponInput.trim();
    if (!code) return;

    setApplying(true);
    setCouponError(null);

    try {
      const result = await fetchPaymentQuote({
        pricingId,
        paymentOption: paymentOptionNumber,
        couponCode: code,
      });
      setQuote(result);
      setAppliedCode(code);
    } catch (err: unknown) {
      setCouponError(
        err instanceof QuoteError ? err.message : "Could not apply this code. Please try again.",
      );
    } finally {
      setApplying(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCode(null);
    setCouponInput("");
    setCouponError(null);
  };

  // Prefer server-priced amounts once we have them, so what the user reads here
  // is what Stripe will charge.
  const discounted = quote && quote.discount_amount > 0 ? quote : null;
  const displayTotal = discounted ? formatMoney(discounted.total) : planDetails.fullAmount;
  const displayFirst = discounted?.installments[0]
    ? formatMoney(discounted.installments[0].amount)
    : "installment1" in planDetails
      ? String(planDetails.installment1)
      : "";
  const displaySecond = discounted?.installments[1]
    ? formatMoney(discounted.installments[1].amount)
    : "installment2" in planDetails
      ? String(planDetails.installment2)
      : "";

  const handlePaymentChange = (type: "full" | "installments") => {
    setSelectedPayment(type);
  };

  /**
   * The selection handed to the host page. Built in one place so the coupon and
   * the quoted amounts ride along on both routes out of this screen — the
   * direct Proceed, and the auto-proceed after signing in.
   */
  const buildPaymentOption = (): PaymentOption => ({
    type: selectedPayment,
    amount: displayTotal,
    ...(selectedPayment === "installments" && displayFirst && displaySecond && {
      installmentDetails: { first: displayFirst, second: displaySecond },
    }),
    ...(appliedCode ? { couponCode: appliedCode } : {}),
    quote,
  });

  const handleProceed = () => {
    // Check if user is authenticated using NextAuth session
    if (status === "unauthenticated") {
      // Show signup modal for unregistered users
      setShowSignupModal(true);
      return;
    }

    // Don't proceed if still loading session
    if (status === "loading") {
      return;
    }

    // User is authenticated, proceed with payment
    onPaymentSelect(buildPaymentOption());
  };

  const handleSignupSuccess = () => {
    // Close auth modals and mark that we need to proceed with payment after session updates
    sessionStorage.removeItem(RESUME_KEY);
    setShowSignupModal(false);
    setShowSigninModal(false);
    setPendingPaymentAfterSignup(true);
  };

  // Dismissing the modal means the user isn't signing in — drop the resume
  // state so a later visit doesn't auto-proceed out of nowhere.
  const handleAuthModalClose = () => {
    sessionStorage.removeItem(RESUME_KEY);
    setShowSignupModal(false);
    setShowSigninModal(false);
  };

  // Persist the resume state whenever an auth modal is open: from there the user
  // may pick social sign-in, which navigates away without warning.
  useEffect(() => {
    if (!showSignupModal && !showSigninModal) return;

    const resume: ResumeState = { selectedPayment, appliedCode };
    sessionStorage.setItem(RESUME_KEY, JSON.stringify(resume));
  }, [showSignupModal, showSigninModal, selectedPayment, appliedCode]);

  // Coming back from a social sign-in: restore the choice and pick up where the
  // user left off, so they don't have to re-select the plan they already chose.
  // sessionStorage is browser-only, so this has to happen after mount — reading
  // it during render would break SSR and desync hydration.
  useEffect(() => {
    const raw = sessionStorage.getItem(RESUME_KEY);
    if (!raw) return;

    sessionStorage.removeItem(RESUME_KEY);

    try {
      const resume = JSON.parse(raw) as ResumeState;
      // Restoring from a browser-only store is only possible after mount.
      if (resume?.selectedPayment) {
        setSelectedPayment(resume.selectedPayment);
      }
      if (resume?.appliedCode) {
        setAppliedCode(resume.appliedCode);
        setCouponInput(resume.appliedCode);
      }
      setPendingPaymentAfterSignup(true);
    } catch {
      // Malformed entry — nothing to resume.
    }
  }, []);

  const handleSwitchToSignin = () => {
    setShowSignupModal(false);
    setShowSigninModal(true);
  };

  const handleSwitchToSignup = () => {
    setShowSigninModal(false);
    setShowSignupModal(true);
  };

  // After signup, once session is authenticated, auto-proceed with the payment option
  useEffect(() => {
    if (pendingPaymentAfterSignup && status === "authenticated") {
      setPendingPaymentAfterSignup(false);
      onPaymentSelect(buildPaymentOption());
    }
  }, [pendingPaymentAfterSignup, status]);

  return (
    <div className="min-h-screen bg-[#01090B] py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 mb-6 text-white/60 hover:text-white transition-colors group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-x-1 transition-transform">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-mona-sans text-sm font-semibold">Back</span>
            </button>
          )}
          
          <div className="text-center">
            <h1 className="text-2xl lg:text-6xl font-mona-sans font-bold text-white mb-4">
              Confirm Your Enrollment
            </h1>
            <p className="text-white/40 font-sora text-[12px] lg:text-sm">
              Please choose a payment plan that works for you to proceed.
            </p>
          </div>
        </motion.div>

        {/* Payment Container */}
        <div className="w-full flex flex-col lg:flex-row gap-8 bg-[#1E1F2180] rounded-[12px] lg:rounded-[24px] px-3 py-5 lg:p-6">
          {/* Left Side - Payment Options */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-[65%]"
          >
            <h2 className="text-white font-mona-sans font-bold text-xl lg:text-2xl mb-6">
              Payment Options
            </h2>

            <div className="space-y-4">
              {/* Full Payment Option */}
              <button
                onClick={() => handlePaymentChange("full")}
                className="w-full rounded-[12px] lg:rounded-[24px] p-4 lg:p-6 transition-all duration-300"
                style={{
                  background: selectedPayment === "full" 
                    ? "linear-gradient(135deg, #2D3A2E 0%, #1A2420 100%)"
                    : "linear-gradient(135deg, #FFFFFF0F, #FFFFFF1A 100%)",
                  border: selectedPayment === "full" 
                    ? "1px solid #A2CE3A" 
                    : "1px solid #FFFFFF1A",
                }}
              >
                <div className="flex items-center gap-3 lg:justify-between">
                  <div className="text-left w-[60%] lg:w-full">
                    <h3 className="text-white font-mona-sans font-bold text-base lg:text-xl lg:mb-1">
                      Full Payment
                    </h3>
                    <p className="text-white/50 font-sora text-[12px] lg:text-sm">
                      Make one time payment now
                    </p>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-4 w-[40%] lg:w-full">
                    <span className="text-white font-mona-sans font-bold text-lg lg:text-3xl">
                      {displayTotal}
                    </span>
                    <div
                      className="w-4 lg:w-6 h-4 lg:h-6 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: selectedPayment === "full" ? "#A2CE3A" : "#FFFFFF4D",
                        background: selectedPayment === "full" ? "#A2CE3A" : "transparent",
                      }}
                    >
                      {selectedPayment === "full" && (
                        <div className="w-2 lg:w-3 h-2 lg:h-3 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* 2 Installments Option - Only show if installments are available */}
              {"installment1" in planDetails && "installment2" in planDetails && (
              <button
                onClick={() => handlePaymentChange("installments")}
                className="w-full rounded-[12px] lg:rounded-[24px] p-4 lg:p-6 transition-all duration-300"
                style={{
                  background: selectedPayment === "installments" 
                    ? "linear-gradient(135deg, #2D3A2E 0%, #1A2420 100%)"
                    : "linear-gradient(135deg, #FFFFFF0F, #FFFFFF1A 100%)",
                  border: selectedPayment === "installments" 
                    ? "1px solid #A2CE3A" 
                    : "1px solid #FFFFFF1A",
                }}
              >
                <div className="flex items-center gap-3 lg:justify-between">
                  <div className="text-left w-[60%] lg:w-full">
                    <h3 className="text-white font-mona-sans font-bold text-base lg:text-xl lg:mb-1">
                      2 Installments
                    </h3>
                    <p className="text-white/50 font-sora text-[12px] lg:text-sm">
                      Pay in two installments
                    </p>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-4 w-[40%] lg:w-full">
                    <span className="text-white font-mona-sans font-bold text-lg lg:text-3xl">
                      {displayTotal}
                    </span>
                    <div
                      className="w-4 lg:w-6 h-4 lg:h-6 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: selectedPayment === "installments" ? "#A2CE3A" : "#FFFFFF4D",
                        background: selectedPayment === "installments" ? "#A2CE3A" : "transparent",
                      }}
                    >
                      {selectedPayment === "installments" && (
                        <div className="w-2 lg:w-3 h-2 lg:h-3 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
              )}
            </div>
          </motion.div>

          {/* Right Side - Plan Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-[35%] rounded-[24px] lg:rounded-[32px] p-4 lg:p-8"
         style={{
                background: "linear-gradient(135deg, #FFFFFF0F, #FFFFFF1A 100%)"
              }}
          >
            {/* Most Popular Badge */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-mona-sans font-bold text-2xl">
                {pricingPlanData?.title || (planType.charAt(0).toUpperCase() + planType.slice(1))}
              </h3>
              {pricingPlanData?.is_popular && (
                <div
                  className="px-4 py-2 rounded-full flex items-center gap-2"
                  style={{
                    background: "linear-gradient(90deg, #A2CE3A 0%, #156374 100%)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1L10.163 5.38L15 6.12L11.5 9.53L12.326 14.34L8 12.08L3.674 14.34L4.5 9.53L1 6.12L5.837 5.38L8 1Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white font-mona-sans font-semibold text-xs">
                    Most Popular
                  </span>
                </div>
              )}
            </div>

            <p className="text-white/60 font-sora text-[12px] lg:text-sm mb-6">
              {pricingPlanData?.description || "For professionals tired of applying blindly."}
            </p>

            {/* Price Display */}
            <div className="mb-6">
              <div className="text-white font-mona-sans font-bold text-4xl lg:text-5xl mb-2">
                {displayTotal}
              </div>
            </div>

            {/* Installment Breakdown */}
            {selectedPayment === "installments" && "installment1" in planDetails && (
              <div 
                className="space-y-2 mb-6 p-4 rounded-[10px]"
                style={{
                  background: "#7676801F",
                  border: "1px solid #FFFFFF1A",
                }}
              >
                <div className="flex items-center justify-between font-sora text-[12px] lg:text-sm" style={{ color: "#CCCCCC" }}>
                  <span>First installment-</span>
                  <span className="font-semibold">{displayFirst}</span>
                </div>
                <div className="flex items-center justify-between font-sora text-[12px] lg:text-sm" style={{ color: "#CCCCCC" }}>
                  <span>Second installment-</span>
                  <span className="font-semibold">{displaySecond}</span>
                </div>
              </div>
            )}

            {/* Coupon */}
            <div className="mb-6">
              {appliedCode && discounted ? (
                <div
                  className="flex items-center justify-between gap-3 p-4 rounded-[10px]"
                  style={{ background: "#A2CE3A1A", border: "1px solid #A2CE3A33" }}
                >
                  <div className="font-sora text-[12px] lg:text-sm" style={{ color: "#CCCCCC" }}>
                    <span className="font-semibold" style={{ color: "#A2CE3A" }}>
                      {appliedCode.toUpperCase()}
                    </span>{" "}
                    applied — you save {formatMoney(discounted.discount_amount)}
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="font-sora text-[12px] lg:text-sm text-white/60 hover:text-white transition-colors shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleApplyCoupon();
                    }}
                    placeholder="Enter coupon code"
                    className="flex-1 min-w-0 px-4 py-3 rounded-[10px] bg-[#7676801F] border border-[#FFFFFF1A] text-white font-sora text-[12px] lg:text-sm placeholder:text-white/40 focus:outline-none focus:border-[#A2CE3A] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={applying || !couponInput.trim()}
                    className="px-4 py-3 rounded-[10px] font-mona-sans text-[12px] lg:text-sm font-semibold text-white border border-[#A2CE3A] hover:bg-[#A2CE3A1A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    {applying ? "Checking..." : "Apply"}
                  </button>
                </div>
              )}

              {couponError && (
                <p className="mt-2 font-sora text-[12px] text-red-400">{couponError}</p>
              )}
            </div>

            {/* Proceed Button */}
            <button
              onClick={handleProceed}
               className="w-full px-8 py-4 rounded-[16px] font-mona-sans text-base font-semibold text-white hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(90deg, #071522 25%, #A2CE3A 100%)",
                  boxShadow: "0px -6px 4px 0px #FFFFFF4D inset"
                }}
            >
              Proceed to Payment
            </button>
          </motion.div>
        </div>
      </div>

      {/* Signup Modal for Unregistered Users */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={handleAuthModalClose}
        onSuccess={handleSignupSuccess}
        onSwitchToSignin={handleSwitchToSignin}
      />

      {/* Signin Modal for Existing Users */}
      <SigninModal
        isOpen={showSigninModal}
        onClose={handleAuthModalClose}
        onSuccess={handleSignupSuccess}
        onSwitchToSignup={handleSwitchToSignup}
      />
    </div>
  );
}
