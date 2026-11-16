import { normalizePhone } from "@/lib/quizStatus";

export type SendResult = { ok: true; providerRef: string | null } | { ok: false; error: string };

export function smsConfigured(): boolean {
  return Boolean(process.env.AT_USERNAME && process.env.AT_API_KEY);
}

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);
}

// Africa's Talking — https://developers.africastalking.com/docs/sms/sending
export async function sendSms(phone: string, message: string): Promise<SendResult> {
  const username = process.env.AT_USERNAME;
  const apiKey = process.env.AT_API_KEY;
  if (!username || !apiKey) return { ok: false, error: "SMS is not configured (AT_USERNAME / AT_API_KEY)" };

  const host = username === "sandbox" ? "api.sandbox.africastalking.com" : "api.africastalking.com";
  const body = new URLSearchParams({ username, to: `+254${normalizePhone(phone)}`, message });
  if (process.env.AT_SENDER_ID) body.set("from", process.env.AT_SENDER_ID);

  try {
    const res = await fetch(`https://${host}/version1/messaging`, {
      method: "POST",
      headers: { apiKey, Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = await res.json().catch(() => null);
    const recipient = data?.SMSMessageData?.Recipients?.[0];
    if (!res.ok || !recipient || recipient.status !== "Success") {
      return { ok: false, error: recipient?.status ?? data?.SMSMessageData?.Message ?? `HTTP ${res.status}` };
    }
    return { ok: true, providerRef: recipient.messageId ?? null };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// Resend — https://resend.com/docs/api-reference/emails/send-email
export async function sendEmail(to: string, subject: string, text: string): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) return { ok: false, error: "Email is not configured (RESEND_API_KEY / RESEND_FROM)" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) return { ok: false, error: data?.message ?? `HTTP ${res.status}` };
    return { ok: true, providerRef: data?.id ?? null };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
