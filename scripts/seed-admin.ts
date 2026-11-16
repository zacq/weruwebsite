// Creates (or resets) the first admin account.
// Usage: npm run db:seed-admin -- you@example.com "Your Name" "a-strong-password"
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

config({ path: ".env.local" });

async function main() {
  const [email, name, password] = process.argv.slice(2);
  if (!email || !name || !password || password.length < 10) {
    console.error('Usage: npm run db:seed-admin -- <email> "<name>" "<password (10+ chars)>"');
    process.exit(1);
  }
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

  const db = drizzle(neon(process.env.DATABASE_URL), { schema });
  const passwordHash = await bcrypt.hash(password, 10);

  await db
    .insert(schema.users)
    .values({ email: email.trim().toLowerCase(), name, role: "admin", passwordHash })
    .onConflictDoUpdate({
      target: schema.users.email,
      set: { name, role: "admin", passwordHash, active: true, updatedAt: new Date() },
    });

  console.log(`Admin ready: ${email}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
