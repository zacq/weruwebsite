import {
  pgTable,
  pgEnum,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

// ── Auth ────────────────────────────────────────────────────────────────────

export const userRole = pgEnum("user_role", ["admin", "editor", "quiz_manager"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: userRole("role").notNull().default("editor"),
  active: boolean("active").notNull().default(true),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  ...timestamps,
});

export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    action: text("action").notNull(),
    entity: text("entity").notNull(),
    entityId: text("entity_id"),
    diff: jsonb("diff"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("audit_log_entity_idx").on(t.entity, t.entityId)]
);

// ── Quiz ────────────────────────────────────────────────────────────────────

// Only draft/published/archived are stored. Whether a published quiz is
// "scheduled", "live" or "closed" is derived from starts_at/ends_at at read
// time (see src/lib/quizStatus.ts), so a quiz closes on time with no cron job.
export const quizStatus = pgEnum("quiz_status", ["draft", "published", "archived"]);

export type QuizPromoCopy = {
  eyebrow?: string;
  heading?: string;
  body?: string;
  highlights?: string[];
  primaryCta?: { label: string; url: string };
  secondaryCta?: { label: string; url: string };
};

export const quizzes = pgTable("quizzes", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  campaign: text("campaign"),
  title: text("title").notNull(),
  tagline: text("tagline"),
  description: text("description"),
  steps: text("steps").array().notNull().default([]),
  prize: text("prize"),
  prizeImageUrl: text("prize_image_url"),
  sponsor: text("sponsor"),
  promoCopy: jsonb("promo_copy").$type<QuizPromoCopy>(),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  status: quizStatus("status").notNull().default("draft"),
  createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
  ...timestamps,
});

export const quizQuestions = pgTable(
  "quiz_questions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    quizId: uuid("quiz_id")
      .notNull()
      .references(() => quizzes.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    label: text("label"),
    question: text("question").notNull(),
    // Staff-only reference used when marking entries — never sent to the public page.
    answerKey: text("answer_key"),
    ...timestamps,
  },
  (t) => [index("quiz_questions_quiz_idx").on(t.quizId, t.position)]
);

export const drawStatus = pgEnum("draw_status", ["pending", "contacted", "winner", "disqualified"]);

// `correct` is null until a staff member marks the answer during review.
export type QuizAnswer = { questionId: string; question: string; answer: string; correct: boolean | null };

export const quizEntries = pgTable(
  "quiz_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    quizId: uuid("quiz_id")
      .notNull()
      .references(() => quizzes.id, { onDelete: "restrict" }),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    phoneNormalized: text("phone_normalized").notNull(),
    email: text("email"),
    county: text("county"),
    answers: jsonb("answers").$type<QuizAnswer[]>().notNull(),
    // Netlify Blobs keys in the "quiz-screenshots" store.
    screenshots: text("screenshots").array().notNull().default([]),
    score: integer("score").notNull().default(0),
    total: integer("total").notNull(),
    reviewed: boolean("reviewed").notNull().default(false),
    // True once every answer has been marked correct — the draw pool.
    eligible: boolean("eligible").notNull().default(false),
    drawStatus: drawStatus("draw_status").notNull().default("pending"),
    submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("quiz_entries_quiz_phone_uq").on(t.quizId, t.phoneNormalized),
    index("quiz_entries_quiz_submitted_idx").on(t.quizId, t.submittedAt),
  ]
);

export const quizDraws = pgTable("quiz_draws", {
  id: uuid("id").primaryKey().defaultRandom(),
  quizId: uuid("quiz_id")
    .notNull()
    .references(() => quizzes.id, { onDelete: "cascade" }),
  winnerEntryId: uuid("winner_entry_id")
    .notNull()
    .references(() => quizEntries.id, { onDelete: "cascade" }),
  poolSize: integer("pool_size").notNull(),
  drawnBy: uuid("drawn_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const notificationChannel = pgEnum("notification_channel", ["sms", "email"]);

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  quizId: uuid("quiz_id").references(() => quizzes.id, { onDelete: "set null" }),
  entryId: uuid("entry_id").references(() => quizEntries.id, { onDelete: "set null" }),
  channel: notificationChannel("channel").notNull(),
  recipient: text("recipient").notNull(),
  subject: text("subject"),
  body: text("body").notNull(),
  status: text("status").notNull(),
  providerRef: text("provider_ref"),
  error: text("error"),
  sentBy: uuid("sent_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
