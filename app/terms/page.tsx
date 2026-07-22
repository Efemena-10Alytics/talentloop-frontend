"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import V1FooterSection from "@/components/v1-launch/v1-footer-section";

const sections = [
  { id: "section-a", label: "A. Removal/Access Restriction Policy for Amdari" },
  { id: "section-b", label: "B. Refund Policy for TalentLoop" },
  { id: "section-c", label: "C. Deferment Policy for Talentloop" },
  { id: "section-d", label: "D. Conclusion:" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("section-a");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#01090B] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4">
        <div className="max-w-[900px] mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl lg:text-4xl font-mona-sans font-bold text-white text-center mb-10">
            Terms and Conditions
          </h1>

          {/* Single bordered card wrapping BOTH sidebar and content */}
          <div
            className="rounded-[16px] p-6 lg:p-10"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className="lg:w-[280px] flex-shrink-0">
                <div className="sticky top-28">
                  <p
                    className="font-mona-sans text-xs font-semibold mb-5 px-3 py-1.5 rounded-full w-fit"
                    style={{
                      background: "rgba(162,206,58,0.12)",
                      color: "#A2CE3A",
                      border: "1px solid rgba(162,206,58,0.2)",
                    }}
                  >
                    Page Content
                  </p>
                  <nav className="flex flex-col">
                    {sections.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        className="text-left px-3 py-3 font-mona-sans text-sm transition-colors"
                        style={{
                          color: activeSection === s.id ? "#FFFFFF" : "#95ACCB",
                          fontWeight: activeSection === s.id ? 600 : 400,
                          borderBottom:
                            i < sections.length - 1
                              ? "1px solid rgba(255,255,255,0.08)"
                              : "none",
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Content */}
              <div
                className="flex-1 font-plus-jakarta text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {/* Intro */}
                <div className="mb-8 space-y-4">
                  <p>
                    Hello and welcome to TALENTLOOP! We help you land interviews and offers by managing your job
                    applications, optimizing your CV &amp; LinkedIn, and positioning you for success. We also want to
                    ensure you&apos;re fully aware of all the terms and conditions associated with our program.
                  </p>
                  <p>
                    As a Client in our program, please update yourself on the policies and procedures outlined in
                    this document. Please carefully read and comprehend these terms and conditions before starting
                    this program.
                  </p>
                </div>

                {/* A */}
                <section id="section-a" className="mb-10 scroll-mt-32">
                  <h2 className="text-lg font-mona-sans font-bold text-white mb-3">
                    A. Removal/Access Restriction Policy for Amdari
                  </h2>
                  <p className="mb-4">
                    Clients in any of Amdari&apos;s programs may have their access restricted or be removed under
                    the following circumstances:
                  </p>
                  <div className="space-y-4">
                    <p>
                      <strong className="text-white">1. Installment Payment:</strong> All installment agreements
                      must be honoured. All clients are required to make installment payments on or before their
                      agreed installment date which is on a monthly basis. If ability to meet the agreed date is
                      impaired, a mail must be sent to{" "}
                      <a href="mailto:talentloop@amdari.io" className="text-[#A2CE3A] underline">
                        talentloop@amdari.io
                      </a>{" "}
                      to agree on a compromise to payments. However, this mail must be received before installment
                      date in order to be considered by the finance team.
                    </p>
                    <p>
                      <strong className="text-white">2. Failure to make Installment Payment:</strong> Failure to
                      make payment on or before agreed installment date will result in your profile being flagged
                      for immediate removal. A grace period of two (2) days will be provided from the initial agreed
                      installment date. After which said clients will be removed from all TalentLoop platforms and
                      contract terminated.
                    </p>
                    <p>
                      <strong className="text-white">3. Engagement:</strong> Clients are expected to engage with
                      their associate at all agreed meeting timeframes. Repeated unexcused absences or missed
                      deadlines without valid reasons will lead to removal from the program WITHOUT a refund.
                    </p>
                    <p>
                      <strong className="text-white">4. Conduct:</strong> Clients are expected to conduct
                      themselves professionally and respectfully at all times. If a client engages in disruptive or
                      disrespectful behavior, they may be given a warning. If the behavior continues, they will be
                      removed from the program.
                    </p>
                  </div>
                </section>

                {/* B */}
                <section id="section-b" className="mb-10 scroll-mt-32">
                  <h2 className="text-lg font-mona-sans font-bold text-white mb-3">
                    B. Refund Policy for TalentLoop
                  </h2>
                  <p className="mb-4">
                    We have devised the following refund policy to make sure that everything is done fairly and
                    openly for parties involved:
                  </p>
                  <div className="space-y-3">
                    <p>
                      <strong className="text-white">1.</strong> Cancellations made more than 7 days prior to the
                      orientation will receive a full refund (less non-fundable).
                    </p>
                    <p>
                      <strong className="text-white">2.</strong> Cancellations made less than 7 days prior to the
                      orientation date will receive a 75% refund (less non-fundable).
                    </p>
                    <p>
                      <strong className="text-white">3.</strong> Cancellations made between 0–7 days after the
                      orientation date will receive a 50% refund (less non-fundable).
                    </p>
                    <p>
                      <strong className="text-white">4.</strong> Cancellations made 7 days after the orientation,
                      or for no-shows, will not be eligible for a refund.
                    </p>
                    <p>
                      <strong className="text-white">5.</strong> Once the refund request has been received and
                      reviewed, our finance team will process the refund within 7–10 business days.
                    </p>
                    <p>
                      <strong className="text-white">6.</strong> Refunds for payments made up to 1 month in advance
                      of the orientation will be subject to 50% cancellation fees, while 2 months and above in
                      advance are non-refundable.
                    </p>
                    <p>
                      <strong className="text-white">7.</strong> All refunds issued will be less a 10%
                      non-refundable fee.
                    </p>
                    <p>
                      <strong className="text-white">8.</strong> The responsible Employability Associate must be
                      informed of this and requests for refunds must be submitted to Talentloop via email at{" "}
                      <a href="mailto:talentloop@amdari.io" className="text-[#A2CE3A] underline">
                        talentloop@amdari.io
                      </a>{" "}
                      and copy{" "}
                      <a href="mailto:finance@amdari.io" className="text-[#A2CE3A] underline">
                        finance@amdari.io
                      </a>.
                    </p>
                  </div>
                </section>

                {/* C */}
                <section id="section-c" className="mb-10 scroll-mt-32">
                  <h2 className="text-lg font-mona-sans font-bold text-white mb-3">
                    C. Deferment Policy for Talentloop
                  </h2>
                  <p className="mb-4">
                    This deferment policy has been created to provide Clients with the opportunity to defer their
                    enrollment in a program for a future date.
                  </p>
                  <p className="font-semibold text-white mb-2">Deferment Criteria:</p>
                  <p className="mb-4">
                    The deferment of a program enrollment may be approved under the following circumstances:
                  </p>
                  <div className="space-y-3">
                    <p>
                      <strong className="text-white">1. Health reasons:</strong> In the event of a medical
                      emergency or an illness, a Client may defer their enrollment to a future program. A medical
                      certificate or doctor&apos;s note may be required as proof.
                    </p>
                    <p>
                      <strong className="text-white">2. Personal circumstances:</strong> Personal circumstances
                      such as bereavement, family emergencies, or work-related issues may also be considered as
                      valid reasons for deferment.
                    </p>
                    <p>
                      <strong className="text-white">3. Change in employment:</strong> If a Client&apos;s
                      employment changes and they are unable to participate in the program, they may defer their
                      enrollment to a future program.
                    </p>
                  </div>
                </section>

                {/* D */}
                <section id="section-d" className="mb-10 scroll-mt-32">
                  <h2 className="text-lg font-mona-sans font-bold text-white mb-3">D. Conclusion:</h2>
                  <div className="space-y-4">
                    <p>
                      This policy has been created to provide Clients with the opportunity to defer their enrollment
                      in a program for a future date and request for a refund if life presents unexpected challenges.
                      Talentloop will review each deferment request on a case-by-case basis and will make a decision
                      based on the information provided by the Client.
                    </p>
                    <p>
                      This policy is subject to change at any time, and Clients will be notified of any changes in
                      writing. If you have any questions or concerns about our policy, please do not hesitate to
                      contact us.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <V1FooterSection />
    </div>
  );
}