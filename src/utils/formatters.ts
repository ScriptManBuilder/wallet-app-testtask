/**
 * Format a currency amount for display.
 * Payment type → prefixed with "+"
 * Credit type → shown as-is
 */
export function formatAmount(amount: number, type: "payment" | "credit"): string {
  const formatted = `$${amount.toFixed(2)}`;
  return type === "payment" ? `+${formatted}` : formatted;
}

/**
 * Format a transaction date.
 * If within the last 7 days → weekday name (e.g. "Monday")
 * Otherwise → short date (e.g. "Mar 18")
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();

  // Compare dates at midnight to avoid time-of-day edge cases
  const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round((today.getTime() - dateDay.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays >= 2 && diffDays < 7) {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Format a full date and time for the detail screen, e.g. "4/2/26, 14:32"
 */
export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear() % 100;
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${month}/${day}/${year.toString().padStart(2, "0")}, ${hours}:${minutes}`;
}
