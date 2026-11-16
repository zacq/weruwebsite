import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { QUIZ_ROLES, audit, requireRole } from "@/lib/auth";
import { sendEmail, sendSms } from "@/lib/notify";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const auth = await requireRole(QUIZ_ROLES);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { channel, message, subject } = (await req.json().catch(() => ({}))) as {
    channel?: "sms" | "email"; message?: string; subject?: string;
  };
  if ((channel !== "sms" && channel !== "email") || !message?.trim()) {
    return NextResponse.json({ error: "Channel and message are required" }, { status: 400 });
  }

  const db = getDb();
  const [entry] = await db.select().from(schema.quizEntries).where(eq(schema.quizEntries.id, id)).limit(1);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const recipient = channel === "sms" ? entry.phone : entry.email;
  if (!recipient) return NextResponse.json({ error: "This entry has no email address" }, { status: 400 });

  const emailSubject = subject?.trim() || "Weru TV prize draw";
  const result = channel === "sms"
    ? await sendSms(recipient, message.trim())
    : await sendEmail(recipient, emailSubject, message.trim());

  const [log] = await db
    .insert(schema.notifications)
    .values({
      quizId: entry.quizId,
      entryId: entry.id,
      channel,
      recipient,
      subject: channel === "email" ? emailSubject : null,
      body: message.trim(),
      status: result.ok ? "sent" : "failed",
      providerRef: result.ok ? result.providerRef : null,
      error: result.ok ? null : result.error,
      sentBy: auth.userId,
    })
    .returning();

  await audit(auth, `notify:${channel}`, "quiz_entry", id, { status: log.status });

  if (!result.ok) return NextResponse.json({ error: result.error, notification: log }, { status: 502 });
  return NextResponse.json({ notification: log });
}
