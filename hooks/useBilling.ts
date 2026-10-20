"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export type InstallmentStatus = "paid" | "overdue" | "upcoming" | "processing";
export type CurrentPlanStatus = "awaiting_payment" | "ongoing" | "owing" | "completed";
export type ScheduleStatusFilter = "all" | InstallmentStatus;

export interface BillingBanner {
  has_next_payment: boolean;
  invoice_id: number | null;
  sequence: number | null;
  next_payment_date: string | null;
  formatted_date: string | null;
  days_until_due: number | null;
  due_label: string | null;
  is_overdue: boolean;
  installment_label: string | null;
  amount: number;
  pay_url: string | null;
}

export interface BillingMetrics {
  total_plan_amount: number;
  total_paid: number;
  remaining_balance: number;
  payment_status: string;
  status_label: string;
}

export interface BillingCurrentPlan {
  plan_title: string;
  status: CurrentPlanStatus;
  status_label: string;
  installments_badge: string;
  plan_amount: number;
  installments_count: number;
  installment_amount: number;
  start_date: string | null;
  next_due_date: string | null;
}

export interface BillingData {
  plan_id: number;
  pricing_title: string;
  currency: string;
  currency_symbol: string;
  banner: BillingBanner;
  metrics: BillingMetrics;
  current_plan: BillingCurrentPlan;
}

export interface PaymentScheduleItem {
  id: number;
  sequence: number;
  description: string;
  amount: number;
  due_date: string | null;
  formatted_due_date: string | null;
  paid_at: string | null;
  status: InstallmentStatus;
  status_label: string;
  receipt_url: string | null;
  pay_url: string | null;
}

export interface SchedulesMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

async function fetchBilling(planId?: number): Promise<BillingData | null> {
  const query = planId ? `?plan_id=${planId}` : "";
  const res = await fetch(`/api/billing${query}`);
  if (!res.ok) throw new Error("Failed to fetch billing data");
  const json = await res.json();
  return json.data ?? null;
}

export function useBilling(planId?: number) {
  const { status } = useSession();
  return useQuery({
    queryKey: ["billing", planId ?? null],
    queryFn: () => fetchBilling(planId),
    enabled: status === "authenticated",
    retry: false,
  });
}

interface SchedulesParams {
  page?: number;
  perPage?: number;
  status?: ScheduleStatusFilter;
  planId?: number;
}

async function fetchSchedules(
  params: SchedulesParams
): Promise<{ data: PaymentScheduleItem[]; meta: SchedulesMeta | null }> {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.perPage) search.set("per_page", String(params.perPage));
  if (params.status && params.status !== "all") search.set("status", params.status);
  if (params.planId) search.set("plan_id", String(params.planId));

  const query = search.toString();
  const res = await fetch(`/api/billing/schedules${query ? `?${query}` : ""}`);
  if (!res.ok) throw new Error("Failed to fetch payment schedule");
  const json = await res.json();
  return { data: json.data ?? [], meta: json.meta ?? null };
}

export function useBillingSchedules(params: SchedulesParams) {
  const { status } = useSession();
  return useQuery({
    queryKey: ["billing-schedules", params.page ?? 1, params.perPage ?? 10, params.status ?? "all", params.planId ?? null],
    queryFn: () => fetchSchedules(params),
    enabled: status === "authenticated",
    retry: false,
  });
}
