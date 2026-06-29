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
              background: "linear-gradient(180deg, #0A3A3F 0%, #051E21 100%)",
            }}
          >
            {/* Header */}
            <div className="p-6 lg:p-8 border-b border-white/10">
              <h2 className="text-2xl lg:text-3xl font-mona-sans font-bold" style={{ color: "#A2CE3A" }}>
                Terms & Conditions
              </h2>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 lg:p-8 overflow-y-auto max-h-[50vh] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="space-y-6 text-white/80 font-plus-jakarta text-sm leading-relaxed">
                <p>
                  Hello and welcome to Amdari! We are dedicated to offering you hands-on, project-based
                  internship designed to provide you with real world experience, and we want to make sure
                  you are aware of all the terms and conditions that come with taking part in our program.
                </p>

                <p>
                  As a participant in our program, please update yourself on the policies and procedures
                  outlined in this document. Please carefully read and comprehend these terms and
                  conditions before starting this program.
                </p>

                <p>
                  Our goal at Amdari is to provide each participant with exceptional opportunities for real-
                  world experience through projects and internships that build practical skills. However,
                  we acknowledge that unforeseen circumstances may sometimes necessitate a refund or
                  deferment.
                </p>

                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#A2CE3A" }}>
                    Removal/Access Restriction Policy for Amdari
                  </h3>
                  <p className="mb-3">
                    Participants in any of Amdari's programs may have their access restricted or be removed
                    under the following circumstances:
                  </p>

                  <div className="space-y-3 pl-4">
                    <p>
                      <strong>1. Installment Payment:</strong> All installment agreements must be honoured. All participants are
                      required to make installment payments on or before their agreed installment date. If
                      ability to meet the agreed date is impaired, a mail must be sent to finance@amdari.io to
                      agree on a compromise to payments. However, this mail must be received before
                      installment date in order to be considered by the finance team.
                    </p>

                    <p>
                      <strong>2. Failure to make Installment Payment:</strong> Failure to make payment on or before agreed
                      installment date will result in your profile being flagged for immediate removal. A grace
                      period of 7 days will be given to make payment before removal. If payment is not made
                      within this period, access will be restricted, and the participant will be removed from the
                      program.
                    </p>

                    <p>
                      <strong>3. Misconduct or Violation of Program Policies:</strong> Any participant found engaging in
                      misconduct, including but not limited to harassment, dishonesty, or violation of Amdari's
                      code of conduct, will face immediate removal from the program.
                    </p>

                    <p>
                      <strong>4. Failure to Meet Program Requirements:</strong> Participants who consistently fail to meet
                      program requirements, including attendance, project deadlines, or performance
                      standards, may have their access restricted or be removed after a warning period.
                    </p>

                    <p>
                      <strong>5. Non-Compliance with Terms and Conditions:</strong> Any breach of the terms and conditions
                      outlined in this document may result in immediate removal or access restriction.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#A2CE3A" }}>
                    Refund Policy
                  </h3>
                  <p className="mb-3">
                    Amdari is committed to providing high-quality programs and services. However, we
                    understand that circumstances may arise that require a refund. Please review our refund
                    policy below:
                  </p>

                  <div className="space-y-3 pl-4">
                    <p>
                      <strong>1. Full Refund:</strong> Participants may request a full refund within 7 days of enrollment if they
                      have not yet accessed any program materials or attended any sessions. Refund requests
                      must be submitted in writing to finance@amdari.io.
                    </p>

                    <p>
                      <strong>2. Partial Refund:</strong> After the 7-day period, refunds will be considered on a case-by-case
                      basis. Partial refunds may be granted if the participant has completed less than 25% of
                      the program. Refund amounts will be prorated based on the portion of the program
                      completed.
                    </p>

                    <p>
                      <strong>3. No Refund:</strong> No refunds will be issued if the participant has completed more than 25%
                      of the program or if the participant is removed due to misconduct or violation of program
                      policies.
                    </p>

                    <p>
                      <strong>4. Processing Time:</strong> Approved refunds will be processed within 14-21 business days from
                      the date of approval. Refunds will be issued to the original payment method.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#A2CE3A" }}>
                    Deferment Policy
                  </h3>
                  <p className="mb-3">
                    Amdari understands that participants may need to defer their enrollment due to personal
                    or professional reasons. Please review our deferment policy below:
                  </p>

                  <div className="space-y-3 pl-4">
                    <p>
                      <strong>1. Deferment Request:</strong> Participants may request to defer their enrollment to a future
                      cohort by submitting a written request to support@amdari.io. Deferment requests must
                      be submitted at least 14 days before the program start date.
                    </p>

                    <p>
                      <strong>2. Approval:</strong> Deferment requests will be reviewed on a case-by-case basis. Approval is
                      not guaranteed and will depend on availability in future cohorts and the reason for
                      deferment.
                    </p>

                    <p>
                      <strong>3. Fees:</strong> No additional fees will be charged for approved deferments. However, if the
                      program fee increases in the future cohort, the participant will be required to pay the
                      difference.
                    </p>

                    <p>
                      <strong>4. Limitations:</strong> Participants may defer their enrollment only once. If a participant defers
                      and then requests another deferment, the request will not be granted, and the
                      participant will need to re-enroll and pay the full program fee.
                    </p>
                  </div>
                </div>

                <p className="pt-4">
                  By enrolling in Amdari's programs, you acknowledge that you have read, understood, and
                  agree to abide by these terms and conditions. If you have any questions or concerns,
                  please contact us at support@amdari.io.
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-6 lg:p-8 border-t border-white/10 flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 h-12 px-6 rounded-[12px] font-mona-sans text-sm font-semibold transition-opacity hover:opacity-80"
                style={{
                  background: "transparent",
                  border: "1px solid #FFFFFF33",
                  color: "#FFFFFF",
                }}
              >
                Decline
              </button>
              <button
                onClick={onAgree}
                className="flex-1 h-12 px-6 rounded-[12px] font-mona-sans text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: "#00A896",
                  border: "1px solid #FFFFFF1A",
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
