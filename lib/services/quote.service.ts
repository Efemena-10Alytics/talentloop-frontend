import { getApiUrl, getHeaders } from "@/lib/api";

export interface QuoteInstallment {
  sequence: number;
  amount: number;
  /** ISO date (YYYY-MM-DD) the installment falls due. */
  due_date: string;
}

export interface PaymentQuote {
  payment_option: number;
  currency: string;
  original_total: number;
  discount_amount: number;
  total: number;
  installments: QuoteInstallment[];
  coupon: { code: string; name: string } | null;
}

export class QuoteError extends Error {}

/**
 * Prices a plan selection server-side, optionally with a coupon.
 *
 * The same service that creates the real payment plan produces this, so the
 * amounts and due dates shown at checkout are exactly what Stripe will charge
 * and what the invoices will carry. Public endpoint — the plan picker renders
 * before sign-in.
 */
export async function fetchPaymentQuote(params: {
  pricingId: number | string;
  paymentOption: number;
  couponCode?: string;
}): Promise<PaymentQuote> {
  const res = await fetch(`${getApiUrl()}/api/v1/payment-plans/quote`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      pricing_id: params.pricingId,
      payment_option: params.paymentOption,
      ...(params.couponCode ? { coupon_code: params.couponCode } : {}),
    }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    // The coupon rules put the useful text in errors.coupon_code; message is
    // just "Validation failed".
    throw new QuoteError(
      body?.errors?.coupon_code?.[0] ||
        body?.errors?.payment_option?.[0] ||
        body?.message ||
        "Could not price this plan. Please try again."
    );
  }

  return body.data as PaymentQuote;
}

/**
 * "£300" / "£214.29" — whole pounds stay whole unless pence are forced.
 *
 * `alwaysDecimals` is for the checkout summary, where prices sit in a column
 * and "£350.00" lines up with "£300.00" in a way "£350" does not.
 */
export function formatMoney(amount: number, { alwaysDecimals = false } = {}): string {
  return `£${alwaysDecimals || !Number.isInteger(amount) ? amount.toFixed(2) : amount}`;
}

/** "Jun 21, 2026" — how the checkout summary shows a due date. */
export function formatDueDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);

  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
}

/** The date the *next* payment falls due — i.e. the second installment. */
export function nextPaymentDateOf(quote: PaymentQuote | null): string | undefined {
  const next = quote?.installments?.[1];

  return next ? formatDueDate(next.due_date) : undefined;
}
