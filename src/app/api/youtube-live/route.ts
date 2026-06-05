import { NextResponse } from "next/server";

const CHANNEL_ID = "UCKf9xsi0uL1mwdrq7PmZsQA";

// Cache responses for 60 s at the CDN/Next.js layer — keeps quota low
export const revalidate = 60;

export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;

  if (!key) {
    return NextResponse.json({ videoId: null, isLive: false, error: "API key not set" });
  }

  try {
    // ── 1. Check for an active live broadcast ────────────────────────────────
    const liveRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&videoEmbeddable=true&key=${key}`,
      { next: { revalidate: 60 } }
    );
    const liveData = await liveRes.json();

    if (liveData.items?.length > 0) {
      const videoId: string = liveData.items[0].id.videoId;
      return NextResponse.json({ videoId, isLive: true });
    }

    // ── 2. Fallback: most recent embeddable upload ───────────────────────────
    const recentRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&videoEmbeddable=true&maxResults=1&key=${key}`,
      { next: { revalidate: 300 } }
    );
    const recentData = await recentRes.json();

    if (recentData.items?.length > 0) {
      const videoId: string = recentData.items[0].id.videoId;
      return NextResponse.json({ videoId, isLive: false });
    }

    return NextResponse.json({ videoId: null, isLive: false });
  } catch {
    return NextResponse.json({ videoId: null, isLive: false });
  }
}
