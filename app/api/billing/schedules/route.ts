import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.talentloop.app";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const token = session?.backendToken;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const params = req.nextUrl.searchParams;
  const forwarded = new URLSearchParams();

  for (const key of ["page", "per_page", "status", "plan_id"]) {
    const value = params.get(key);
    if (value) forwarded.set(key, value);
  }

  const query = forwarded.toString();

  const res = await fetch(
    `${API_BASE_URL}/api/v1/billing/schedules${query ? `?${query}` : ""}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
