import { getStore } from "@netlify/blobs";
import { randomUUID } from "crypto";

// Screenshot proof attached to quiz entries. Kept in Netlify Blobs (no extra
// account needed) and only served back through the authenticated dashboard.
const STORE_NAME = "quiz-screenshots";

export const MAX_SCREENSHOTS = 3;
export const MAX_SCREENSHOT_BYTES = 1_500_000; // client compresses to well under this
export const SCREENSHOT_TYPES = ["image/jpeg", "image/png", "image/webp"];

function store() {
  return getStore(STORE_NAME);
}

export async function saveScreenshot(quizId: string, file: File): Promise<string> {
  const key = `${quizId}/${randomUUID()}`;
  await store().set(key, await file.arrayBuffer(), { metadata: { contentType: file.type } });
  return key;
}

export async function getScreenshot(key: string): Promise<{ data: ArrayBuffer; contentType: string } | null> {
  const result = await store().getWithMetadata(key, { type: "arrayBuffer" });
  if (!result) return null;
  return { data: result.data, contentType: String(result.metadata?.contentType ?? "image/jpeg") };
}

export async function deleteScreenshots(keys: string[]): Promise<void> {
  await Promise.all(keys.map((k) => store().delete(k).catch(() => undefined)));
}
