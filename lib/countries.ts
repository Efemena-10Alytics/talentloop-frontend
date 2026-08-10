import { countries } from "@/app/_hooks/countries";

export interface Country {
  name: string;
  code: string;
}

export const COUNTRIES: Country[] = countries;

/** Dropdown options. The stored value is the country name — see resolveCountry. */
export const COUNTRY_OPTIONS = COUNTRIES.map((country) => ({
  value: country.name,
  label: country.name,
}));

const byName = new Map(COUNTRIES.map((c) => [c.name.toLowerCase(), c]));
const byCode = new Map(COUNTRIES.map((c) => [c.code.toLowerCase(), c]));

/**
 * Resolves a stored or detected country to its canonical entry.
 *
 * Accepts either a name ("Nigeria") or an ISO 3166-1 alpha-2 code ("NG"),
 * case-insensitively. Both forms exist in `user_profiles.country`: the settings
 * tab used to write codes while the payment modals wrote names, so anything
 * reading that column has to cope with both.
 */
export function resolveCountry(value?: string | null): Country | undefined {
  const key = value?.trim().toLowerCase();

  if (!key) return undefined;

  return byName.get(key) ?? byCode.get(key);
}

/** The ISO alpha-2 code for a stored country, for react-phone-number-input. */
export function countryCodeOf(value?: string | null): string | undefined {
  return resolveCountry(value)?.code;
}

/** The display name for a stored country, normalising legacy code-shaped rows. */
export function countryNameOf(value?: string | null): string {
  return resolveCountry(value)?.name ?? value ?? "";
}
