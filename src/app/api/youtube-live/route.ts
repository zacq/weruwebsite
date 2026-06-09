import { NextResponse } from "next/server";

const UPLOADS_PLAYLIST = "UUKf9xsi0uL1mwdrq7PmZsQA";

export const revalidate = 1800;

export type StreamResponse =
  | { type: "hls";     url: string }
  | { type: "embed";   url: string }
  | { type: "youtube"; videoId: string; isLive: boolean }
  | { type: "none" };

export async function GET() {
  // Priority 1: HLS stream (.m3u8) — lowest latency, no third-party iframe
  const hlsUrl = process.env.STREAM_HLS_URL;
  if (hlsUrl) {
    return NextResponse.json({ type: "hls", url: hlsUrl } satisfies StreamResponse);
  }

  // Priority 2: platform embed URL (Restream, Castr, etc.)
  const embedUrl = process.env.STREAM_EMBED_URL;
  if (embedUrl) {
    return NextResponse.json({ type: "embed", url: embedUrl } satisfies StreamResponse);
  }

  // Priority 2: YouTube (quota-safe — 2 units per call)
  const ytKey = process.env.YOUTUBE_API_KEY;
  if (!ytKey) return NextResponse.json({ type: "none" } satisfies StreamResponse);

  try {
    const plRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${UPLOADS_PLAYLIST}&maxResults=1&key=${ytKey}`,
      { cache: "no-store" }
    );
    const plData = await plRes.json();
    if (!plData.items?.length) return NextResponse.json({ type: "none" } satisfies StreamResponse);

    const videoId = plData.items[0].contentDetails.videoId as string;

    const vRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${ytKey}`,
      { cache: "no-store" }
    );
    const vData = await vRes.json();
    const details = vData.items?.[0]?.liveStreamingDetails;
    const isLive  = !!(details?.actualStartTime && !details?.actualEndTime);

    return NextResponse.json({ type: "youtube", videoId, isLive } satisfies StreamResponse);
  } catch {
    return NextResponse.json({ type: "none" } satisfies StreamResponse);
  }
}
