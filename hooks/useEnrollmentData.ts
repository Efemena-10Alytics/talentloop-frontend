"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export interface EnrollmentApplication {
  id: number;
  enrollment_id: number;
  company: string;
  role: string;
  job_url: string;
  location: string;
  status: string;
  cv_document_id: number;
  sponsor_only: boolean;
  date_applied: string;
  interview_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface EnrollmentStats {
  total_applications: string;
  interviews_secured: string;
  responses_received: string;
  response_rate: number;
  sponsor_only: string;
  total_cv: number;
  period: string;
  status_breakdown: Record<string, number>;
  deltas: Record<string, number>;
}

export type StatsPeriod = "today" | "week" | "month" | "year" | "all";

export interface EnrollmentDocument {
  id: number;
  enrollment_id: number;
  uploaded_by: number;
  category: string;
  original_filename: string;
  file_url: string;
  created_at: string;
  updated_at: string;
}

async function fetchDocuments(): Promise<EnrollmentDocument[]> {
  const res = await fetch("/api/enrollment/documents");
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

export function useEnrollmentDocuments() {
  const { status } = useSession();
  return useQuery({
    queryKey: ["enrollment-documents"],
    queryFn: fetchDocuments,
    enabled: status === "authenticated",
    retry: false,
  });
}

async function fetchApplications(): Promise<EnrollmentApplication[]> {
  const res = await fetch("/api/enrollment/applications");
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

async function fetchStats(period: StatsPeriod): Promise<EnrollmentStats | null> {
  const res = await fetch(`/api/enrollment/applications/stats?period=${period}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}

export function useEnrollmentApplications() {
  const { status } = useSession();
  return useQuery({
    queryKey: ["enrollment-applications"],
    queryFn: fetchApplications,
    enabled: status === "authenticated",
    retry: false,
  });
}

export function useEnrollmentStats(period: StatsPeriod = "today") {
  const { status } = useSession();
  return useQuery({
    queryKey: ["enrollment-stats", period],
    queryFn: () => fetchStats(period),
    enabled: status === "authenticated",
    retry: false,
  });
}
