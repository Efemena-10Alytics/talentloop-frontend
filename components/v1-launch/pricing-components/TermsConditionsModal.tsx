"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TermsConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export default function TermsConditionsModal({
  isOpen,
  onClose,
  onAgree,
}: TermsConditionsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-[700px] max-h-[80vh] rounded-[24px] overflow-hidden"
            style={{
              background: "#072329",
            }}
          >
            {/* Header */}
            <div className="py-3 px-4 lg:px-8 border-b border-white/10">
              <h2 className="text-2xl font-mona-sans font-bold" style={{ color: "#A2CE3A" }}>
                Terms & Conditions
              </h2>
            </div>

            {/* Scrollable Content */}
            <div className="pt-3 pb-7 px-4 lg:px-8 overflow-y-auto max-h-[50vh] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="space-y-6 text-white/80 font-plus-jakarta text-sm leading-relaxed">
                <p>
                  Hello and welcome to TALENTLOOP! We help you land interviews and offers by managing
                  your job applications, optimizing your CV &amp; LinkedIn, and positioning you for success.
                  We also want to ensure you&apos;re fully aware of all the terms and conditions associated
                  with our program.
                </p>

                <p>
                  As a Client in our program, please update yourself on the policies and procedures
                  outlined in this document. Please carefully read and comprehend these terms and
                  conditions before starting this program.
                </p>

                {/* A. Removal/Access Restriction Policy */}
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#A2CE3A" }}>
                    A. Removal/Access Restriction Policy for Amdari
                  </h3>
                  <p className="mb-3">
                    Clients in any of Amdari&apos;s programs may have their access restricted or be removed
                    under the following circumstances:
                  </p>
                  <div className="space-y-3 pl-4">
                    <p>
                      <strong>1. Installment Payment:</strong> All installment agreements must be honoured.
                      All clients are required to make installment payments on or before their agreed
                      installment date which is on a monthly basis. If ability to meet the agreed date is
                      impaired, a mail must be sent to{" "}
                      <a href="mailto:talentloop@amdari.io" className="text-[#A2CE3A] underline">
                        talentloop@amdari.io
                      </a>{" "}
                      to agree on a compromise to payments. However, this mail must be received before
                      installment date in order to be considered by the finance team.
                    </p>
                    <p>
                      <strong>2. Failure to make Installment Payment:</strong> Failure to make payment on
                      or before agreed installment date will result in your profile being flagged for immediate
                      removal. A grace period of two (2) days will be provided from the initial agreed
                      installment date. After which said clients will be removed from all TalentLoop platforms
                      and contract terminated.
                    </p>
                    <p>
                      <strong>3. Engagement:</strong> Clients are expected to engage with their associate at
                      all agreed meeting timeframes. Repeated unexcused absences or missed deadlines
                      without valid reasons will lead to removal from the program WITHOUT a refund.
                    </p>
                    <p>
                      <strong>4. Conduct:</strong> Clients are expected to conduct themselves professionally
                      and respectfully at all times. If a client engages in disruptive or disrespectful
                      behavior, they may be given a warning. If the behavior continues, they will be removed
                      from the program.
                    </p>
                  </div>
                </div>

                {/* B. Refund Policy */}
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#A2CE3A" }}>
                    B. Refund Policy for TalentLoop
                  </h3>
                  <p className="mb-3">
                    We have devised the following refund policy to make sure that everything is done fairly
                    and openly for parties involved:
                  </p>
                  <div className="space-y-3 pl-4">
                    <p>
                      <strong>1.</strong> Cancellations made more than 7 days prior to the orientation will
                      receive a full refund (less non-fundable).
                    </p>
                    <p>
                      <strong>2.</strong> Cancellations made less than 7 days prior to the orientation date
                      will receive a 75% refund (less non-fundable).
                    </p>
                    <p>
                      <strong>3.</strong> Cancellations made between 0–7 days after the orientation date
                      will receive a 50% refund (less non-fundable).
                    </p>
                    <p>
                      <strong>4.</strong> Cancellations made 7 days after the orientation, or for no-shows,
                      will not be eligible for a refund.
                    </p>
                    <p>
                      <strong>5.</strong> Once the refund request has been received and reviewed, our
                      finance team will process the refund within 7–10 business days.
                    </p>
                    <p>
                      <strong>6.</strong> Refunds for payments made up to 1 month in advance of the
                      orientation will be subject to 50% cancellation fees, while 2 months and above in
                      advance are non-refundable.
                    </p>
                    <p>
                      <strong>7.</strong> All refunds issued will be less a 10% non-refundable fee.
                    </p>
                    <p>
                      <strong>8.</strong> The responsible Employability Associate must be informed of this
                      and requests for refunds must be submitted to Talentloop via email at{" "}
                      <a href="mailto:talentloop@amdari.io" className="text-[#A2CE3A] underline">
                        talentloop@amdari.io
                      </a>{" "}
                      and copy{" "}
                      <a href="mailto:finance@amdari.io" className="text-[#A2CE3A] underline">
                        finance@amdari.io
                      </a>.
                    </p>
                  </div>
                </div>

                {/* C. Deferment Policy */}
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#A2CE3A" }}>
                    C. Deferment Policy for Talentloop
                  </h3>
                  <p className="mb-3">
                    This deferment policy has been created to provide Clients with the opportunity to defer
                    their enrollment in a program for a future date.
                  </p>
                  <p className="mb-2 font-semibold text-white/90">Deferment Criteria:</p>
                  <p className="mb-3">
                    The deferment of a program enrollment may be approved under the following circumstances:
                  </p>
                  <div className="space-y-3 pl-4">
                    <p>
                      <strong>1. Health reasons:</strong> In the event of a medical emergency or an illness,
                      a Client may defer their enrollment to a future program. A medical certificate or
                      doctor&apos;s note may be required as proof.
                    </p>
                    <p>
                      <strong>2. Personal circumstances:</strong> Personal circumstances such as
                      bereavement, family emergencies, or work-related issues may also be considered as
                      valid reasons for deferment.
                    </p>
                    <p>
                      <strong>3. Change in employment:</strong> If a Client&apos;s employment changes and
                      they are unable to participate in the program, they may defer their enrollment to a
                      future program.
                    </p>
                  </div>
                  <p className="mt-4">
                    This policy has been created to provide Clients with the opportunity to defer their
                    enrollment in a program for a future date and request for a refund if life presents
                    unexpected challenges. Talentloop will review each deferment request on a case-by-case
                    basis and will make a decision based on the information provided by the Client.
                  </p>
                  <p className="mt-3">
                    This policy is subject to change at any time, and Clients will be notified of any changes
                    in writing. If you have any questions or concerns about our policy, please do not hesitate
                    to contact us.
                  </p>
                </div>

                <p className="pt-2 font-semibold text-white/90">
                  Thank you,<br />Team TalentLoop
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-6 lg:p-0 border-t border-white/10 flex gap-4 lg:gap-0">
              <button
                onClick={onClose}
                className="flex-1 h-12 lg:h-[70px] px-6 rounded-[12px] lg:rounded-r-[0px] font-mona-sans text-sm font-semibold transition-opacity hover:opacity-80"
                style={{
                  background: "#E8EFF1",
                  border: "1px solid #FFFFFF33",
                  color: "#64748B",
                }}
              >
                Decline
              </button>
              <button
                onClick={onAgree}
                className="flex-1 h-12 lg:h-[70px] px-6 rounded-[12px] lg:rounded-l-[0px] font-mona-sans text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: "#156374",
                  color: "#FFFFFF",
                }}
              >
                Agree →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
