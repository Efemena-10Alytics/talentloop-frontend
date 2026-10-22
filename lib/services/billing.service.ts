// Billing Service Functions — payment + receipt actions (reads live in hooks/useBilling.ts)

export interface PayInvoiceResponse {
  status: string;
  checkout_url: string;
}

/**
 * Mints a fresh Stripe Checkout URL for an unpaid installment via our own
 * proxy route (so the backend token never needs to reach the browser).
 */
export async function payInvoice(
  invoiceId: number,
  options: { successUrl?: string; cancelUrl?: string } = {}
): Promise<string> {
  const res = await fetch(`/api/invoices/${invoiceId}/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...(options.successUrl ? { success_url: options.successUrl } : {}),
      ...(options.cancelUrl ? { cancel_url: options.cancelUrl } : {}),
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.checkout_url) {
    throw new Error(data?.message || "Could not start payment. Please try again.");
  }

  return data.checkout_url as string;
}

/**
 * Downloads the PDF receipt for a paid installment and saves it in the
 * browser, going through our proxy route rather than the backend's own
 * (auth-bearing) receipt URL.
 */
export async function downloadReceipt(invoiceId: number): Promise<void> {
  const res = await fetch(`/api/invoices/${invoiceId}/receipt`);

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message || "Could not download the receipt. Please try again.");
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `receipt-invoice-${invoiceId}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

/** "£350" / "£214.29" — whole pounds (or whatever currency) stay whole. */
export function formatMoney(amount: number, symbol: string): string {
  return `${symbol}${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
}
