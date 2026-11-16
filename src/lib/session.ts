import { SignJWT, jwtVerify } from "jose";

// Edge-safe (no Node or DB imports) — used by middleware.ts as well as route handlers.

export const SESSION_COOKIE = "weru_dashboard_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type Role = "admin" | "editor" | "quiz_manager";

export type Session = { userId: string; email: string; name: string; role: Role };

function secretKey(): Uint8Array | null {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

export async function signSession(session: Session): Promise<string> {
  const key = secretKey();
  if (!key) throw new Error("SESSION_SECRET is not set (min 32 chars)");
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(key);
}

export async function verifySession(token: string | undefined): Promise<Session | null> {
  const key = secretKey();
  if (!key || !token) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    const { userId, email, name, role } = payload as Partial<Session>;
    if (!userId || !email || !role) return null;
    return { userId, email, name: name ?? email, role };
  } catch {
    return null;
  }
}
