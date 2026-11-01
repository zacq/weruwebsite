const NAME_WORD = /^[A-Za-z'-]{2,}$/;
const KENYAN_PHONE = /^(0[17]\d{8}|254[17]\d{8})$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidFullName(name: unknown): boolean {
  if (typeof name !== "string") return false;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.length >= 2 && parts.every((p) => NAME_WORD.test(p));
}

export function isValidKenyanPhone(phone: unknown): boolean {
  if (typeof phone !== "string") return false;
  const digits = phone.replace(/\D/g, "");
  return KENYAN_PHONE.test(digits);
}

export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  return EMAIL.test(email.trim());
}
