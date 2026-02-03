/**
 * Configurable list of countries to show in the "Countries I've visited" section.
 * Uses ISO 3166-1 alpha-2 codes for flag emoji.
 */
export const countries = [
  { name: "Denmark", code: "DK" },
  { name: "Sweden", code: "SE" },
  { name: "Norway", code: "NO" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Italy", code: "IT" },
  { name: "Greece", code: "GR" },
  { name: "Poland", code: "PL" },
  { name: "Slovakia", code: "SK" },
  { name: "Portugal", code: "PT" },
  { name: "United States", code: "US" },
  { name: "Mexico", code: "MX" },
  { name: "Nicaragua", code: "NI" },
  { name: "Argentina", code: "AR" },
  { name: "Brazil", code: "BR" },
  { name: "Paraguay", code: "PY" },
  { name: "China", code: "CN" },
  { name: "Japan", code: "JP" },
  { name: "New Zealand", code: "NZ" },
  { name: "Uganda", code: "UG" },
  { name: "Philippines", code: "PH" },
  { name: "Malaysia", code: "MY" },
  { name: "Austria", code: "AT" },
  { name: "Switzerland", code: "CH" },
  { name: "Spain", code: "ES" },
  { name: "Turkey", code: "TR" },
  { name: "Montenegro", code: "ME" },
  { name: "Albania", code: "AL" },
  { name: "Croatia", code: "HR" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Hungary", code: "HU" },
  { name: "Canada", code: "CA" },
  { name: "Syria", code: "SY" },
  { name: "UK", code: "GB" },
  { name: "Finland", code: "FI" },
  { name: "Ukraine", code: "UA" },
  { name: "Romania", code: "RO" },
  { name: "Malta", code: "MT" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "Singapore", code: "SG" },
] as const;

/** Convert ISO 3166-1 alpha-2 code to flag emoji (e.g. "US" → 🇺🇸). */
export function countryCodeToFlag(code: string): string {
  return [...code.toUpperCase()]
    .map((char) => String.fromCodePoint(0x1f1e6 - 65 + char.charCodeAt(0)))
    .join("");
}
