import { NextResponse } from "next/server";

const CHANNEL_ID = "UCKf9xsi0uL1mwdrq7PmZsQA";

// Route-level ISR cache — 60 s
export const revalidate = 60;

export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return NextResponse.json({ videoId: null, isLive: false });

  try {
    // ── 1. Active live broadcast ─────────────────────────────────────────────
    const liveRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${key}`,
      { cache: "no-store" }
    );
    const liveData = await liveRes.json();
    if (liveData.items?.length > 0) {
      return NextResponse.json({ videoId: liveData.items[0].id.videoId as string, isLive: true });
    }

    // ── 2. Most recent uploads — fetch 5 candidates ──────────────────────────
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=5&key=${key}`,
      { cache: "no-store" }
    );
    const searchData = await searchRes.json();
    if (!searchData.items?.length) return NextResponse.json({ videoId: null, isLive: false });

    const ids: string = searchData.items.map((i: { id: { videoId: string } }) => i.id.videoId).join(",");

    // ── 3. Batch-verify all 5 are truly embeddable ───────────────────────────
    const statusRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=status&id=${ids}&key=${key}`,
      { cache: "no-store" }
    );
    const statusData = await statusRes.json();

    const embeddable = (statusData.items ?? []).find(
      (v: { status: { embeddable: boolean; privacyStatus: string; uploadStatus: string } }) =>
        v.status.embeddable === true &&
        v.status.privacyStatus === "public" &&
        v.status.uploadStatus === "processed"
    );

    if (embeddable) {
      return NextResponse.json({ videoId: embeddable.id as string, isLive: false });
    }

    return NextResponse.json({ videoId: null, isLive: false });
  } catch {
    return NextResponse.json({ videoId: null, isLive: false });
  }
}
