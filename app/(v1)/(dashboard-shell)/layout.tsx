import type { Metadata } from "next";
import DashboardShellClient from "./DashboardShellClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShellClient>{children}</DashboardShellClient>;
}
