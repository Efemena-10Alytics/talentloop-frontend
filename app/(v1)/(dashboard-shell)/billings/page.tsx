"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import DashboardNavbar from "@/components/v1-dashboard/DashboardNavbar";
import StatCard from "@/components/v1-dashboard/StatCard";
import { useToast } from "@/components/ui/use-toast";
import { useMinLoadingTime } from "@/hooks/useMinLoadingTime";
import {
  useBilling,
  useBillingSchedules,
  ScheduleStatusFilter,
} from "@/hooks/useBilling";
import { payInvoice, downloadReceipt, formatMoney } from "@/lib/services/billing.service";
import PaymentScheduleTable, {
  PaymentScheduleRow,
} from "@/components/v1-dashboard/billings/PaymentScheduleTable";
import CurrentPlanCard, {
  CurrentPlanDetails,
} from "@/components/v1-dashboard/billings/CurrentPlanCard";
import PaymentSuccessModal from "@/components/v1-dashboard/billings/PaymentSuccessModal";
import PaymentCancelledModal from "@/components/v1-dashboard/billings/PaymentCancelledModal";

const BillingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#0C6746" />
    <g transform="translate(6.5 7.5)">
      <path
        d="M17.25 3H2.25C2.05109 3 1.86032 2.92098 1.71967 2.78033C1.57902 2.63968 1.5 2.44891 1.5 2.25C1.5 2.05109 1.57902 1.86032 1.71967 1.71967C1.86032 1.57902 2.05109 1.5 2.25 1.5H15C15.1989 1.5 15.3897 1.42098 15.5303 1.28033C15.671 1.13968 15.75 0.948912 15.75 0.75C15.75 0.551088 15.671 0.360322 15.5303 0.21967C15.3897 0.0790178 15.1989 0 15 0H2.25C1.65326 0 1.08097 0.237053 0.65901 0.65901C0.237053 1.08097 0 1.65326 0 2.25V14.25C0 14.8467 0.237053 15.419 0.65901 15.841C1.08097 16.2629 1.65326 16.5 2.25 16.5H17.25C17.6478 16.5 18.0294 16.342 18.3107 16.0607C18.592 15.7794 18.75 15.3978 18.75 15V4.5C18.75 4.10218 18.592 3.72064 18.3107 3.43934C18.0294 3.15804 17.6478 3 17.25 3ZM17.25 15H2.25C2.05109 15 1.86032 14.921 1.71967 14.7803C1.57902 14.6397 1.5 14.4489 1.5 14.25V4.37156C1.74082 4.45693 1.9945 4.50037 2.25 4.5H17.25V15ZM12.75 9.375C12.75 9.1525 12.816 8.93499 12.9396 8.74998C13.0632 8.56498 13.2389 8.42078 13.4445 8.33564C13.65 8.25049 13.8762 8.22821 14.0945 8.27162C14.3127 8.31502 14.5132 8.42217 14.6705 8.5795C14.8278 8.73684 14.935 8.93729 14.9784 9.15552C15.0218 9.37375 14.9995 9.59995 14.9144 9.80552C14.8292 10.0111 14.685 10.1868 14.5 10.3104C14.315 10.434 14.0975 10.5 13.875 10.5C13.5766 10.5 13.2905 10.3815 13.0795 10.1705C12.8685 9.95952 12.75 9.67337 12.75 9.375Z"
        fill="#E8EFF1"
      />
    </g>
  </svg>
);

const CalendarBadgeIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="12" fill="#A2CE3A" fillOpacity="0.15" />
    <path
      d="M38.0957 17.5234V23.6187M25.9052 17.5234V23.6187M45.7147 32.7615C45.7147 27.0152 45.7147 24.1413 43.9288 22.357C42.1429 20.5726 39.2705 20.5711 33.5242 20.5711H30.4766C24.7303 20.5711 21.8564 20.5711 20.072 22.357C18.2877 24.1429 18.2861 27.0152 18.2861 32.7615V35.8092C18.2861 41.5554 18.2861 44.4293 20.072 46.2137C21.8579 47.9981 24.7303 47.9996 30.4766 47.9996M18.2861 29.7139H45.7147"
      stroke="#A2CE3A"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M41.5493 42.973L39.6187 41.9048V39.264M45.7139 41.9048C45.7139 43.5214 45.0717 45.0717 43.9287 46.2148C42.7856 47.3579 41.2352 48 39.6187 48C38.0021 48 36.4518 47.3579 35.3087 46.2148C34.1656 45.0717 33.5234 43.5214 33.5234 41.9048C33.5234 40.2883 34.1656 38.7379 35.3087 37.5948C36.4518 36.4517 38.0021 35.8096 39.6187 35.8096C41.2352 35.8096 42.7856 36.4517 43.9287 37.5948C45.0717 38.7379 45.7139 40.2883 45.7139 41.9048Z"
      stroke="#A2CE3A"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PayNowIcon = () => (
  <svg width="18" height="12" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.1475 1.12878C22.0395 1.06139 21.9162 1.02259 21.7891 1.01603C21.662 1.00947 21.5353 1.03536 21.4209 1.09128C17.3962 3.06003 14.5219 2.13753 11.4834 1.1644C8.29594 0.143465 4.99125 -0.911222 0.425625 1.31815C0.29806 1.37934 0.190404 1.47537 0.115091 1.59514C0.0397771 1.71491 -0.000122227 1.85354 2.81267e-07 1.99503V13.2385C-1.76404e-05 13.3657 0.0323425 13.4909 0.0940354 13.6022C0.155728 13.7135 0.244725 13.8072 0.35265 13.8747C0.460575 13.9421 0.583879 13.9809 0.710959 13.9876C0.838038 13.9942 0.964713 13.9684 1.07906 13.9125C5.10375 11.9438 7.97812 12.8663 11.0212 13.8394C12.825 14.416 14.6625 15.0038 16.74 15.0038C18.3422 15.0038 20.0897 14.655 22.0753 13.6857C22.2014 13.6241 22.3077 13.5283 22.3822 13.4094C22.4566 13.2904 22.4961 13.1529 22.4963 13.0125V1.76909C22.4974 1.64151 22.4659 1.51575 22.4049 1.4037C22.3439 1.29166 22.2553 1.19703 22.1475 1.12878ZM21 12.5353C17.1938 14.2388 14.4141 13.35 11.4788 12.4116C9.675 11.835 7.8375 11.2472 5.76 11.2472C4.30041 11.2543 2.85567 11.5407 1.50375 12.091V2.47222C5.31 0.768778 8.08969 1.65753 11.025 2.59597C13.9603 3.5344 16.9819 4.50378 21 2.91846V12.5353ZM11.25 4.50378C10.6567 4.50378 10.0766 4.67973 9.58329 5.00937C9.08994 5.33901 8.70542 5.80755 8.47836 6.35573C8.2513 6.90391 8.19189 7.50711 8.30764 8.08905C8.4234 8.67099 8.70912 9.20554 9.12868 9.6251C9.54824 10.0447 10.0828 10.3304 10.6647 10.4461C11.2467 10.5619 11.8499 10.5025 12.3981 10.2754C12.9462 10.0484 13.4148 9.66384 13.7444 9.17049C14.0741 8.67714 14.25 8.09712 14.25 7.50378C14.25 6.70813 13.9339 5.94507 13.3713 5.38246C12.8087 4.81985 12.0456 4.50378 11.25 4.50378ZM11.25 9.00378C10.9533 9.00378 10.6633 8.9158 10.4166 8.75098C10.17 8.58616 9.97771 8.35189 9.86418 8.0778C9.75065 7.80371 9.72094 7.50211 9.77882 7.21114C9.8367 6.92017 9.97956 6.6529 10.1893 6.44312C10.3991 6.23334 10.6664 6.09048 10.9574 6.0326C11.2483 5.97472 11.5499 6.00443 11.824 6.11796C12.0981 6.23149 12.3324 6.42375 12.4972 6.67042C12.662 6.9171 12.75 7.20711 12.75 7.50378C12.75 7.9016 12.592 8.28313 12.3107 8.56444C12.0294 8.84574 11.6478 9.00378 11.25 9.00378ZM4.5 4.50378V9.00378C4.5 9.20269 4.42098 9.39346 4.28033 9.53411C4.13968 9.67476 3.94891 9.75378 3.75 9.75378C3.55109 9.75378 3.36032 9.67476 3.21967 9.53411C3.07902 9.39346 3 9.20269 3 9.00378V4.50378C3 4.30487 3.07902 4.1141 3.21967 3.97345C3.36032 3.8328 3.55109 3.75378 3.75 3.75378C3.94891 3.75378 4.13968 3.8328 4.28033 3.97345C4.42098 4.1141 4.5 4.30487 4.5 4.50378ZM18 10.5038V6.00378C18 5.80487 18.079 5.6141 18.2197 5.47345C18.3603 5.3328 18.5511 5.25378 18.75 5.25378C18.9489 5.25378 19.1397 5.3328 19.2803 5.47345C19.421 5.6141 19.5 5.80487 19.5 6.00378V10.5038C19.5 10.7027 19.421 10.8935 19.2803 11.0341C19.1397 11.1748 18.9489 11.2538 18.75 11.2538C18.5511 11.2538 18.3603 11.1748 18.2197 11.0341C18.079 10.8935 18 10.7027 18 10.5038Z"
      fill="#394814"
    />
  </svg>
);

function BillingsPageContent() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { data: billing, isLoading: isBillingLoading } = useBilling();
  const [statusFilter, setStatusFilter] = useState<ScheduleStatusFilter>("all");
  const [page, setPage] = useState(1);
  const { data: schedules, isLoading: isSchedulesLoading } = useBillingSchedules({
    page,
    status: statusFilter,
  });

  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [payingBanner, setPayingBanner] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelledModal, setShowCancelledModal] = useState(false);

  const isLoading = useMinLoadingTime(isBillingLoading, 1500);
  const isScheduleLoading = useMinLoadingTime(isSchedulesLoading, 1500);

  // Returning from Stripe Checkout: show the outcome, refresh billing data
  // (once now, once more after the webhook has had time to land), then
  // drop ?status= from the URL.
  useEffect(() => {
    const status = searchParams.get("status");
    if (!status) return;

    if (status === "success") {
      setShowSuccessModal(true);
    } else if (status === "cancelled") {
      setShowCancelledModal(true);
    }

    const refresh = () => {
      queryClient.invalidateQueries({ queryKey: ["billing"] });
      queryClient.invalidateQueries({ queryKey: ["billing-schedules"] });
    };

    refresh();
    const timer = setTimeout(refresh, 4000);

    router.replace("/billings");

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const symbol = billing?.currency_symbol ?? "£";

  const handlePay = async (invoiceId: number) => {
    try {
      // No successUrl/cancelUrl here — the backend's own default now returns
      // to /billings with ?status=success|cancelled already attached.
      // Passing our own would override that and drop the status param.
      const checkoutUrl = await payInvoice(invoiceId);
      window.location.href = checkoutUrl;
    } catch (error) {
      toast({
        variant: "error",
        title: "Payment failed",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const handleBannerPay = () => {
    if (!billing?.banner.invoice_id) return;
    setPayingBanner(true);
    handlePay(billing.banner.invoice_id).finally(() => setPayingBanner(false));
  };

  const handleViewReceipt = async (row: PaymentScheduleRow) => {
    setDownloadingId(row.id);
    try {
      await downloadReceipt(row.id);
    } catch (error) {
      toast({
        variant: "error",
        title: "Download failed",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setDownloadingId(null);
    }
  };

  const scheduleRows: PaymentScheduleRow[] = (schedules?.data ?? []).map((item) => ({
    id: item.id,
    sequence: item.sequence,
    dueDate: item.formatted_due_date ?? "—",
    description: item.description,
    amount: formatMoney(item.amount, symbol),
    status: item.status,
    statusLabel: item.status_label,
    hasReceipt: !!item.receipt_url,
  }));

  const currentPlan: CurrentPlanDetails | null = billing
    ? {
        planLabel: billing.current_plan.plan_title,
        status: billing.current_plan.status,
        statusLabel: billing.current_plan.status_label,
        planAmount: formatMoney(billing.current_plan.plan_amount, symbol),
        installments: billing.current_plan.installments_count,
        installmentAmount: formatMoney(billing.current_plan.installment_amount, symbol),
        startDate: billing.current_plan.start_date ?? "—",
        nextDueDate: billing.current_plan.next_due_date ?? "—",
      }
    : null;

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <DashboardNavbar
        pageTitle="Billings"
        pageIcon={<BillingIcon />}
        actionSlot={
          billing?.pricing_title ? (
            <span
              className="px-4 py-1.5 rounded-full text-xs font-mona-sans font-semibold whitespace-nowrap"
              style={{ color: "#C084FC", background: "rgba(168, 85, 247, 0.15)" }}
            >
              {billing.pricing_title}
            </span>
          ) : undefined
        }
      />

      {/* Next Payment banner */}
      {isLoading ? (
        <div
          className="rounded-2xl p-5 mb-6 h-[84px]"
          style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
        />
      ) : billing?.banner.has_next_payment ? (
        <div
          className="rounded-2xl p-5 mb-6 flex items-center justify-between flex-wrap gap-4"
          style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <CalendarBadgeIcon />
            </div>
            <div>
              <p className="text-[#95ACCB] text-xs font-mona-sans mb-1">Next Payment Date</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-mona-sans font-bold text-lg lg:text-xl">
                  {billing.banner.formatted_date}
                </span>
                {billing.banner.due_label && (
                  <span
                    className="px-3 py-1 rounded-full text-xs font-jakarta-sans font-medium"
                    style={{
                      color: billing.banner.is_overdue ? "#FF383C" : "#A2CE3A",
                      background: billing.banner.is_overdue
                        ? "rgba(255, 56, 60, 0.15)"
                        : "rgba(162, 206, 58, 0.15)",
                    }}
                  >
                    {billing.banner.due_label}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 sm:gap-10 flex-wrap">
            <div>
              <p className="text-[#95ACCB] text-xs font-mona-sans mb-1">{billing.banner.installment_label}</p>
              <p className="text-white font-mona-sans font-bold text-lg lg:text-xl">
                {formatMoney(billing.banner.amount, symbol)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleBannerPay}
              disabled={payingBanner}
              className="flex items-center gap-2 px-6 py-3 rounded-[10px] font-mona-sans font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: "#A2CE3A", color: "#0B0F10" }}
            >
              <PayNowIcon /> {payingBanner ? "Redirecting..." : "Pay Now"}
            </button>
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl p-5 mb-6"
          style={{ background: "#1563741A", border: "0.5px solid #FFFFFF1A" }}
        >
          <p className="text-white font-mona-sans font-semibold text-sm">
            No upcoming payments — your payment has been completed
          </p>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="TOTAL PLAN AMOUNT"
          value={isLoading ? "—" : formatMoney(billing?.metrics.total_plan_amount ?? 0, symbol)}
          isLoading={isLoading}
        />
        <StatCard
          title="TOTAL PAID"
          value={isLoading ? "—" : formatMoney(billing?.metrics.total_paid ?? 0, symbol)}
          isLoading={isLoading}
        />
        <StatCard
          title="REMAINING BALANCE"
          value={isLoading ? "—" : formatMoney(billing?.metrics.remaining_balance ?? 0, symbol)}
          isLoading={isLoading}
        />
        <StatCard
          title="PAYMENT STATUS"
          value={isLoading ? "—" : billing?.metrics.status_label ?? "—"}
          isLoading={isLoading}
        />
      </div>

      {/* Payment Schedule + Current Plan */}
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-[68%]">
          <PaymentScheduleTable
            installmentsLabel={billing?.current_plan.installments_badge ?? ""}
            rows={scheduleRows}
            isLoading={isScheduleLoading}
            statusFilter={statusFilter}
            onStatusFilterChange={(status) => {
              setStatusFilter(status);
              setPage(1);
            }}
            page={schedules?.meta?.current_page ?? page}
            lastPage={schedules?.meta?.last_page ?? 1}
            onPageChange={setPage}
            onViewReceipt={handleViewReceipt}
            downloadingId={downloadingId}
          />
        </div>

        <div className="lg:w-[32%] flex flex-col gap-5">
          {currentPlan && !isLoading && <CurrentPlanCard plan={currentPlan} />}
        </div>
      </div>

      <PaymentSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <PaymentCancelledModal isOpen={showCancelledModal} onClose={() => setShowCancelledModal(false)} />
    </div>
  );
}

export default function BillingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#01090B]" />}>
      <BillingsPageContent />
    </Suspense>
  );
}
