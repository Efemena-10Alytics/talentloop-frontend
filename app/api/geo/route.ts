import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { countryFromHeaders } from "@/lib/geo";

export const dynamic = "force-dynamic";

/**
 * The caller's country, derived from the hosting platform's edge headers.
 * Returns `{ country: null }` when the platform doesn't supply one, so the
 * client can simply skip pre-selection.
 */
export async function GET() {
  const headerList = await headers();

  return NextResponse.json(
    { country: countryFromHeaders((name) => headerList.get(name)) },
    { headers: { "Cache-Control": "no-store" } }
  );
}
