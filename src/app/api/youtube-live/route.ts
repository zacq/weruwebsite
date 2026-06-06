import { NextResponse } from "next/server";

const CHANNEL_ID = "UCKf9xsi0uL1mwdrq7PmZsQA";

export const revalidate = 60;

export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return NextResponse.json({ videoId: null, isLive: false });

  try {
    // 1. Active live broadcast
    const liveRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${key}`,
      { cache: "no-store" }
    );
    const liveData = await liveRes.json();
    if (liveData.items?.length > 0) {
      return NextResponse.json({ videoId: liveData.items[0].id.videoId as string, isLive: true });
    }

    // 2. Most recent upload — take first result, no embeddability filter
    const recentRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=1&key=${key}`,
      { cache: "no-store" }
    );
    const recentData = await recentRes.json();
    if (recentData.items?.length > 0) {
      return NextResponse.json({ videoId: recentData.items[0].id.videoId as string, isLive: false });
    }

    return NextResponse.json({ videoId: null, isLive: false });
  } catch {
    return NextResponse.json({ videoId: null, isLive: false });
  }
}
