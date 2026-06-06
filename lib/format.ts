/** All displayed prices are British Pounds (GBP). */

export const DISPLAY_CURRENCY = "GBP" as const;
export const DISPLAY_LOCALE = "en-GB" as const;

/**
 * Format a whole-pound amount as GBP (e.g. £1,299).
 * Use everywhere user-facing prices appear.
 */
export function formatGbp(
  amount: number,
  options?: { compact?: boolean },
): string {
  if (options?.compact) {
    return `£${amount.toLocaleString(DISPLAY_LOCALE)}`;
  }
  return new Intl.NumberFormat(DISPLAY_LOCALE, {
    style: "currency",
    currency: DISPLAY_CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Alias for clarity in components that only need “a price string”. */
export const formatPrice = formatGbp;

/** “from £X” style for packages / destinations. */
export function formatGbpPp(amount: number): string {
  return formatGbp(amount);
}
