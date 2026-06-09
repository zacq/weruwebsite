import { NextResponse } from "next/server";

// Uploads playlist = channel ID with "UC" → "UU" (costs 1 unit vs 100 for search.list)
const UPLOADS_PLAYLIST = "UUKf9xsi0uL1mwdrq7PmZsQA";

// Cache for 30 minutes — live status doesn't change more often than that
export const revalidate = 1800;

export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return NextResponse.json({ videoId: null, isLive: false });

  try {
    // 1. Latest video from uploads playlist — 1 unit (search.list costs 100)
    const plRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${UPLOADS_PLAYLIST}&maxResults=1&key=${key}`,
      { cache: "no-store" }
    );
    const plData = await plRes.json();
    if (!plData.items?.length) return NextResponse.json({ videoId: null, isLive: false });

    const videoId = plData.items[0].contentDetails.videoId as string;

    // 2. Check live status on that video — 1 unit
    const vRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${key}`,
      { cache: "no-store" }
    );
    const vData = await vRes.json();
    const details = vData.items?.[0]?.liveStreamingDetails;
    // Live = has actualStartTime but no actualEndTime yet
    const isLive = !!(details?.actualStartTime && !details?.actualEndTime);

    return NextResponse.json({ videoId, isLive });
  } catch {
    return NextResponse.json({ videoId: null, isLive: false });
  }
}
