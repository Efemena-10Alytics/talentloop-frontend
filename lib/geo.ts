/**
 * Country headers attached by the hosting platform's edge, in precedence order.
 * Reading these costs nothing and keeps every user's IP inside our own
 * infrastructure — no third-party geolocation call.
 *
 * Next 15 removed `request.geo`, so reading the header directly is the correct
 * approach from Next 15 onwards.
 */
const COUNTRY_HEADERS = [
  "x-vercel-ip-country", // Vercel
  "cf-ipcountry", // Cloudflare
] as const;

/**
 * Pulls the ISO 3166-1 alpha-2 country from request headers, or null when the
 * platform doesn't provide one — which is the case in local development, and on
 * any host that isn't behind one of the edges above.
 *
 * Callers must treat null as "unknown" and carry on: geo detection is a
 * convenience, never a requirement.
 */
export function countryFromHeaders(get: (name: string) => string | null | undefined): string | null {
  for (const header of COUNTRY_HEADERS) {
    const value = get(header)?.trim();

    // Cloudflare sends "XX" for anonymised or unresolvable clients.
    if (value && value.length === 2 && value.toUpperCase() !== "XX") {
      return value.toUpperCase();
    }
  }

  return null;
}
